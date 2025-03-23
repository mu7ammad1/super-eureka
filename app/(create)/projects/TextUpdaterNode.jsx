import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { PlusCircle } from "lucide-react";

function TextUpdaterNode({ data, id, isConnectable }) {
  const onChange = useCallback(
    (evt) => {
      console.log(evt.target.value);

      const newValue = evt.target.value;
      // تحديث بيانات العقدة باستخدام دالة onNodeChange الممررة
      data.onNodeChange(id, { ...data, value: newValue });
    },
    [id, data]
  );
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{
          backgroundColor: "#ff6666",
          border: "none",
          color: "white",
        }}
      >
        {/* <PlusCircle absoluteStrokeWidth className="w-4 h-4" style={{zIndex: "-500"}} /> */}
      </Handle>
      <div>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          value={data.value || ""}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{
          backgroundColor: "#ff6666",
          border: "none",
          color: "white",
        }}
      >
        {/* <PlusCircle absoluteStrokeWidth className="w-4 h-4" /> */}
      </Handle>
    </div>
  );
}

export default TextUpdaterNode;
