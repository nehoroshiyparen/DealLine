import { useState, useEffect, useCallback } from "react";
import ReactFlow, { Background, Controls, Node, Edge, useNodesState, useEdgesState, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import './net.scss';
import { useDiscussion } from "../../hooks/useDiscussion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Discussion, Topic } from "../../types";
import ZoomManager from './zoomManager';
import { kMeansClusteringOptimized, getClusterPosition } from "../../utils/clusteringUtils";
import { getUniquePosition } from "../../utils/positionsUtils";

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

    console.log(curDis)

    const generateGraph = useCallback(() => {
        if (curDis) {
            const generatedNodes: Node[] = [];
        const generatedEdges: Edge[] = [];
    
        const SCREEN_WIDTH = 1200;
        const SCREEN_HEIGHT = 800;
        const k = 2;
    
        const clusters = kMeansClusteringOptimized(curDis?.topics || [], k);

        const nodePositions: { [key:string]: {x: number, y: number } } = {}
    
        clusters.forEach((cluster, clusterIndex) => {
            cluster.forEach((topic: Topic, index: number) => {
                const uniqueTopicId = `topic-${clusterIndex}-${index}`;
                const size = 150 + topic.tasks.length * 50;
    
                const { x, y } = getClusterPosition(clusterIndex, k, SCREEN_WIDTH, SCREEN_HEIGHT);
                
                const finalPosition = getUniquePosition(x, y, size, nodePositions, topic.tasks.length)
    
                generatedNodes.push({
                    id: uniqueTopicId,
                    data: { label: topic.title },
                    position: finalPosition, 
                    style: { width: size, height: size, fontSize: size*0.1 },
                    className: 'theme_node',
                });
            });
        });
    
        setNodes(generatedNodes);
        setEdges(generatedEdges);
        }
    }, [curDis]); 
    
    useEffect(() => {
        generateGraph(); 
    }, [generateGraph]);
    
    useEffect(() => {
        if (zoom > 1) {
            const updatedNodes = [...nodes];
            const updatedEdges = [...edges];
            
            curDis?.topics.forEach((topic, topicIndex) => {
                topic.tasks.forEach((task, taskIndex) => {
                    const taskId = `task-topic-${topicIndex}-${taskIndex}`;
                    const taskNode = updatedNodes.find(node => node.id === taskId);
                    
                    if (!taskNode) {
                        updatedNodes.push({
                            id: taskId,
                            data: { label: task.title },
                            position: { x: Math.random() * 100, y: Math.random() * 200 },
                            style: { width: 50, height: 50, borderRadius: '50%' },
                        });
                        updatedEdges.push({
                            id: `edge-topic-${topicIndex}-task-${taskIndex}`,
                            source: `topic-${topicIndex}`,
                            target: taskId,
                        });
                    }
                });
            });
    
            setNodes(updatedNodes);
            setEdges(updatedEdges);
        } else {
            const nodesWithoutTasks = nodes.filter(node => !node.id.startsWith("task-"));
            const edgesWithoutTasks = edges.filter(edge => !edge.id.startsWith("edge-topic-"));
            
            setNodes(nodesWithoutTasks);
            setEdges(edgesWithoutTasks);
        }
    }, [zoom, curDis]);


  useEffect(() => {
    generateGraph();
  }, [generateGraph]);

  return (
    <ReactFlowProvider>
      <div className="net-content">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
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
