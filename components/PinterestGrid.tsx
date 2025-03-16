'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // Assuming this is your Supabase client setup

interface Photo {
  url: string;
}

// Move Supabase client creation outside the component
const supabase = createClient();
export default function PinterestGrid({ imageUrls }: { imageUrls: string[] | null }) {
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("photos")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;
        setImages(data || []);
      } catch (err) {
        setError('Failed to load images');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const heights: number[] = new Array(images.length).fill(0);
    let loadedImages = 0;

    images.forEach((img, index) => {
      const image = new window.Image();
      image.src = img.url; // Using url consistently
      image.onload = () => {
        heights[index] = image.height * 0.5;
        loadedImages++;
        if (loadedImages === images.length) {
          setImageHeights([...heights]);
        }
      };
      image.onerror = () => {
        heights[index] = 300;
        loadedImages++;
        if (loadedImages === images.length) {
          setImageHeights([...heights]);
        }
      };
    });
  }, [images]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex flex-wrap *:w-1/4 *:max-sm:w-1/2 *:max-md:w-1/3">
      {images.length === 0 && <div>No images found</div>}
      {imageUrls && imageUrls.map((imageUrl, index) => (
        <div
          key={index}
          className="p-2"
        >
          <Image
            src={imageUrl}
            alt={`Image ${index}`}
            width={300}
            style={{ maxWidth: "100%" }}
            height={imageHeights[index] || 300}
            className="w-full h-auto object-contain rounded-xl"
            loading="lazy"
          />
        </div>
      ))}
      {images.map((image, index) => (
        <div
          key={index}
          className="p-2"
        >
          <Image
            src={image.url}
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