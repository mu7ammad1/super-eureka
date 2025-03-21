"use client";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";

export default memo(({ id, position }) => {
  const label = position
    ? `Position x:${parseInt(position.x)} y:${parseInt(position.y)}`
    : "لا توجد بيانات موقع";

  return (
    <div style={{ borderRadius: "50%", border: "1px solid black", padding: "10px" }}>
      <div>{label}</div>
      <Handle type="target" position={Position.Left} className="custom-handle" />
    </div>
  );
});