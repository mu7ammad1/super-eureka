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
  const itemsPerPage = 10; // عدد الصور لكل طلب

  const supabase = createClient();
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // جلب الصور من Supabase
  const fetchImages = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const from = page * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error } = await supabase
        .from("photos")
        .select("url, created_at")
        .order("created_at", { ascending: false })
        .range(from, to); // جلب دفعة جديدة فقط بناءً على الصفحة

      if (error) throw error;

      // إضافة الصور الجديدة فقط، مع تصفية التكرارات بناءً على URL
      setStoredImages((prev) => {
        const newImages = data || [];
        const existingUrls = new Set(prev.map((img) => img.url));
        const uniqueNewImages = newImages.filter((img) => !existingUrls.has(img.url));
        return [...prev, ...uniqueNewImages];
      });

      setHasMore(data.length === itemsPerPage); // تحقق مما إذا كان هناك المزيد
      setPage((prev) => prev + 1); // زيادة رقم الصفحة
    } catch (err) {
      setError("Failed to load images from Supabase");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  // جلب الدفعة الأولى عند التحميل الأولي
  useEffect(() => {
    fetchImages();
  }, []);

  // إعداد Intersection Observer
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

  // حساب ارتفاعات الصور
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
      <div className="w-full flex flex-wrap *:w-1/4 *:max-sm:w-1/2 *:max-md:w-1/3">
        {allImages.map((image, index) => (
          <div key={index} className="p-2">
            <Image
              src={image.url}
              alt={`Image ${index}`}
              width={300}
              height={imageHeights[index] || 300}
              className="w-full h-auto object-contain rounded-xl"
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
        {allImages.length == 0 && loading && <div>No images found</div>}
    </div>
  );
}