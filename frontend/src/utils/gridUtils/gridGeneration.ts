import { Edge, Node } from "reactflow";
import { Discussion, Topic, Task, Position } from "../../types";
import { getUniquePosition } from './algorithms/positions'
import { kMeansClusteringElements, getClusterPosition } from "./algorithms/clustering";

export const generateGraph = async(userId: number, discussion: Discussion): Promise<{ nodes: Node[] , edges: Edge[] , positions: Position[] }> => {
        const generatedNodes: Node[] = [];
        const generatedEdges: Edge[] = [];

        const positions: Position[] = []

        const openMore = () => {
            console.log('fqeqe')
        }
    
        const SCREEN_WIDTH = 1200;
        const SCREEN_HEIGHT = 600;
        const k = 2;
    
        const clusters = kMeansClusteringElements(discussion.topics || [], k);

        const nodePositions: { [key: string]: { x: number, y: number } } = {};
    
        clusters.forEach((cluster, clusterIndex) => {
            cluster.forEach((topic: Topic, index: number) => {
                const uniqueTopicId = `topic-${topic.id}`;
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

                positions.push({ elementId: uniqueTopicId, discussionId: discussion.id, x: finalPosition.x, y: finalPosition.y })

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
                                data: { label: task.title, staus: task.status, deadline: task.deadline, priority: task.priority, responsible: task.assignees, onClick: openMore },
                                position: { x: finalTaskX, y: finalTaskY},
                                type: 'taskNode',
                                className: 'task_node',
                            })
                        }

                        positions.push({ elementId: taskId, discussionId: discussion.id, x: finalTaskX, y: finalTaskY })
                    })
                })
            });
        });
    return { nodes: generatedNodes, edges: generatedEdges, positions }
};