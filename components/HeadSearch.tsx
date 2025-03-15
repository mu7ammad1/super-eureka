"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowRightIcon, DicesIcon, Settings2Icon } from "lucide-react";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogTitle } from "./ui/dialog";
import { TextToImage } from "@/app/actions/imagine";

type Status = {
    Style: string;
    label: string[];
};

import { usePathname } from 'next/navigation';

export default function HeadSearch() {
    const [prompt, setPrompt] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
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
            ]
        },
        {
            Style: "Architectural",
            label: [
                "An ancient cathedral with intricate details, dramatic lighting, cloudy sky.",
                "A modern glass skyscraper, city reflections on its surface.",
                "A suspension bridge over a river, light fog, glowing night lights.",
                "A traditional Japanese house, Zen garden, muted calming tones.",
                "A desert temple, stone pillars, swirling sand around it.",
            ]
        },
        {
            Style: "Watercolor",
            label: [
                "Flowers in a vase on a table, blended colors, white background.",
                "A bird perched on a branch, splashes of color, calm serene vibe.",
                "A small village by the sea, flowing blue and green hues.",
                "A sunset sky with clouds, orange and pink tones bleeding together.",
                "A girl painting in a garden, brush in hand, soft delicate shades.",
            ]
        },
        {
            Style: "Anime",
            label: [
                "A schoolgirl under cherry blossom trees, wind blowing, soft pastel colors.",
                "A samurai warrior in a bamboo forest, sharp gaze, gleaming sword.",
                "A giant robot in a glowing city, reflections on its armor.",
                "A group of friends laughing in a café, detailed expressions, bright tones.",
                "A dragon flying over mountains, a boy riding it, sky full of clouds.",
            ]
        },
        {
            Style: "Pop Art",
            label: [
                "A woman’s face in bold colors, red and yellow, white dots in the background.",
                "A giant orange juice can, thick black outlines, stark color contrasts.",
                "A classic car in a comic-book style, 'VROOM' text in the background.",
                "A dog in blue and pink hues, stars and zigzag lines around it.",
                "A young man holding a phone, colorful speech bubbles, striped background.",
            ]
        },
        {
            Style: "Surreal",
            label: [
                "A melting clock draped over a tree in a desert, a sky full of eyes.",
                "A man with a fish body walking in an upside-down city.",
                "A flying piano in a purple sky, its keys turning into birds.",
                "A mountain shaped like a human face, crying tears that form a river.",
                "A room with no walls, floating furniture, a window opening to nothingness.",
            ]
        },
        {
            Style: "Fantasy",
            label: [
                "A floating castle in the sky, colorful clouds, dragons circling around.",
                "A magical forest, glowing trees, tiny fairies flying between branches.",
                "A warrior with a glowing sword, facing a giant monster in a cave.",
                "An underwater city, coral palaces, fantastical fish swimming around.",
                "A wizard casting a spell, fiery orbs floating, mystical energy in the air.",
            ]
        },
        {
            Style: "flux-dev-fast",
            label: [
                "An abandoned factory, rusty machinery, high contrast, gloomy atmosphere.",
                "A city under rain, people with umbrellas, reflections on wet streets.",
                "A lone tree in a desert, long shadows, dark sky looming.",
                "An old maritime scene, a sailing ship in a storm, towering waves.",
                "A haunted old house, broken windows, fog surrounding it.",
            ]
        },
        {
            Style: "flux-dev",
            label: [
                "An apple orchard in spring, warm colors, soft brushstrokes blending together.",
                "A village by a riverbank, cloudy sky, water reflections in rich hues.",
                "A historical warrior on horseback, shiny armor, dense forest background.",
                "A woman sitting by a window, sunlight on her face, detailed and vivid textures.",
                "An old harbor filled with ships, blue and orange tones, calm serene mood.",
            ]
        },
        {
            Style: "flux-schnell",
            label: [
                "An alien planet with three suns, glowing plants, strange creatures moving in the background.",
                "A spaceship landing on a dusty moon, swirling dust, neon lights glowing.",
                "A giant robot in an abandoned city, red sky, glowing rubble scattered around.",
                "A floating space station among stars, twinkling lights, windows overlooking the galaxy.",
                "A space battle between ships, colorful explosions, planets in the distance.",
            ]
        },
        {
            Style: "anime",
            label: [
                "A superhero flying over a colorful city, bright tones, exaggerated building shapes.",
                "A family of cute cats living in a treehouse, cheerful details, blue sky with fluffy clouds.",
                "An adventurer in a cartoonish jungle, quirky colored trees, funny animals peeking out.",
                "A magical school full of students, flying books, vibrant and playful colors.",
                "A car race on a colorful track, exaggerated car designs, cheering crowd.",
            ]
        },
    ];

    const randomizePromptAndStyle = () => {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randomPrompt = randomStatus.label[Math.floor(Math.random() * randomStatus.label.length)];
        setSelectedStatus(randomStatus);
        setPrompt(randomPrompt);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const Pathname = usePathname();

        e.preventDefault();
        if (!prompt) {
            setError("Please enter a prompt");
            return;
        }
        // if (Pathname.toString = "/imagine") {
        //     setError("Please select a style");
        //     return;
        // }

        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("style", selectedStatus?.Style.toLowerCase() || "realistic");
        formData.append("aspect_ratio", "1:1"); // Default value, could be made configurable
        formData.append("seed", `${Math.random().toString().split(".")[1]}`); // Default value, could be made configurable

        setLoading(true);
        setError(null);
        setImageUrl(null);

        const result = await TextToImage(formData);

        if (result.success && result.imageBase64) {
            const byteCharacters = atob(result.imageBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/png" });
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
            console.log("Image generated successfully");
        } else {
            setError(result.error || "Unknown error occurred");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col w-full max-w-3xl items-center border p-2 rounded-3xl bg-neutral-100 placeholder:text-black dark:bg-secondary border-none box">
            <form onSubmit={handleSubmit} className="w-full">
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
                            onClick={randomizePromptAndStyle}
                            disabled={loading}
                        >
                            <Settings2Icon className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant={"secondary"}
                            size={"icon"}
                            className="rounded-full"
                            onClick={randomizePromptAndStyle}
                            disabled={loading}
                        >
                            <DicesIcon className="h-4 w-4" />
                        </Button>
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild>
                                <Button variant="outline" size={"default"} className="rounded-full justify-start" disabled={loading}>
                                    {selectedStatus ? <>{selectedStatus.Style}</> : <>+ Set Style</>}
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DialogTitle className="hidden">Set Style</DialogTitle>
                                <div className="mt-4 border-t">
                                    <main>
                                        <section>
                                            <section className="flex flex-wrap justify-center items-start gap-5 *:w-[15.666667%] *:max-md:w-[24.5%] *:max-sm:w-[47%] w-full mt-2 max-h-96 scroll- overflow-y-auto">
                                                {statuses.map((status) => (
                                                    <Button
                                                        key={status.Style}
                                                        value={status.Style}
                                                        onClick={(e) => {
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
                        <Button type="button" variant={"secondary"} size={"default"} className="rounded-full" disabled={loading}>
                            Add style
                        </Button>
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

            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Generated Image" style={{ maxWidth: "100%" }} />
                </div>
            )}

            {error && <p className="mt-2" style={{ color: "red" }}>{error}</p>}
        </div>
    );
}