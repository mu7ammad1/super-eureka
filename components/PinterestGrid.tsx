"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

interface Photo {
  url: string;
  created_at?: string;
}

export default function PinterestGrid({ imageUrls }: { imageUrls: string[] }) {
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [storedImages, setStoredImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;

  const supabase = createClient();
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchImages = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const from = page * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data: { user } } = await supabase.auth.getUser();

      let data, error;

      // If user exists, fetch their photos, otherwise fetch all photos
      if (user) {

        ({ data, error } = await supabase
          .from("photos")
          .select("*")
          .order("created_at", { ascending: false })
          .eq("id_user", user.id)
          .range(from, to));
      } else {
        ({ data, error } = await supabase
          .from("photos")
          .select("*")
          .order("created_at", { ascending: false })
          .range(from, to));
      }

      if (error) throw error;

      setStoredImages((prev) => {
        const newImages = data || [];
        const existingUrls = new Set(prev.map((img) => img.url));
        const uniqueNewImages = newImages.filter((img) => !existingUrls.has(img.url));
        return [...prev, ...uniqueNewImages];
      });

      setHasMore((data?.length ?? 0) === itemsPerPage);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError("Failed to load images from Supabase");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]); // Added fetchImages as dependency

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || loading) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchImages();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    observer.current.observe(currentRef);

    return () => {
      if (observer.current && currentRef) {
        observer.current.unobserve(currentRef);
      }
    };
  }, [fetchImages, hasMore, loading]);

  useEffect(() => {
    const newImages = [...imageUrls]
      .reverse()
      .map((url, index) => ({
        url,
        created_at: new Date(Date.now() - index).toISOString(),
      }));

    const allImages = [...newImages, ...storedImages];

    if (!allImages.length) return;

    const heights: number[] = new Array(allImages.length).fill(0);
    let loadedImages = 0;

    allImages.forEach((img, index) => {
      const image = new window.Image();
      image.src = img.url;
      image.onload = () => {
        heights[index] = image.height * 0.5;
        loadedImages++;
        if (loadedImages === allImages.length) {
          setImageHeights([...heights]);
        }
      };
      image.onerror = () => {
        console.error(`Failed to load image: ${img.url}`);
        heights[index] = 300;
        loadedImages++;
        if (loadedImages === allImages.length) {
          setImageHeights([...heights]);
        }
      };
    });
  }, [imageUrls, storedImages]);

  if (error) return <div>Error: {error}</div>;

  const newImages = [...imageUrls]
    .reverse()
    .map((url, index) => ({
      url,
      created_at: new Date(Date.now() - index).toISOString(),
    }));

  const allImages = [...newImages, ...storedImages];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-wrap *:w-1/4 *:max-sm:w-full *:max-md:w-1/3">
        {allImages.map((image, index) => (
          <div key={index} className="p-2">
            <Image
              src={image.url}
              alt={`Image ${index}`}
              width={300}
              height={imageHeights[index] || 300}
              className="w-full h-auto object-contain rounded-xl min-w-52"
              loading="lazy"
              onError={() => console.error(`Image failed to load: ${image.url}`)}
            />
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={loadMoreRef} className="w-full text-center py-4">
          {loading ? "Loading..." : "Scroll to load more"}
        </div>
      )}
      {allImages.length === 0 && !loading && <div>No images found</div>}
    </div>
  );
}