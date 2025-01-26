import React, { useState, useEffect } from "react";
import ReactFlow, { addEdge, Background, Controls, MiniMap, Handle, Position, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import './net.scss';
import { useDiscussion } from "../../hooks/useDiscussion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Discussion } from "../../types";
import { useNet } from "../../hooks/useNet";

export default function Net() {

    const user = useSelector((state: RootState) => state.user)
    const {discussionsState, fetchDiscussions} = useDiscussion()
    const { calculatePosition } = useNet()
    const discussions = discussionsState.discussions
    const [curDis, setCurDis] = useState<Discussion>()
    const [nodes, setNodes] = useState<any>()
    const [edges, setEdges] = useState<any>()
    
    useEffect(() => {
        if (user && user.user != null) {
            if (!discussionsState.discussions || discussionsState.discussions.length === 0) {
                fetchDiscussions(user.user.id)
            }
        }
    }, [user])

    useEffect(() => {
        if (discussions) {
            setCurDis(discussions[0])
        }
    }, [discussions])

    useEffect(() => {
        if (curDis) {
            setNodes(() => {
                const nodes: Node[] = []
    
                nodes.push({
                    id: `discussion-${curDis.id}`,
                    data: { label: curDis.title },
                    position: { x: 0, y: 0 },
                    className: 'discussion_node'
                  });
              
                  curDis.topics.forEach((topic: any, index: number) => {
                    const position = calculatePosition.defaultTopic(index, curDis.topics.length)
                    nodes.push({
                        id: `topic-${topic.id}`,
                        data: { label: topic.title },
                        position: { x: position.xposition, y: position.yposition },
                        className: 'theme_node'
                    });
              
                    topic.tasks.forEach((task: any, taskIndex: number) => {
                        const taskPosition = calculatePosition.defaultTask(taskIndex, topic.tasks.length, position.xposition, position.yposition)
                        nodes.push({
                            id: `task-${task.id}`,
                            data: { label: task.title },
                            position: { x: taskPosition.xposition, y: taskPosition.yposition },
                            className: 'task_node'
                        });
                    });
                });
              
                return nodes;
            })

            setEdges(() => {
                const edges: Edge[] = []

                curDis.topics.forEach((topic: any) => {
                    edges.push({
                      id: `e-discussion-${topic.id}`,
                      source: `discussion-${curDis.id}`,
                      target: `topic-${topic.id}`,
                      animated: true,
                    });
              
                    topic.tasks.forEach((task: any) => {
                      edges.push({
                        id: `e-topic-${task.id}`,
                        source: `topic-${topic.id}`,
                        target: `task-${task.id}`,
                        animated: true,
                      });
                    });
                });
              
                return edges;
            })
        }
    }, [curDis])

    console.log(curDis)

    return (
        <div className="net-content">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={{ 
                    discussionNode: DiscussionNode,
                    themeNode: ThemeNode,
                 }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

// Кастомный компонент для узла
const DiscussionNode = ({ data }: any) => {
    return (
        <div className="discussion_node">
            <div className="node_title">
                {data.label}
            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

const ThemeNode = ({ data }: any) => {
    return (
        <div className="theme_node">
            <div className="node_title">
                {data.label}
            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};