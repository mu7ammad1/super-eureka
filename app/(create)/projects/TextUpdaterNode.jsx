"use client";
import { useCallback, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import "@/app/globals.css";

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

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
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
      className="text-updater-node min-w-20 h-auto bg-white"
      style={{
        maxWidth: "300px",
        width: "100%",
        height: "auto",
        padding: "0px",
        margin: "0px",
        backgroundColor: "#14b8a6",
        borderRadius: "8px",
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

      {/* حاوية المحتوى */}
      <div className="h-auto w-full p-2 flex flex-col gap-2">
        {/* حقل الإدخال */}
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag w-full p-1 rounded border-none focus:outline-none"
          value={data.value || ""}
          placeholder="اكتب هنا..."
        />

        {/* نموذج إنشاء الصورة */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A futuristic cityscape"
              disabled={loading}
              className="w-full p-1 rounded border-none"
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
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              disabled={loading}
              className="w-full p-1 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </form>

        {/* عرض الخطأ إذا وجد */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* حاوية الصورة المولدة كخلفية */}
        {imageUrl && (
          <div
            style={{
              backgroundImage: `url("${imageUrl}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "150px", // ارتفاع ثابت للعرض
              width: "100%", // عرض كامل
              borderRadius: "8px",
              aspectRatio: aspectRatio, // استخدام نسبة الأبعاد المختارة
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* يمكن إضافة محتوى داخل الحاوية إذا لزم الأمر */}
          </div>
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