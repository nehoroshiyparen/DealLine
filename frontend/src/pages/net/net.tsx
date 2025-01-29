import { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import './net.scss';
import { useDiscussion } from "../../hooks/useDiscussion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Discussion, Task, Topic } from "../../types";
import ZoomManager from './zoomManager';
import { generateGraph } from '../../utils/gridUtils/gridGeneration'
import { nodeTypes, TaskNode } from "../../components/customNodes/nodes";

export default function Net() {
    const user = useSelector((state: RootState) => state.user);
    const { discussionsState, fetchDiscussions } = useDiscussion();
    const discussions = discussionsState.discussions;
    const [curDis, setCurDis] = useState<Discussion>();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [zoom, setZoom] = useState(1); 

    useEffect(() => {
        if (user && user.user != null) {
            if (!discussionsState.discussions || discussionsState.discussions.length === 0) {
                fetchDiscussions(user.user.id);
            }
        }
    }, [user]);

    useEffect(() => {
        if (discussions) {
        setCurDis(discussions[1]);
        }
    }, [discussions]);

    

    useEffect(() => {
        if (zoom > 1) {
            document.documentElement.style.setProperty('--theme-node-opacity', (1.5 - zoom*0.5).toString());
            document.documentElement.style.setProperty('--task-node-opacity', (zoom-1).toString());
            if (zoom > 1.2) {
                document.documentElement.style.setProperty('--theme-z-index', '0');
                document.documentElement.style.setProperty('--task-z-index', '1');
            }
        } else {
            document.documentElement.style.setProperty('--node-opacity', '1');
            document.documentElement.style.setProperty('--task-node-opacity', '0');
            if (zoom < 1.2) {
                document.documentElement.style.setProperty('--theme-z-index', '1');
                document.documentElement.style.setProperty('--task-z-index', '0');
            }
        }
    }, [zoom])

    useEffect(() => {
        if (curDis) {
            const elements = generateGraph(curDis);
            setNodes(elements.nodes)
            setEdges(elements.edges)
        }
    }, [curDis]);

    return (
        <ReactFlowProvider>
        <div className="net-content">
            <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            minZoom={0.1}
            nodeTypes={nodeTypes}
            fitView
            >
            <Background />
            <Controls />
            </ReactFlow>
            <ZoomManager onZoomChange={setZoom} />
        </div>
        </ReactFlowProvider>
    );
}
