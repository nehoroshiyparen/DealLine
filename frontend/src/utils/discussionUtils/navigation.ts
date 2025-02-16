import { Dispatch, SetStateAction } from "react";
import { Task, Topic } from "../../types";

type SetState<T> = Dispatch<SetStateAction<T>>
//
type ViewState = React.RefObject<HTMLDivElement | null>

export const ShowTopics = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement | null>,
    setSelectedTopic: SetState<Topic | null>,
    setSelectedTask: SetState<Task | null>
    
) => {
    setCurrentView(ref)
    setSelectedTopic(null)
    setSelectedTask(null)
}

export const ShowTopic = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement | null>,
    setSelectedTopic: SetState<Topic | null>,
    topic: Topic | null,
    setSelectedTask: SetState<Task | null>,
) => {
    setCurrentView(ref)
    setSelectedTopic(topic)
    setSelectedTask(null)
}

export const BackToTopic = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement | null>,
    setSelectedTask: SetState<Task | null>,
) => {
    setCurrentView(ref)
    setSelectedTask(null)
}


export const ShowTask = (
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement | null>,
    setSelectedTask: SetState<Task | null>,
    task: Task | null
) => {
    setCurrentView(ref)
    setSelectedTask(task)
}

export const BackToMain = async(
    setCurrentView: SetState<ViewState>,
    ref: React.RefObject<HTMLDivElement | null>,
    setSelectedTopic: SetState<Topic | null>,
    setSelectedTask: SetState<Task | null>
) => {
    setCurrentView(ref)
    setSelectedTask(null)
    await new Promise(resolve => setTimeout(resolve, 200))
    setSelectedTopic(null)
}