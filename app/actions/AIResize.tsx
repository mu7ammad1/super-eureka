"use client";

import { useState } from "react";
import { AIResize } from "./imagine";

export default function AIResizeComponent() {
    const [prompt, setPrompt] = useState<string>("A futuristic cityscape at night with neon lights");
    const [image, setImage] = useState<File | null>(null);
    const [mask, setMask] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            setError(null);
            setImageUrl(null);
        }
    };

    const handleMaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setMask(e.target.files[0]);
            setError(null);
            setImageUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt) {
            setError("Please enter a prompt");
            return;
        }
        if (!image) {
            setError("Please select an image");
            return;
        }
        if (!mask) {
            setError("Please select a mask");
            return;
        }

        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("image", image);
        formData.append("mask", mask);

        setLoading(true);
        setError(null);
        setImageUrl(null);

        const result = await AIResize(formData);

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
            console.log("Image resized successfully");
        } else {
            setError(result.error || "Unknown error occurred");
        }

        setLoading(false);
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
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Mask:</label>
                    <input
                        type="file"
                        onChange={handleMaskChange}
                        accept="image/*"
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading || !image || !mask}>
                    {loading ? "Resizing..." : "Resize Image"}
                </button>
            </form>

            {imageUrl && (
                <div>
                    <h3>Resized Image:</h3>
                    <img src={imageUrl} alt="Resized Image" style={{ maxWidth: "100%" }} />
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}