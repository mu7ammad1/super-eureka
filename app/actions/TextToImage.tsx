// components/TextToImageComponent.tsx (أو أي ملف آخر)
"use client";

import { useState } from "react";

export default function TextToImageComponent() {
  const [prompt, setPrompt] = useState<string>("");
  const [style, setStyle] = useState<string>("realistic");
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const [seed, setSeed] = useState<string>("5");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError("Prompt is required");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          style,
          aspect_ratio: aspectRatio,
          seed,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const blob = await response.blob(); // تحويل البيانات الثنائية إلى Blob
      const url = URL.createObjectURL(blob); // إنشاء URL مؤقت للصورة
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prompt:</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic cityscape at night"
            disabled={loading}
          />
        </div>
        <div>
          <label>Style:</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} disabled={loading}>
            <option value="realistic">Realistic</option>
            <option value="anime">Anime</option>
            <option value="flux-schnell">Flux-schnell</option>
            <option value="flux-dev">Flux-dev</option>
            <option value="flux-dev-fast">Flux-dev-fast</option>
            <option value="sdxl-1.0">SDXL-1.0</option>
            <option value="imagine-turbo">Imagine-turbo</option>
          </select>
        </div>
        <div>
          <label>Aspect Ratio:</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            disabled={loading}
          >
            <option value="1:1">1:1</option>
            <option value="3:2">3:2</option>
            <option value="4:3">4:3</option>
            <option value="3:4">3:4</option>
            <option value="16:9">16:9</option>
            <option value="9:16">9:16</option>
          </select>
        </div>
        <div>
          <label>Seed:</label>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img src={imageUrl} alt="Generated Image" style={{ maxWidth: "100%" }} />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}