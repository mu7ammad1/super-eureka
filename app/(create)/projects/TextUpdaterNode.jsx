"use client";
import { useCallback, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import "@/app/globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function TextUpdaterNode({ data, id, isConnectable }) {
  const onChange = useCallback(
    (evt) => {
      console.log(evt.target.value);
      const newValue = evt.target.value;
      data.onNodeChange(id, { ...data, value: newValue });
    },
    [id, data]
  );

  // كائن نسب الأبعاد للصور (موحد مع صيغة الـ API)
  const aspectRatios = {
    square: "1:1",
    landscape: "3:2",
    landscape2: "4:3",
    portrait: "3:4",
    widescreen: "16:9",
    vertical: "9:16",
  };
  const getAspectKey = (aspectRatio) =>
    aspectRatio === aspectRatios.landscape
      ? "3/2"
      : aspectRatio === aspectRatios.landscape2
        ? "4/3"
        : aspectRatio === aspectRatios.widescreen
          ? "16/9"
          : aspectRatio === aspectRatios.portrait
            ? "3:4"
            : aspectRatio === aspectRatios.vertical
              ? "9/16"
              : aspectRatio === aspectRatios.square
                ? "1/1"
                : "غير مطابق";

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState(aspectRatios.square);
  const [seed, setSeed] = useState("5");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="text-updater-node min-w-20 w-auto h-auto"
      style={{
        width: "100%",
        height: "auto",
        padding: "0px",
        border: "none",
        margin: "0px",
        backgroundColor: "#000000",
        borderRadius: "8px",
        aspectRatio: getAspectKey(aspectRatio), // استخدام نسبة الأبعاد المختارة
      }}
    >
      {/* مقبض الاتصال العلوي */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{
          backgroundColor: "#6666ff",
          border: "none",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          cursor: "auto",
        }}
      />
      <div className="h-auto w-auto p-0 flex flex-col gap-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {imageUrl ? (
          <div
            style={{
              backgroundImage: `url("${imageUrl}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "auto",
              height: "auto",
              minWidth: "500px",
              borderRadius: "8px",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              aspectRatio: getAspectKey(aspectRatio), // استخدام نسبة الأبعاد المختارة
            }}
          >
            {/* يمكن إضافة محتوى داخل الحاوية إذا لزم الأمر */}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
            style={{ color: "white", padding: "10px", minWidth: "400px" }}
          >
            <div>
              <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A futuristic cityscape"
                disabled={loading}
                className="w-full p-0 rounded border-none"
                style={{ padding: "0px" }}
              />
            </div>
            <div>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                disabled={loading}
                className="w-full p-1 rounded"
              >
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
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                disabled={loading}
                className="w-full p-1 rounded"
              >
                {Object.entries(aspectRatios).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Input
                type="number"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                disabled={loading}
                className="w-full p-1 rounded"
              />
            </div>
            <Button
              size={"default"}
              variant={"default"}
              type="submit"
              disabled={loading}
              className="p-1 rounded"
            >
              {loading ? "Generating..." : "Generate Image"}
            </Button>
          </form>
        )}
      </div>

      {/* مقبض الاتصال السفلي */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{
          backgroundColor: "#6666ff",
          border: "none",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          cursor: "auto",
          bottom: "-5px", // تعديل الموضع ليكون مرئيًا
        }}
      />
    </div>
  );
}

export default TextUpdaterNode;
