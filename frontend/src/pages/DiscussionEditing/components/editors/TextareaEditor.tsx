import React, { SetStateAction } from "react";
import { Discussion, Task, Topic } from "../../../../types";
import { useDiscussionEditContext } from "../../context+provider/discussionEditContext";

interface TextareaEditorProps {
    state: string;
    setState: React.Dispatch<SetStateAction<string>>;
    placeholder: string;
    entity: string;
    id: number;
}

const TextareaEditor = ({state, setState, placeholder, entity, id}: TextareaEditorProps) => {

    const {
            updateField
        } = useDiscussionEditContext()
    
        const handleBlur = () => {
            updateField('description', state, id, entity)
        }

    return (
        <textarea 
            className='edit-box title'
            style={{height: '180px'}}
            placeholder={placeholder}
            onChange={(e) => setState(e.target.value)}
            onBlur={handleBlur}
            value={state || ''}
        />
    )
}

export default TextareaEditor