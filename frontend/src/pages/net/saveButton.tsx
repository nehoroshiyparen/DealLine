import { Discussion, Position } from '../../types'
import { useReactFlow } from 'reactflow'
import './net.scss'
import { useDiscussion } from '../../hooks/useDiscussion'
import React from 'react'
import NetService from '../../service/netService'

interface props {
    userId: number,
    discussion: Discussion,
    state: boolean
}

const Save = ({userId, discussion, state}: props) => {

    const { getNodes } = useReactFlow()

    const submitData = async() => {
        if (state) {
            const positions: Position[] = []

            const nodes = getNodes()
            nodes.forEach((node) => {
                positions.push({
                    elementId: node.id,
                    discussionId: discussion.id,
                    x: node.position.x,
                    y: node.position.y
                })
            })
    
            await NetService.updatePositions(userId, positions)
    
            const button = document.querySelector('.save_button') as HTMLElement
            button.style.background = '#a1ff9f'
            button.style.color = '#3d3d3d'
        }
    }

    return (
        <div className="save_button" onClick={submitData} style={state === false ? { background: '#a1ff9f', color: '#3d3d3d' } : { background: '#53ff50', color: '#000000' }}>
            <span>
                Сохранить
            </span>
        </div>
    )
}

export default Save