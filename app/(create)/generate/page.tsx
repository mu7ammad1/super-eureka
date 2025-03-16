"use client";

import React, { useState } from "react";
import { ArrowRightIcon, DicesIcon, Settings2Icon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TextToImage } from "@/app/actions/imagine";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import PinterestGrid from "@/components/PinterestGrid";

type Status = {
  Style: string;
  label: string[];
};

export default function NewScreen() {
  const [prompt, setPrompt] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // تغيير القيمة الافتراضية إلى مصفوفة فارغة
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const statuses: Status[] = [
    {
      Style: "Realistic",
      label: [
        "A tropical forest after rain, glossy green leaves, light mist, sunlight piercing through the trees.",
        "A snow-covered mountain at sunrise, clear blue sky, an eagle soaring above the peak.",
        "A bustling street market, vibrant colors of fruits and vegetables, people selling goods.",
        "A small boat in the middle of a calm lake, mountain reflections on the water, white clouds.",
        "A modern city street at night, glowing car lights and skyscrapers, lively atmosphere.",
      ],
    },
    {
      Style: "flux-dev-fast",
      label: [
        "An abandoned factory, rusty machinery, high contrast, gloomy atmosphere.",
        "A city under rain, people with umbrellas, reflections on wet streets.",
        "A lone tree in a desert, long shadows, dark sky looming.",
        "An old maritime scene, a sailing ship in a storm, towering waves.",
        "A haunted old house, broken windows, fog surrounding it.",
      ],
    },
    {
      Style: "flux-dev",
      label: [
        "An apple orchard in spring, warm colors, soft brushstrokes blending together.",
        "A village by a riverbank, cloudy sky, water reflections in rich hues.",
        "A historical warrior on horseback, shiny armor, dense forest background.",
        "A woman sitting by a window, sunlight on her face, detailed and vivid textures.",
        "An old harbor filled with ships, blue and orange tones, calm serene mood.",
      ],
    },
    {
      Style: "flux-schnell",
      label: [
        "An alien planet with three suns, glowing plants, strange creatures moving in the background.",
        "A spaceship landing on a dusty moon, swirling dust, neon lights glowing.",
        "A giant robot in an abandoned city, red sky, glowing rubble scattered around.",
        "A floating space station among stars, twinkling lights, windows overlooking the galaxy.",
        "A space battle between ships, colorful explosions, planets in the distance.",
      ],
    },
    {
      Style: "anime",
      label: [
        "A superhero flying over a colorful city, bright tones, exaggerated building shapes.",
        "A family of cute cats living in a treehouse, cheerful details, blue sky with fluffy clouds.",
        "An adventurer in a cartoonish jungle, quirky colored trees, funny animals peeking out.",
        "A magical school full of students, flying books, vibrant and playful colors.",
        "A car race on a colorful track, exaggerated car designs, cheering crowd.",
      ],
    },
  ];

  const randomizePrompt = () => {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomPrompt =
      randomStatus.label[Math.floor(Math.random() * randomStatus.label.length)];
    setPrompt(randomPrompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError("Please enter a prompt");
      return;
    }

    const numberOfImages = 4; // يمكنك زيادة العدد إذا أردت
    const supabase = createClient();

    setLoading(true);
    setError(null);

    // لا نعين imageUrls إلى null، بل نحتفظ بالقيم الحالية

    const imagePromises = Array.from({ length: numberOfImages }, async () => {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append(
        "style",
        selectedStatus?.Style.toLowerCase() || "realistic"
      );
      formData.append("aspect_ratio", "1:1");
      formData.append("seed", `${Math.random().toString().split(".")[1]}`);

      const result = await TextToImage(formData);

      if (result.success && result.imageBase64) {
        const byteCharacters = atob(result.imageBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });

        const fileName = `imagenFly-${Math.random()}`;
        const { error: uploadError } = await supabase.storage
          .from("imagenfly")
          .upload(fileName, blob, { contentType: "image/png" });

        if (uploadError) throw new Error(uploadError.message);

        const { data: publicUrlData } = supabase.storage
          .from("imagenfly")
          .getPublicUrl(fileName);

        return {
          url: publicUrlData?.publicUrl || "",
          fileName,
        };
      } else {
        throw new Error(result.error || "Unknown error");
      }
    });

    try {
      const results = await Promise.all(imagePromises);
      const newUrls = results.map((result) => result.url).filter((url) => url && url.startsWith("http")); // تصفية الروابط غير الصالحة
      const photosData = results.map((result) => ({
        url: result.url,
        promp: prompt,
        style: selectedStatus?.Style || "realistic",
      }));

      const { data: Photos, error: insertError } = await supabase
        .from("photos")
        .insert(photosData)
        .select();

      if (insertError) {
        setError("Failed to save photos data: " + insertError.message);
      } else {
        console.log("Photos saved successfully:", Photos);
        setImageUrls((prevUrls) => [...(prevUrls || []), ...newUrls]); // إضافة الروابط الجديدة إلى القائمة الحالية
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error generating images: ${err.message}`);
      } else {
        setError("Error generating images: Unknown error");
      }
    }

    setLoading(false);
  };

  return (
    <main className="w-full flex justify-center relative">
      <main className="flex flex-col justify-center items-center max-w-5xl">
        <section className="w-full flex flex-col justify-center gap-4 mb-40">
          <PinterestGrid imageUrls={imageUrls} />
        </section>
        <section className="fixed left-0 right-0 bottom-0 z-50 flex justify-center items-center">
          <section className="flex flex-col w-full max-w-3xl items-center border p-2 rounded-3xl bg-neutral-100 placeholder:text-black dark:bg-secondary border-none box">
            <form onSubmit={handleSubmit} className="w-full">
              {error && (
                <p className="mt-2" style={{ color: "red" }}>
                  {error}
                </p>
              )}
              <Textarea
                placeholder="Tell us what you want to imagine today?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="border-0 block w-full resize-none shadow-none focus-visible:ring-offset-0 focus-visible:ring-0 md:text-lg tracking-normal bg-transparent placeholder:text-primary/40"
                disabled={loading}
              />
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-2 justify-between *:bg-primary-foreground">
                  <Button
                    type="button"
                    variant={"secondary"}
                    size={"icon"}
                    className="rounded-full"
                    onClick={randomizePrompt}
                    disabled={loading}
                  >
                    <Settings2Icon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant={"secondary"}
                    size={"icon"}
                    className="rounded-full"
                    onClick={randomizePrompt}
                    disabled={loading}
                  >
                    <DicesIcon className="h-4 w-4" />
                  </Button>
                  <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                      <Button
                        variant="outline"
                        size={"default"}
                        className="rounded-full justify-start"
                        disabled={loading}
                      >
                        {selectedStatus ? (
                          <>{selectedStatus.Style}</>
                        ) : (
                          <>Default Style</>
                        )}
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DialogTitle className="hidden">Set Style</DialogTitle>
                      <div className="mt-4 border-t">
                        <main>
                          <section>
                            <section className="flex flex-wrap justify-center items-start gap-5 *:w-[15.666667%] *:max-md:w-[24.5%] *:max-sm:w-[47%] w-full my-2 max-h-96 scroll- overflow-y-auto">
                              {statuses.map((status) => (
                                <Button
                                  key={status.Style}
                                  value={status.Style}
                                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    const value = (e.target as HTMLButtonElement).value;
                                    setSelectedStatus(
                                      statuses.find(
                                        (priority) => priority.Style === value
                                      ) || null
                                    );
                                    setOpen(false);
                                  }}
                                  className="h-32 w-full"
                                  disabled={loading}
                                >
                                  {status.Style}
                                </Button>
                              ))}
                            </section>
                          </section>
                        </main>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
                <Button
                  type="submit"
                  variant={"default"}
                  size={"icon"}
                  className="rounded-full w-auto h-auto p-2"
                  disabled={loading}
                >
                  {loading ? (
                    "Generating..."
                  ) : (
                    <ArrowRightIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </form>
          </section>
        </section>
      </main>
    </main>
  );
}