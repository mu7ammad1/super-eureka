import React, { useCallback, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Button } from "@/components/ui/button";

const NodeHoverToolbar: React.FC<{ onAddNode: () => void }> = ({ onAddNode }) => (
  <div className="absolute top-0 left-0 w-full bg-white/90 rounded-t-md p-2 z-10 text-center">
    <Button onClick={onAddNode} size="sm" className="bg-blue-500 hover:bg-blue-600">
      إضافة ابن
    </Button>
  </div>
);

const NodeClickToolbar: React.FC<{ onDelete: () => void }> = ({ onDelete }) => (
  <div className="absolute top-0 left-0 w-full bg-white/90 rounded-t-md p-2 z-10 text-center">
    <Button onClick={onDelete} size="sm" className="bg-red-500 hover:bg-red-600">
      حذف
    </Button>
  </div>
);

function TextUpdaterNode({ id, data, isConnectable, selected }: NodeProps) {
  const [hoverToolbarVisible, setHoverToolbarVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [style, setStyle] = useState<string>("realistic");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onAddClick = useCallback(() => data.onAdd(id), [id, data]);
  const onDeleteClick = useCallback(() => data.onDelete(id), [id, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError("الوصف مطلوب");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });

      if (!response.ok) throw new Error((await response.json()).error || "فشل في إنشاء الصورة");

      const blob = await response.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير معروف");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setHoverToolbarVisible(true)}
      onMouseLeave={() => setHoverToolbarVisible(false)}
      className="bg-white border-2 rounded-lg p-4 w-72 flex flex-col items-center relative"
      style={{ borderColor: selected ? "#6666ff" : "#000", backgroundColor: data.color }}
    >
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      {imageUrl ? (
        <img src={imageUrl} alt="Generated" className="w-full h-auto mb-2 rounded" />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 w-full">
          <div>
            <label className="block text-sm">الوصف:</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-1 border rounded"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm">الأسلوب:</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-1 border rounded"
              disabled={loading}
            >
              <option value="realistic">واقعي</option>
              <option value="anime">أنمي</option>
              <option value="flux-schnell">Flux-schnell</option>
            </select>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "جارٍ الإنشاء..." : "إنشاء صورة"}
          </Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
      <Button onClick={onAddClick} variant="default" size="icon" className="mt-2">
        +
      </Button>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      {hoverToolbarVisible && !data.selectedNodeId && <NodeHoverToolbar onAddNode={onAddClick} />}
      {data.selectedNodeId === id && <NodeClickToolbar onDelete={onDeleteClick} />}
    </div>
  );
}

export default TextUpdaterNode;






