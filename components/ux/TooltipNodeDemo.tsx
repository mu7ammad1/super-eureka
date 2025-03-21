"use client"
import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";


import {
    TooltipNode,
    TooltipContent,
    TooltipTrigger,
} from "@/components/tooltip-node";
import { PlaceholderNode } from "../placeholder-node";

const TooltipNodeDemo = memo(({ selected }: NodeProps) => {
    return (
        <TooltipNode selected={selected}>
            <TooltipContent position={Position.Top}>Hidden Content</TooltipContent>
            <TooltipTrigger>Hover</TooltipTrigger>
        </TooltipNode>
    );
});





const PlaceholderNodeDemo = memo(({ selected }: NodeProps) => {
    return (
        <PlaceholderNode selected={selected}>
            <div>+</div>
        </PlaceholderNode>
    );
});




export { TooltipNodeDemo, PlaceholderNodeDemo };