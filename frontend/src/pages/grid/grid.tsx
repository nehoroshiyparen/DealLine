import { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import './grid.scss';
import { useDiscussion } from "../../hooks/store/useDiscussion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Discussion } from "../../types";
import ZoomManager from './zoomManager';
import { generateGraph } from '../../utils/gridUtils/gridGeneration'
import { nodeTypes } from "./customNodes/nodes";
import NetService from "../../service/netService";
import { fetchGrid } from "../../utils/gridUtils/fetchGrid";
import Save from "./components/saveButton";
import Mix from "./components/mixButton";
import TaskInformation from "./components/information";

export default function Grid() {

    const user = useSelector((state: RootState) => state.user);
    const { discussionsState, fetchDiscussions } = useDiscussion();
    const discussions = discussionsState.discussions;

    const [curDis, setCurDis] = useState<Discussion>();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [zoom, setZoom] = useState(1); 
    const [hasChanged, setHasChanged] = useState(false)
    const [taskId, setTaskId] = useState(0)
    const [infoOpen, setInfoOpen] = useState(false)

    const onNodeDrag = () => {
        setHasChanged(true)
    }

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
        if (curDis) {
            const fetchAndGenerateGraph = async () => {
                try {
                    const response = await NetService.fetchPositions(user.user.id, curDis.id);
                    let elements

                    if (response.data.length === 0) {
                        elements = await generateGraph(curDis, openInfo);
                        await NetService.updatePositions(user.user.id, elements.positions)
                    } else {
                        elements = await fetchGrid(user.user.id, curDis, openInfo)
                    }
                    setNodes(elements.nodes);
                    setEdges(elements.edges);
                } catch (e) {
                    console.log(e);
                }
            };
    
            fetchAndGenerateGraph();
        }
    }, [curDis]);

    const openInfo = (taskId: number) => {
        setTaskId(taskId)
        setInfoOpen(true)
    }

    if (!curDis) return null

    return (
        <ReactFlowProvider>
            <div className="net-content">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDrag={onNodeDrag}
                    minZoom={0.1}
                    nodeTypes={nodeTypes}
                    fitView
                    >
                    <Background />
                    <Controls />
                </ReactFlow>
                <ZoomManager onZoomChange={setZoom} />
                <Save userId={Number(user.user.id)} discussion={curDis!} state={hasChanged}/>
                <Mix setNodes={setNodes} setHasChanged={setHasChanged} userId={user.user.id} discussion={curDis!} onClick={openInfo}/>
                <TaskInformation taskId={taskId} infoOpen={infoOpen} setInfoOpen={setInfoOpen}/>
            </div>
        </ReactFlowProvider>
    );
}
