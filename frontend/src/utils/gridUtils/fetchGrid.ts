import { Edge, Node } from "reactflow"
import NetService from "../../service/netService"
import { Discussion } from "../../types"

export const fetchGrid = async(userId:number, discussion: Discussion) => {
    const response = await NetService.fetchPositions(userId, discussion.id)
    const positions = response.data
    const nodes: Node[] = []
    const edges: Edge[] = []

    discussion.topics.forEach((topic) => {
        const topicPosition = positions.find(position => position.elementId === `topic-${topic.id}`)
        const size = 150 + topic.tasks.length * 100;

        if (topicPosition) {
            nodes.push({
                id: topicPosition.elementId,
                data: { label: topic.title },
                position: { x: topicPosition.x, y: topicPosition.y },
                style: { width: size, height: size, fontSize: size * 0.1 },
                className: 'theme_node'
            })

            topic.tasks.forEach((task, taskIndex) => {
                const taskPosition = positions.find(position => position.elementId === `task-${topic.title}-${taskIndex}`)
                
                if (taskPosition) {
                    nodes.push({
                        id: taskPosition.elementId,
                        parentId: topicPosition.elementId,
                        data: { task },
                        position: { x: taskPosition.x, y: taskPosition.y },
                        type: 'taskNode',
                        className: 'task_node',
                    })
                }
            })
        }
    })

    return { nodes, edges }
}