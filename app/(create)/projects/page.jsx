"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Panel,
  MiniMap,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";
import { Button } from "@/components/ui/button";

const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [
  { id: "node-1", type: "textUpdater", position: { x: 0, y: 0 }, data: { value: "123" } },
  { id: "node-2", type: "textUpdater", position: { x: 0, y: 200 }, data: { value: "node 2" } },
  { id: "node-3", type: "textUpdater", position: { x: 200, y: 200 }, data: { value: "node 3" } },
];

const initialEdges = [
  { id: "edge-1", source: "node-1", target: "node-2" },
  { id: "edge-2", source: "node-1", target: "node-3" },
];

const nodeOrigin = [0.5, 0];

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { setViewport } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);
  const { screenToFlowPosition } = useReactFlow();

  // دالة لتحديث بيانات العقدة
  const onNodeChange = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === nodeId ? { ...node, data: newData } : node))
    );
  }, [setNodes]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      type: "textUpdater",
      data: { value: "123", onNodeChange }, // تمرير onNodeChange
      animated: true,
      position: { x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400 },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes, onNodeChange]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        const id = getNodeId();
        const { clientX, clientY } = "changedTouches" in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          type: "textUpdater",
          position: screenToFlowPosition({ x: clientX, y: clientY }),
          data: { value: ``, onNodeChange }, // تمرير onNodeChange
          animated: true,
          origin: [0.5, 0.0],
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectionState.fromNode.id, target: id, animated: true }));
      }
    },
    [screenToFlowPosition, setNodes, setEdges, onNodeChange]
  );

  const handleTransform = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
  }, [setViewport]);

  const onNodeDragStart = (event, node) => console.log("بدء السحب", node);
  const onNodeDragStop = (event, node) => console.log("توقف السحب", node);
  const onNodeClick = (event, node) => console.log("النقر على العقدة", node);
  const onPaneClick = (event) => console.log("النقر على اللوحة", event);
  const onPaneScroll = (event) => console.log("التمرير على اللوحة", event);
  const onPaneContextMenu = (event) => console.log("قائمة السياق على اللوحة", event);

  const [isSelectable, setIsSelectable] = useState(true);
  const [isDraggable, setIsDraggable] = useState(true);
  const [isConnectable, setIsConnectable] = useState(true);
  const [zoomOnScroll, setZoomOnScroll] = useState(true);
  const [panOnScroll, setPanOnScroll] = useState(true);
  const [panOnScrollMode, setPanOnScrollMode] = useState("free");
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(true);
  const [panOnDrag, setPanOnDrag] = useState(true);
  const [captureZoomClick, setCaptureZoomClick] = useState(true);
  const [captureZoomScroll, setCaptureZoomScroll] = useState(true);
  const [captureElementClick, setCaptureElementClick] = useState(true);

  // إضافة onNodeChange إلى جميع العقد
  const updatedNodes = useMemo(() =>
    nodes.map((node) => ({ ...node, data: { ...node.data, onNodeChange } })),
    [nodes, onNodeChange]
  );

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <div className="wrapper" ref={reactFlowWrapper} style={{ height: "100vh" }}>
      <ReactFlow
        style={{ backgroundColor: "#202020" }}
        nodes={updatedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
        elementsSelectable={isSelectable}
        nodesConnectable={isConnectable}
        nodesDraggable={isDraggable}
        zoomOnScroll={zoomOnScroll}
        panOnScroll={panOnScroll}
        panOnScrollMode={panOnScrollMode}
        zoomOnDoubleClick={zoomOnDoubleClick}
        onNodeClick={captureElementClick ? onNodeClick : undefined}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        panOnDrag={panOnDrag}
        onPaneClick={captureZoomClick ? onPaneClick : undefined}
        onPaneScroll={captureZoomScroll ? onPaneScroll : undefined}
        onPaneContextMenu={captureZoomClick ? onPaneContextMenu : undefined}
        attributionPosition="top-right"
        className="touch-flow"
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Panel position="top-right">
          <Button onClick={onSave}>save</Button>
          <Button onClick={onRestore}>restore</Button>
          <Button onClick={onAdd}>add node</Button>
        </Panel>

        <Panel position="top-left">
          <div>
            <label htmlFor="draggable">
              <input
                id="draggable"
                type="checkbox"
                checked={isDraggable}
                onChange={(event) => setIsDraggable(event.target.checked)}
                className="react-flow__draggable"
              />
              nodesDraggable
            </label>
          </div>
          <div>
            <label htmlFor="connectable">
              <input
                id="connectable"
                type="checkbox"
                checked={isConnectable}
                onChange={(event) => setIsConnectable(event.target.checked)}
                className="react-flow__connectable"
              />
              nodesConnectable
            </label>
          </div>
          <div>
            <label htmlFor="selectable">
              <input
                id="selectable"
                type="checkbox"
                checked={isSelectable}
                onChange={(event) => setIsSelectable(event.target.checked)}
                className="react-flow__selectable"
              />
              elementsSelectable
            </label>
          </div>
          <div>
            <label htmlFor="zoomonscroll">
              <input
                id="zoomonscroll"
                type="checkbox"
                checked={zoomOnScroll}
                onChange={(event) => setZoomOnScroll(event.target.checked)}
                className="react-flow__zoomonscroll"
              />
              zoomOnScroll
            </label>
          </div>
          <div>
            <label htmlFor="panonscroll">
              <input
                id="panonscroll"
                type="checkbox"
                checked={panOnScroll}
                onChange={(event) => setPanOnScroll(event.target.checked)}
                className="react-flow__panonscroll"
              />
              panOnScroll
            </label>
          </div>
          <div>
            <label htmlFor="panonscrollmode">
              <select
                id="panonscrollmode"
                value={panOnScrollMode}
                onChange={(event) => setPanOnScrollMode(event.target.value)}
                className="react-flow__panonscrollmode"
              >
                <option value="free">free</option>
                <option value="horizontal">horizontal</option>
                <option value="vertical">vertical</option>
              </select>
              panOnScrollMode
            </label>
          </div>
          <div>
            <label htmlFor="zoomondbl">
              <input
                id="zoomondbl"
                type="checkbox"
                checked={zoomOnDoubleClick}
                onChange={(event) => setZoomOnDoubleClick(event.target.checked)}
                className="react-flow__zoomondbl"
              />
              zoomOnDoubleClick
            </label>
          </div>
          <div>
            <label htmlFor="panOnDrag">
              <input
                id="panOnDrag"
                type="checkbox"
                checked={panOnDrag}
                onChange={(event) => setPanOnDrag(event.target.checked)}
                className="react-flow__panOnDrag"
              />
              panOnDrag
            </label>
          </div>
          <div>
            <label htmlFor="capturezoompaneclick">
              <input
                id="capturezoompaneclick"
                type="checkbox"
                checked={captureZoomClick}
                onChange={(event) => setCaptureZoomClick(event.target.checked)}
                className="react-flow__capturezoompaneclick"
              />
              capture onPaneClick
            </label>
          </div>
          <div>
            <label htmlFor="capturezoompanescroll">
              <input
                id="capturezoompanescroll"
                type="checkbox"
                checked={captureZoomScroll}
                onChange={(event) => setCaptureZoomScroll(event.target.checked)}
                className="react-flow__capturezoompanescroll"
              />
              capture onPaneScroll
            </label>
          </div>
          <div>
            <label htmlFor="captureelementclick">
              <input
                id="captureelementclick"
                type="checkbox"
                checked={captureElementClick}
                onChange={(event) => setCaptureElementClick(event.target.checked)}
                className="react-flow__captureelementclick"
              />
              capture onElementClick
            </label>
          </div>
        </Panel>

        <Background />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);