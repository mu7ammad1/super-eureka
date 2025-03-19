"use client";

import React, { useState } from "react";
import { ArrowRightIcon, DicesIcon, Settings2Icon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import PinterestGrid from "@/components/PinterestGrid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"


type Status = {
  Style: string;
  label: string[];
};

export default function NewScreen() {
  const [prompt, setPrompt] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
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
        "A superhero flying over a colorful city, bright tones, exaggerated building shapes.",
        "A family of cute cats living in a treehouse, cheerful details, blue sky with fluffy clouds.",
        "An adventurer in a cartoonish jungle, quirky colored trees, funny animals peeking out.",
        "A magical school full of students, flying books, vibrant and playful colors.",
        "A car race on a colorful track, exaggerated car designs, cheering crowd.",
        "An abandoned factory, rusty machinery, high contrast, gloomy atmosphere.",
        "A city under rain, people with umbrellas, reflections on wet streets.",
        "A lone tree in a desert, long shadows, dark sky looming.",
        "An old maritime scene, a sailing ship in a storm, towering waves.",
        "A haunted old house, broken windows, fog surrounding it.",
        "A futuristic cityscape, neon lights, flying cars, dark sky.",
        "A medieval castle on a hill, knights in armor, banners waving.",
        "A group of friends on a road trip, colorful car, sunny day, happy faces.",
        "An apple orchard in spring, warm colors, soft brushstrokes blending together.",
        "A village by a riverbank, cloudy sky, water reflections in rich hues.",
        "A historical warrior on horseback, shiny armor, dense forest background.",
        "A woman sitting by a window, sunlight on her face, detailed and vivid textures.",
        "An old harbor filled with ships, blue and orange tones, calm serene mood.",
        "An alien planet with three suns, glowing plants, strange creatures moving in the background.",
        "A spaceship landing on a dusty moon, swirling dust, neon lights glowing.",
        "A giant robot in an abandoned city, red sky, glowing rubble scattered around.",
        "A floating space station among stars, twinkling lights, windows overlooking the galaxy.",
        "A space battle between ships, colorful explosions, planets in the distance.",
        "A fantasy world with floating islands, waterfalls, and lush greenery.",
        "A dragon flying over a medieval town, fire-breathing, dark clouds in the sky.",
        "A serene beach at sunset, waves gently crashing, warm golden light.",
        "A futuristic robot city, neon lights, advanced technology everywhere.",
        "A cozy cabin in the woods, snow falling, smoke coming from the chimney.",
        "A bustling futuristic market, aliens and humans trading goods, vibrant colors.",
        "A peaceful countryside, rolling hills, a small cottage with a garden.",
        "A majestic waterfall in a dense forest, mist rising, sunlight filtering through the trees.",
        "A space station orbiting a distant planet, astronauts floating outside, stars in the background.",
        "A mystical forest with glowing plants, magical creatures, and a hidden path.",
        "A grand library with towering bookshelves, ancient books, and a cozy reading nook.",
        "A vibrant coral reef, colorful fish swimming, sunlight piercing through the water.",
        "A serene mountain lake, crystal clear water, reflections of the surrounding peaks.",
        "A bustling medieval marketplace, merchants selling goods, lively atmosphere.",
        "A futuristic cityscape with flying cars, towering skyscrapers, and advanced technology.",
        "A tranquil Japanese garden, cherry blossoms in full bloom, a peaceful pond with koi fish.",
        "A magical castle floating in the sky, surrounded by clouds and rainbows.",
        "A dense jungle with exotic animals, vibrant flowers, and a hidden temple.",
        "A serene beach with turquoise waters, palm trees swaying, and a hammock between them.",
        "A bustling city street at night, neon signs, people walking, and cars passing by.",
        "A peaceful countryside with rolling hills, a small village, and a river flowing through.",
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
        "A superhero flying over a colorful city, bright tones, exaggerated building shapes.",
        "A family of cute cats living in a treehouse, cheerful details, blue sky with fluffy clouds.",
        "An adventurer in a cartoonish jungle, quirky colored trees, funny animals peeking out.",
        "A magical school full of students, flying books, vibrant and playful colors.",
        "A car race on a colorful track, exaggerated car designs, cheering crowd.",
        "A dragon flying over a medieval town, fire-breathing, dark clouds in the sky.",
        "A cozy cabin in the woods, snow falling, smoke coming from the chimney.",
        "A bustling futuristic market, aliens and humans trading goods, vibrant colors.",
        "A peaceful countryside, rolling hills, a small cottage with a garden.",
        "A majestic waterfall in a dense forest, mist rising, sunlight filtering through the trees.",
        "A space station orbiting a distant planet, astronauts floating outside, stars in the background.",
        "A mystical forest with glowing plants, magical creatures, and a hidden path.",
        "A grand library with towering bookshelves, ancient books, and a cozy reading nook.",
        "A vibrant coral reef, colorful fish swimming, sunlight piercing through the water.",
        "A serene mountain lake, crystal clear water, reflections of the surrounding peaks.",
        "A bustling medieval marketplace, merchants selling goods, lively atmosphere.",
        "A futuristic cityscape with flying cars, towering skyscrapers, and advanced technology.",
        "A tranquil Japanese garden, cherry blossoms in full bloom, a peaceful pond with koi fish.",
        "A magical castle floating in the sky, surrounded by clouds and rainbows.",
        "A dense jungle with exotic animals, vibrant flowers, and a hidden temple.",
        "A serene beach with turquoise waters, palm trees swaying, and a hammock between them.",
        "A bustling city street at night, neon signs, people walking, and cars passing by.",
        "A peaceful countryside with rolling hills, a small village, and a river flowing through.",
      ],
    },
  ];






  const randomizePrompt = () => {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomPrompt = randomStatus.label[Math.floor(Math.random() * randomStatus.label.length)];
    setPrompt(randomPrompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError("Please enter a prompt");
      return;
    }

    const supabase = createClient();
    setLoading(true);
    setError(null);

    const numberOfImages = 2; // تم تقليله إلى 1 للاختبار، يمكنك زيادته لاحقًا

    const imagePromises = Array.from({ length: numberOfImages }, async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            style: selectedStatus?.Style.toLowerCase() || "realistic",
            aspect_ratio: "1:1",
            seed: Math.random().toString().split(".")[1],
          }),
        });

        if (!response.ok) {
          let errorMessage;
          try {
            const errorData = await response.json();
            if (errorData.code === 1101) {
              errorMessage = "Not enough tokens to generate images. Please recharge your vyro.ai account.";
            } else {
              errorMessage = errorData.error || "Failed to generate image";
            }
          } catch {
            errorMessage = await response.text(); // إذا لم يكن JSON، استخدم النص الخام
          }
          throw new Error(errorMessage);
        }

        const blob = await response.blob();
        const fileName = `imagenFly-${Math.random().toString(36).substring(2)}`;

        const { error: uploadError } = await supabase.storage
          .from("imagenfly")
          .upload(fileName, blob, { contentType: "image/png" });

        if (uploadError) throw new Error(uploadError.message);

        const { data: publicUrlData } = supabase.storage
          .from("imagenfly")
          .getPublicUrl(fileName);

        return { url: publicUrlData?.publicUrl || "", fileName };
      } catch (err) {
        throw err instanceof Error ? err : new Error("Unknown error");
      }
    });

    try {
      const results = await Promise.all(imagePromises);

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
        setImageUrls((prevUrls) => [...prevUrls, ...results.map((result) => result.url)]);
      }
    } catch (err) {
      setError(`Error generating images: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex justify-center relative">
      <main className="flex flex-col justify-center items-center max-w-5xl">
        <section className="w-full flex flex-col justify-center gap-4 mb-40">
          <PinterestGrid imageUrls={imageUrls} />
        </section>
        <section className="fixed left-2 right-2 bottom-5 z-50 flex justify-center items-center">
          <section className="flex flex-col w-full max-w-3xl items-center border p-2 rounded-3xl bg-neutral-100 placeholder:text-black dark:bg-secondary border-none box">
            <form onSubmit={handleSubmit} className="w-full">
              {error && (
                <p className="mt-2" style={{ color: "red" }}>
                  {error}
                </p>
              )}
              <Textarea
                placeholder="Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="border-0 block w-full resize-none shadow-none focus-visible:ring-offset-0 focus-visible:ring-0 md:text-lg tracking-normal bg-transparent placeholder:text-primary/40"
                disabled={loading}
              />
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-2 justify-between ">
                  <Dialog>
                    <DialogTrigger className="rounded-full p-2 bg-primary disabled:bg-primary/50" disabled={loading}>
                        <Settings2Icon className="h-4 w-4 text-primary-foreground" />
                    </DialogTrigger>
                    <DialogContent className="h-96">
                      <DialogHeader>
                        <DialogTitle className={cn("flex flex-col items-center justify-center h-full space-y-4 w-full")}>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Button
                    type="button"
                    variant={"default"}
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
                        variant="default"
                        size={"default"}
                        className="rounded-full justify-start"
                        disabled={loading}
                      >
                        {selectedStatus ? <>{selectedStatus.Style}</> : <>Default Style</>}
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
                                      statuses.find((priority) => priority.Style === value) || null
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
                  {loading ? "Generating..." : <ArrowRightIcon className="h-5 w-5" />}
                </Button>
              </div>
            </form>
          </section>
        </section>
      </main>
    </main>
  );
}




