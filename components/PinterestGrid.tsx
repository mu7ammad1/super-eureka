"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Photo {
  url: string;
  prompt?: string;
  style?: string;
}

export default function PinterestGrid({ imageUrls }: { imageUrls: string[] }) {
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [storedImages, setStoredImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("photos")
          .select("url, prompt, style")
          .order("id", { ascending: false });

        if (error) throw error;
        setStoredImages(data || []);
      } catch (err) {
        setError("Failed to load images from Supabase");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const allImages = [...imageUrls, ...storedImages.map((img) => img.url)];
    if (!allImages.length) return;

    const heights: number[] = new Array(allImages.length).fill(0);
    let loadedImages = 0;

    allImages.forEach((url, index) => {
      const image = new window.Image();
      image.src = url;
      image.onload = () => {
        heights[index] = image.height * 0.5;
        loadedImages++;
        if (loadedImages === allImages.length) {
          setImageHeights([...heights]);
        }
      };
      image.onerror = () => {
        heights[index] = 300;
        loadedImages++;
        if (loadedImages === allImages.length) {
          setImageHeights([...heights]);
        }
      };
    });
  }, [imageUrls, storedImages]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const allImages = [...imageUrls, ...storedImages.map((img) => img.url)];

  return (
    <div className="w-full flex flex-wrap *:w-1/4 *:max-sm:w-1/2 *:max-md:w-1/3">
      {allImages.length === 0 && <div>No images found</div>}
      {allImages.map((imageUrl, index) => (
        <div key={index} className="p-2">
          <Image
            src={imageUrl}
            alt={`Image ${index}`}
            width={300}
            height={imageHeights[index] || 300}
            className="w-full h-auto object-contain rounded-xl"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}