import { Dispatch, SetStateAction } from "react";
import { Task, Topic } from "../../types";

type SetState<T> = Dispatch<SetStateAction<T>>
//
type ViewState = React.RefObject<HTMLDivElement>

export const ShowTopics = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement>,
    setSelectedTopic: SetState<Topic | null>,
    setSelectedTask: SetState<Task | null>
    
) => {
    setCurrentView(ref)
    setSelectedTopic(null)
    setSelectedTask(null)
}

export const ShowTopic = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement>,
    setSelectedTopic: SetState<Topic | null>,
    topic: Topic,
    setSelectedTask: SetState<Task | null>,
) => {
    setCurrentView(ref)
    setSelectedTopic(topic)
    setSelectedTask(null)
}

export const ShowTask = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement>,
    setSelectedTask: SetState<Task | null>,
    task: Task
) => {
    setCurrentView(ref)
    setSelectedTask(task)
}

export const BackToMain = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement>,
    setSelectedTopic: SetState<Topic | null>,
    setSelectedTask: SetState<Task | null>
) => {
    setCurrentView(ref)
    setSelectedTopic(null)
    setSelectedTask(null)
}

export const BackToTopics = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement>,
    setSelectedTopic: SetState<Topic | null>,
) => {
    setCurrentView(ref)
    setSelectedTopic(null)
}