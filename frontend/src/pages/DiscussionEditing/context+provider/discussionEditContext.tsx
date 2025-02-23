import { createContext, SetStateAction, useContext } from "react";
import { Discussion, MiniUser, Task, Topic } from "../../../types";

export interface DiscussionEditContextType {
    discussion?: Discussion;
    title?: string;
    setTitle: React.Dispatch<SetStateAction<string | undefined>>;
    description?: string;
    setDescription: React.Dispatch<SetStateAction<string | undefined>>;
    owner?: MiniUser;
    setOwner: React.Dispatch<SetStateAction<MiniUser | undefined>>;
    members?: MiniUser[];
    setMembers: React.Dispatch<SetStateAction<MiniUser[] | undefined>>;

    selectedTopic: Topic | null;
    setSelectedTopic: React.Dispatch<SetStateAction<Topic |null>>;
    selectedTopicTitle: string;
    setSelectedTopicTitle: React.Dispatch<SetStateAction<string>>;
    selectedTask: Task | null;
    setSelectedTask: React.Dispatch<SetStateAction<Task |null>>;
    selectedTaskTitle: string;
    setSelectedTaskTitle: React.Dispatch<SetStateAction<string>>;
}

export const DiscussionEditContext = createContext<DiscussionEditContextType | undefined>(undefined)

export const useDiscussionEditContext = () => {
    const context = useContext(DiscussionEditContext)
    if (!context) {
        throw new Error('Проблемы с контекстом: DiscussionEditContext')
    }
    return context
}