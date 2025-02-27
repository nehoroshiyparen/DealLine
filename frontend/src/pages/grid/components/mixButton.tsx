import { Node } from "reactflow"
import { generateGraph } from "../../../utils/gridUtils/gridGeneration"
import React from "react"
import { Discussion } from "../../../types"

interface props {
    userId: number,
    discussion: Discussion,
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
    setHasChanged: React.Dispatch<React.SetStateAction<boolean>>,
    onClick: Function
}

const Mix = ({ setNodes, setHasChanged, userId, discussion, onClick}: props) => {

    const mixGraph = async() => {
        const elements = await generateGraph(discussion, onClick)
        setNodes(elements.nodes)
        setHasChanged(true)
    }

    return (
        <div className="mix_button" onClick={mixGraph}>
            <span>
                Перемешать
            </span>
        </div>
    )
}

export default Mix