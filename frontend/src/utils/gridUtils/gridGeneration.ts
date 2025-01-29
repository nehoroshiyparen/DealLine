import { Edge, Node } from "reactflow";
import { Discussion, Topic, Task } from "../../types";
import { getUniquePosition } from './positions'
import { kMeansClusteringElements, getClusterPosition } from "./clustering";
import { TaskNode } from "../../components/customNodes/nodes";

export const generateGraph = (discussion: Discussion): { nodes: Node[] , edges: Edge[] } => {
        const generatedNodes: Node[] = [];
        const generatedEdges: Edge[] = [];
    
        const SCREEN_WIDTH = 1200;
        const SCREEN_HEIGHT = 600;
        const k = 2;
    
        const clusters = kMeansClusteringElements(discussion.topics || [], k);

        const nodePositions: { [key: string]: { x: number, y: number } } = {};
    
        clusters.forEach((cluster, clusterIndex) => {
            cluster.forEach((topic: Topic, index: number) => {
                const uniqueTopicId = `topic-${clusterIndex}-${index}`;
                const size = 150 + topic.tasks.length * 100;
    
                const { x, y } = getClusterPosition(clusterIndex, k, SCREEN_WIDTH, SCREEN_HEIGHT);
                
                const finalPosition = getUniquePosition(x, y, size, nodePositions, topic.tasks.length, topic);
    
                generatedNodes.push({
                    id: uniqueTopicId,
                    data: { label: topic.title },
                    position: finalPosition, 
                    style: { width: size, height: size, fontSize: size * 0.1 },
                    className: 'theme_node',
                });

                const taskClusters = kMeansClusteringElements(topic.tasks, 2)
                taskClusters.forEach((taskCluster) => {
                    const taskNodesPositions: { [key: string]: { x: number, y: number } } = {};
                    taskCluster.forEach((task: Task, taskIndex: number) => {
                        const taskId = `task-${topic.title}-${taskIndex}`
                        const taskNode = generatedNodes.find(node => node.id === taskId)

                        const uniqueTaskPosition = getUniquePosition(size*0.3, size*0.3 , 50, taskNodesPositions, taskCluster.length, task)

                        const finalTaskX = uniqueTaskPosition.x
                        const finalTaskY = uniqueTaskPosition.y

                        if (!taskNode) {
                            generatedNodes.push({
                                id: taskId,
                                parentId: uniqueTopicId,
                                data: { label: task.title, staus: task.status, deadline: task.deadline, priority: task.priority, responsible: task.responsible },
                                position: { x: finalTaskX, y: finalTaskY},
                                type: 'taskNode',
                                className: 'task_node',
                            })
                        }
                    })
                })
            });
        });
    return { nodes: generatedNodes, edges: generatedEdges }
};