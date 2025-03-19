import Image from "next/image";
import React, { useCallback, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import ima from "@/assets/images/0IOrVXfffIw7k85h-generated_image.jpg";


// Toolbar for Node Hover
const NodeHoverToolbar: React.FC<{ onAddNode: () => void }> = ({ onAddNode }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "5px 5px 0 0",
        padding: "2px 5px",
        zIndex: 10,
        textAlign: "center",
      }}
    >
      <button
        onClick={onAddNode}
        style={{ padding: "2px 5px", background: "#2196F3", color: "white", border: "none", borderRadius: "3px", fontSize: "12px" }}
      >
        إضافة ابن
      </button>
    </div>
  );
};

// Toolbar for Node Click
const NodeClickToolbar: React.FC<{ onDelete: () => void; onClose: () => void }> = ({ onDelete, onClose }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "5px 5px 0 0",
        padding: "2px 5px",
        zIndex: 10,
        textAlign: "center",
      }}
    >
      <button
        onClick={onDelete}
        style={{ padding: "2px 5px", background: "#f44336", color: "white", border: "none", borderRadius: "3px", fontSize: "12px", marginRight: "5px" }}
      >
        حذف
      </button>
    </div>
  );
};

function TextUpdaterNode({ id, data, isConnectable, selected }: NodeProps) {
  const [label, setLabel] = useState(data.label);
  const [hoverToolbarVisible, setHoverToolbarVisible] = useState(false);

  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = evt.target.value;
      setLabel(newValue);
      if (typeof data.onChange === "function") {
        data.onChange(id, newValue);
      }
    },
    [id, data]
  );

  const onAddClick = useCallback(() => {
    if (typeof data.onAdd === "function") {
      data.onAdd(id);
    }
  }, [id, data]);

  const onDeleteClick = useCallback(() => {
    if (typeof data.onDelete === "function") {
      data.onDelete(id);
    }
  }, [id, data]);

  const handleMouseEnter = useCallback(() => {
    setHoverToolbarVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverToolbarVisible(false);
  }, []);

  const isClickToolbarVisible = data.selectedNodeId === id; // الشريط يظهر فقط إذا كانت العقدة محددة

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: data.color || "#fff",
        border: selected ? "2px solid #6666ff" : "0px solid #000",
        padding: "0px",
        borderRadius: "5px",
        width: "280px",
        // height: hoverToolbarVisible || isClickToolbarVisible ? "100px" : "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      <Image src={ima} alt="image id" />

      <input
        type="text"
        value={label}
        onChange={onChange}
        className="nodrag w-3/4 px-2 py-1 border rounded"
        style={{ marginTop: hoverToolbarVisible || isClickToolbarVisible ? "20px" : "0" }}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddClick();
        }}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          marginTop: hoverToolbarVisible || isClickToolbarVisible ? "20px" : "0",
        }}
        title="إضافة عقدة جديدة"
      >
        +
      </button>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      {hoverToolbarVisible && !isClickToolbarVisible && (
        <NodeHoverToolbar onAddNode={onAddClick} />
      )}
      {isClickToolbarVisible && (
        <NodeClickToolbar
          onDelete={onDeleteClick}
          onClose={() => data.selectedNodeId = null} // لن يعمل مباشرة، تم التعامل معه في FlowPage
        />
      )}
    </div>
  );
}

export default TextUpdaterNode;