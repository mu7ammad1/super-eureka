"use client";

import { useState } from "react";
import { BackgroundRemover } from "./imagine";

export default function BackgroundRemoverComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setImageUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setError(null);
    setImageUrl(null);

    const result = await BackgroundRemover(formData);

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
      console.log("Background removed successfully");
    } else {
      setError(result.error || "Unknown error occurred");
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !file}>
          {loading ? "Processing..." : "Remove Background"}
        </button>
      </form>

      {imageUrl && (
        <div>
          <h3>Image with Background Removed:</h3>
          <img src={imageUrl} alt="Processed Image" style={{ maxWidth: "100%" }} />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}