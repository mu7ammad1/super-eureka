"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  Panel,
  MiniMap,
  Controls,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [
  {
    id: "interaction-1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  {
    id: "interaction-2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "interaction-3",
    data: { label: "Node 3" },
    position: { x: 400, y: 100 },
  },
  {
    id: "interaction-4",
    data: { label: "Node 4" },
    position: { x: 400, y: 200 },
  },
];

const initialEdges = [
  {
    id: "interaction-e1-2",
    source: "interaction-1",
    target: "interaction-2",
    animated: true,
  },
  {
    id: "interaction-e1-3",
    source: "interaction-1",
    target: "interaction-3",
    animated: true,
  },
];

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin = [0.5, 0];

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { setViewport, zoomIn, zoomOut } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);
  const { screenToFlowPosition } = useReactFlow();

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
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Added node" },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      // عندما يتم إسقاط اتصال على اللوحة، فإنه ليس صالحًا
      if (!connectionState.isValid) {
        // نحتاج إلى إزالة حدود الغلاف، للحصول على الموضع الصحيح
        const id = getId();
        const { clientX, clientY } =
          "changedTouches" in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}` },
          animated: true,
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectionState.fromNode.id,
            target: id,
            animated: true,
          })
        );
      }
    },
    [screenToFlowPosition]
  );

  const handleTransform = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
  }, [setViewport]);

  const onNodeDragStart = (event, node) => console.log("بدء السحب", node);
  const onNodeDragStop = (event, node) => console.log("توقف السحب", node);
  const onNodeClick = (event, node) => console.log("النقر على العقدة", node);
  const onPaneClick = (event) => console.log("النقر على اللوحة", event);
  const onPaneScroll = (event) => console.log("التمرير على اللوحة", event);
  const onPaneContextMenu = (event) =>
    console.log("قائمة السياق على اللوحة", event);

  const [isSelectable, setIsSelectable] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isConnectable, setIsConnectable] = useState(false);
  const [zoomOnScroll, setZoomOnScroll] = useState(false);
  const [panOnScroll, setPanOnScroll] = useState(false);
  const [panOnScrollMode, setPanOnScrollMode] = useState("free");
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(false);
  const [panOnDrag, setPanOnDrag] = useState(true);
  const [captureZoomClick, setCaptureZoomClick] = useState(false);
  const [captureZoomScroll, setCaptureZoomScroll] = useState(false);
  const [captureElementClick, setCaptureElementClick] = useState(false);

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        style={{ backgroundColor: "#202020" }}
        nodes={nodes}
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
      >
        <MiniMap />
        <Controls />
        <Panel position="top-right">
          <button onClick={onSave}>save</button>
          <button onClick={onRestore}>restore</button>
          <button onClick={onAdd}>add node</button>
        </Panel>

        <Panel position="topleft">
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
                onChange={(event) =>
                  setCaptureElementClick(event.target.checked)
                }
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
