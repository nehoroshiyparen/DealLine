import React, { SetStateAction } from "react";
import { Discussion, Task, Topic } from "../../../../types";
import { useDiscussionEditContext } from "../../context+provider/discussionEditContext";

interface InputEditorProps {
    state: string;
    setState: React.Dispatch<SetStateAction<string>>;
    entity: string;
    id: number;
}

const InputEditor = ({state, setState, entity, id}: InputEditorProps) => {

    const {
        updateField
    } = useDiscussionEditContext()

    const handleBlur = () => {
        updateField('title', state, id, entity)
    }

    return (
        <input 
            className='edit-box title'
            style={{}}
            value={state || ''}
            onChange={(e) => setState(e.target.value)}
            onBlur={handleBlur}
        />
    )
}

export default InputEditor