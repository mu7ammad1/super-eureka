"use client";
import React, { useState, useCallback, useRef } from "react";
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

// Define custom types
interface CustomNodeData {
  label: string;
  color?: string;
  onChange?: (id: string, value: string) => void;
  onAdd?: (id: string) => void;
  onDelete?: (id: string) => void;
  selectedNodeId?: string | null; // لتتبع العقدة المحددة
}

interface CustomNode extends Node<CustomNodeData> {
  type?: string;
}

interface CustomEdge {
  id: string;
  source: string;
  target: string;
  label?: React.ReactNode;
  animated?: boolean;
  type?: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  [key: string]: any;
}

// Initial data
const initialNodes: CustomNode[] = [
  { id: "1", type: "textUpdater", data: { label: "موظف 1", color: "#6baed6" }, position: { x: 100, y: 100 } },
  { id: "2", type: "textUpdater", data: { label: "موظف 2", color: "#6baed6" }, position: { x: 300, y: 200 } },
  { id: "3", type: "textUpdater", data: { label: "موظف 3", color: "#6baed6" }, position: { x: 320, y: 200 } },
  { id: "4", type: "textUpdater", data: { label: "موظف 4", color: "#6baed6" }, position: { x: 340, y: 200 } },
  { id: "5", type: "textUpdater", data: { label: "موظف 5", color: "#6baed6" }, position: { x: 360, y: 200 } },
];

const initialEdges: CustomEdge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "إشراف",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 1, stroke: "#6666ff" },
    labelStyle: { fontSize: "16px", fontWeight: "bold" },
  },
];

// Define node types outside the component to prevent re-rendering
const nodeTypes = { textUpdater: TextUpdaterNode };

// Toolbar for Pane Double Click
const PaneToolbar: React.FC<{ x: number; y: number; onAddNode: () => void; onClose: () => void }> = ({
  x,
  y,
  onAddNode,
  onClose,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onAddNode}
        style={{ display: "block", marginBottom: "5px", padding: "5px 10px", background: "#4CAF50", color: "white", border: "none", borderRadius: "3px" }}
      >
        إضافة عقدة
      </button>
      <button
        onClick={onClose}
        style={{ display: "block", padding: "5px 10px", background: "#f44336", color: "white", border: "none", borderRadius: "3px" }}
      >
        إغلاق
      </button>
    </div>
  );
};

const FlowChart: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedElement, setSelectedElement] = useState<CustomNode | CustomEdge | null>(null);
  const [paneToolbarVisible, setPaneToolbarVisible] = useState(false);
  const [paneToolbarPosition, setPaneToolbarPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null); // حالة لتتبع العقدة المحددة
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
        addEdge(
          {
            ...params,
            label: "",
            animated: true,
            type: "smoothstep",
            labelStyle: { fontSize: "16px", fontWeight: "bold" },
          },
          eds
        )
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
        data: { label: `موظف ${newId}`, color: "#6666ff", onChange: handleEditNode, onAdd: handleAddNode, onDelete: handleDeleteNode, selectedNodeId },
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
      setSelectedNodeId(null); // إعادة تعيين العقدة المحددة
      saveToHistory();
    },
    [setNodes, setEdges, saveToHistory]
  );

  const updateElement = useCallback(
    (updates: { label?: React.ReactNode }) => {
      if (selectedElement && !("position" in selectedElement)) {
        setEdges((eds) =>
          eds.map((edge) =>
            edge.id === selectedElement.id ? { ...edge, ...updates } : edge
          )
        );
        setSelectedElement((prev) => (prev ? { ...prev, ...updates } : null));
        saveToHistory();
      }
    },
    [selectedElement, setEdges, saveToHistory]
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

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedElement(edge as CustomEdge);
    setSelectedNodeId(null); // إغلاق شريط الـ Click عند النقر على حافة
  }, []);

  const handleEditNode = useCallback(
    (id: string, newLabel: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
        )
      );
      saveToHistory();
    },
    [setNodes, saveToHistory]
  );

  const handleAddNode = useCallback(
    (sourceId: string) => {
      const newId = `${nodes.length + 1}`;
      const sourceNode = nodes.find((node) => node.id === sourceId);
      
      const nodeWidth = 180;
      const nodeHeight = 40;
      const margin = 20;

      const isOverlapping = (x: number, y: number) => {
        return nodes.some((node) => {
          const dx = Math.abs(node.position.x - x);
          const dy = Math.abs(node.position.y - y);
          return dx < nodeWidth + margin && dy < nodeHeight + margin;
        });
      };

      let newX = sourceNode ? sourceNode.position.x + nodeWidth + margin : 0;
      let newY = sourceNode ? sourceNode.position.y : 0;
      let step = 0;
      const directions = [
        { dx: 1, dy: 0 }, // يمين
        { dx: 0, dy: 1 }, // أسفل
        { dx: -1, dy: 0 }, // يسار
        { dx: 0, dy: -1 }, // أعلى
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
        data: { label: `موظف ${newId}`, color: "#6baed6", onChange: handleEditNode, onAdd: handleAddNode, onDelete: handleDeleteNode, selectedNodeId },
        position: { x: newX, y: newY },
      };
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        addEdge(
          {
            id: `e${sourceId}-${newId}`,
            source: sourceId,
            target: newId,
            label: "",
            animated: true,
            type: "smoothstep",
            style: { strokeWidth: 1, stroke: "#6666ff" },
            labelStyle: { fontSize: "16px", fontWeight: "bold" },
          },
          eds
        )
      );
      saveToHistory();
    },
    [nodes, edges, setNodes, setEdges, saveToHistory, selectedNodeId]
  );

  const updatedNodes = nodes.map((node) => ({
    ...node,
    data: { ...node.data, onChange: handleEditNode, onAdd: handleAddNode, onDelete: handleDeleteNode, selectedNodeId },
  }));

  // Pane Toolbar (Double Click on Pane)
  const onPaneDoubleClick = useCallback((event: React.MouseEvent) => {
    const reactFlowBounds = document.querySelector(".react-flow")?.getBoundingClientRect();
    if (reactFlowBounds) {
      const x = event.clientX - reactFlowBounds.left;
      const y = event.clientY - reactFlowBounds.top;
      const isNodeClicked = nodes.some((node) => {
        const nodeWidth = 180;
        const nodeHeight = 40;
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
        setSelectedNodeId(null); // إغلاق شريط الـ Click
      }
    }
  }, [nodes]);

  const onPaneClick = useCallback(() => {
    setPaneToolbarVisible(false);
    setSelectedNodeId(null); // إغلاق شريط الـ Click عند النقر على المساحة الفاضية
  }, []);

  const handleAddNodeFromPaneToolbar = useCallback(() => {
    addNode(paneToolbarPosition.x, paneToolbarPosition.y);
    setPaneToolbarVisible(false);
  }, [addNode, paneToolbarPosition]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.stopPropagation();
    setSelectedNodeId(node.id); // تحديد العقدة المضغوط عليها
  }, []);

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.stopPropagation();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-neutral-200 p-4 border-r">
        <div className="space-y-2">
          <button onClick={() => addNode()} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            إضافة موظف
          </button>
          <button
            onClick={() => selectedElement && "position" in selectedElement && handleDeleteNode(selectedElement.id)}
            disabled={!selectedElement || !("position" in selectedElement)}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
          >
            حذف العنصر
          </button>
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400"
          >
            تراجع
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.current.length - 1}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400"
          >
            إعادة
          </button>
        </div>
        {selectedElement && !("position" in selectedElement) && (
          <div className="mt-4">
            <h3 className="font-bold">تعديل الحافة</h3>
            <input
              type="text"
              value={selectedElement.label?.toString() || ""}
              onChange={(e) => updateElement({ label: e.target.value })}
              className="w-full px-2 py-1 border rounded mt-2"
              placeholder="تعديل النص"
            />
          </div>
        )}
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
          zoomOnDoubleClick={false}
          onPaneClick={onPaneClick}
          onDoubleClick={onPaneDoubleClick}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
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
    <div dir="rtl" className="min-h-screen w-screen">
      <h1 className="text-2xl font-bold p-4">مخطط تفاعلي</h1>
      <ReactFlowProvider>
        <FlowChart />
      </ReactFlowProvider>
    </div>
  );
}