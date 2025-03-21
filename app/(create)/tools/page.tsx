"use client";
import React, { useState, useCallback, useRef, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";
import { PaneToolbar } from "./PaneToolbar";
import { DeleteIcon, MoveLeftIcon, PlusCircleIcon, ReceiptEuroIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// تعريف الأنواع
interface CustomNodeData {
  color?: string;
  onAdd: (id: string) => void;
  onDelete: (id: string) => void;
  selectedNodeId?: string | null;
}

interface CustomNode extends Node<CustomNodeData> {
  type?: string;
}

interface CustomEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  type?: string;
  style?: React.CSSProperties;
}

const initialNodes: CustomNode[] = [
  { id: "1", type: "textUpdater", data: { color: "#6baed6", onAdd: () => {}, onDelete: () => {} }, position: { x: 100, y: 100 } },
  { id: "2", type: "textUpdater", data: { color: "#6baed6", onAdd: () => {}, onDelete: () => {} }, position: { x: 400, y: 200 } },
];

const initialEdges: CustomEdge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 1, stroke: "#0ac5b2" },
  },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

const FlowChart: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedElement, setSelectedElement] = useState<CustomNode | CustomEdge | null>(null);
  const [paneToolbarVisible, setPaneToolbarVisible] = useState(false);
  const [paneToolbarPosition, setPaneToolbarPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const history = useRef<{ nodes: CustomNode[]; edges: CustomEdge[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback(() => {
    history.current = history.current.slice(0, historyIndex + 1);
    history.current.push({ nodes: nodes.map((n) => ({ ...n })), edges: edges.map((e) => ({ ...e })) });
    setHistoryIndex(history.current.length - 1);
  }, [nodes, edges, historyIndex]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, animated: true, type: "smoothstep", style: { strokeWidth: 1, stroke: "#0ac5b2" } }, eds)
      );
      saveToHistory();
    },
    [setEdges, saveToHistory]
  );

  const addNode = useCallback(
    (x?: number, y?: number) => {
      const newId = `${nodes.length + 1}`;
      const newNode: CustomNode = {
        id: newId,
        type: "textUpdater",
        data: {
          color: "#6666ff",
          onAdd: handleAddNode,
          onDelete: handleDeleteNode,
          selectedNodeId,
        },
        position: { x: x ?? Math.random() * 400, y: y ?? Math.random() * 400 },
      };
      setNodes((nds) => nds.concat(newNode));
      saveToHistory();
    },
    [nodes, setNodes, saveToHistory, selectedNodeId]
  );

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
      setSelectedNodeId(null);
      saveToHistory();
    },
    [setNodes, setEdges, saveToHistory]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history.current[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex((prev) => prev - 1);
    }
  }, [historyIndex, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (historyIndex < history.current.length - 1) {
      const nextState = history.current[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex((prev) => prev + 1);
    }
  }, [historyIndex, setNodes, setEdges]);

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedElement(edge as CustomEdge);
    setSelectedNodeId(null);
  }, []);

  const handleAddNode = useCallback(
    (sourceId: string) => {
      const newId = `${nodes.length + 1}`;
      const sourceNode = nodes.find((node) => node.id === sourceId);
      const nodeWidth = 280;
      const nodeHeight = 200;
      const margin = 20;

      const isOverlapping = (x: number, y: number) =>
        nodes.some((node) => {
          const dx = Math.abs(node.position.x - x);
          const dy = Math.abs(node.position.y - y);
          return dx < nodeWidth + margin && dy < nodeHeight + margin;
        });

      let newX = sourceNode ? sourceNode.position.x + nodeWidth + margin : 0;
      let newY = sourceNode ? sourceNode.position.y : 0;
      let step = 0;
      const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
      ];

      while (isOverlapping(newX, newY) && sourceNode) {
        step++;
        const direction = directions[step % 4];
        newX = sourceNode.position.x + direction.dx * (nodeWidth + margin) * Math.ceil(step / 4);
        newY = sourceNode.position.y + direction.dy * (nodeHeight + margin) * Math.ceil(step / 4);
      }

      const newNode: CustomNode = {
        id: newId,
        type: "textUpdater",
        data: {
          color: "#6baed6",
          onAdd: handleAddNode,
          onDelete: handleDeleteNode,
          selectedNodeId,
        },
        position: { x: newX, y: newY },
      };
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        addEdge(
          {
            id: `e${sourceId}-${newId}`,
            source: sourceId,
            target: newId,
            animated: true,
            type: "smoothstep",
            style: { strokeWidth: 1, stroke: "#0ac5b2" },
          },
          eds
        )
      );
      saveToHistory();
    },
    [nodes, edges, setNodes, setEdges, saveToHistory, selectedNodeId]
  );

  const updatedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, onAdd: handleAddNode, onDelete: handleDeleteNode, selectedNodeId },
      })),
    [nodes, handleAddNode, handleDeleteNode, selectedNodeId]
  );

  const onPaneDoubleClick = useCallback((event: React.MouseEvent) => {
    const reactFlowBounds = document.querySelector(".react-flow")?.getBoundingClientRect();
    if (reactFlowBounds) {
      const x = event.clientX - reactFlowBounds.left;
      const y = event.clientY - reactFlowBounds.top;
      const isNodeClicked = nodes.some((node) => {
        const nodeWidth = 280;
        const nodeHeight = 400;
        return (
          x >= node.position.x &&
          x <= node.position.x + nodeWidth &&
          y >= node.position.y &&
          y <= node.position.y + nodeHeight
        );
      });
      if (!isNodeClicked) {
        setPaneToolbarPosition({ x, y });
        setPaneToolbarVisible(true);
        setSelectedNodeId(null);
      }
    }
  }, [nodes]);

  const onPaneClick = useCallback(() => {
    setPaneToolbarVisible(false);
    setSelectedNodeId(null);
  }, []);

  const handleAddNodeFromPaneToolbar = useCallback(() => {
    addNode(paneToolbarPosition.x, paneToolbarPosition.y);
    setPaneToolbarVisible(false);
  }, [addNode, paneToolbarPosition]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.stopPropagation();
    setSelectedElement(node);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="p-4 flex justify-center items-center fixed left-0 top-0 bottom-0 h-full z-50">
        <div className="space-y-2 flex flex-col justify-center items-center bg-black/50 backdrop-blur-md p-2 rounded-full shadow-lg">
          <Button variant={"outline"} size={"icon"} onClick={() => addNode()} className="rounded-full p-2 backdrop-blur-md">
            <PlusCircleIcon className="w-5 h-5 inline-block" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => selectedElement && "position" in selectedElement && handleDeleteNode(selectedElement.id)}
            disabled={!selectedElement || !("position" in selectedElement)}
            className="rounded-full p-2"
          >
            <DeleteIcon className="w-5 h-5 inline-block" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={undo}
            disabled={historyIndex <= 0}
            className="rounded-full p-2"
          >
            <MoveLeftIcon className="w-5 h-5 inline-block" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={redo}
            disabled={historyIndex >= history.current.length - 1}
            className="rounded-full p-2 backdrop-blur-md"
          >
            <ReceiptEuroIcon className="w-5 h-5 inline-block" />
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <ReactFlow
          nodes={updatedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-neutral-900"
          onPaneClick={onPaneClick}
          onDoubleClick={onPaneDoubleClick}
          onNodeClick={onNodeClick}
          zoomOnDoubleClick={false}
        >
          <Controls />
          <Background />
          <MiniMap nodeColor={(node: CustomNode) => node.data.color || "#6666ff"} />
          {paneToolbarVisible && (
            <PaneToolbar
              x={paneToolbarPosition.x}
              y={paneToolbarPosition.y}
              onAddNode={handleAddNodeFromPaneToolbar}
              onClose={() => setPaneToolbarVisible(false)}
            />
          )}
        </ReactFlow>
      </div>
    </div>
  );
};

export default function FlowPage() {
  return (
    <div className="min-h-screen w-screen">
      <ReactFlowProvider>
        <FlowChart />
      </ReactFlowProvider>
    </div>
  );
}