import { SetStateAction } from "react";
import { Task, Topic } from "../../../../../types"
import { useDiscussionEditContext } from "../../../context+provider/discussionEditContext";
import './defaultElement.scss'

interface DefaultListElementProps {
    index: number;
    element: Topic | Task | null;
    setState: React.Dispatch<SetStateAction<any>>;
}

const DefaultListElement = ({index, element, setState}: DefaultListElementProps) => {

    const chooseElement = () => {
        setState(element)
    }

    if (!element) return null

    return (
        <div className="default-list-element" onClick={chooseElement}>
            {index}. {element.title}
        </div>
    )
}

export default DefaultListElement