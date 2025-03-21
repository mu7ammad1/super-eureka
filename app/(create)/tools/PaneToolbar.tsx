import React from "react";
import { Button } from "@/components/ui/button";

export const PaneToolbar: React.FC<{
  x: number;
  y: number;
  onAddNode: () => void;
  onClose: () => void;
}> = ({ x, y, onAddNode, onClose }) => (
  <div
    className="absolute bg-white border rounded-md p-2 shadow-lg z-[1000]"
    style={{ left: x, top: y }}
  >
    <Button onClick={onAddNode} className="mb-2 bg-green-500 hover:bg-green-600">
      إضافة عقدة
    </Button>
    <Button onClick={onClose} className="bg-red-500 hover:bg-red-600">
      إغلاق
    </Button>
  </div>
);