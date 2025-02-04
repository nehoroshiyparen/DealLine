import { Dispatch, SetStateAction } from "react";
import { Task, Topic } from "../../types";

type SetState<T> = Dispatch<SetStateAction<T>>
//
type ViewState = string

export const handleShowTopics = (
    setCurrentView: SetState<ViewState>,
    setSelectedTopic: SetState<Topic | null>,
    setSelectedTask: SetState<Task | null>
) => {
    setCurrentView('topics')
    setSelectedTopic(null)
    setSelectedTask(null)
}

export const handleShowTopic = (
    setCurrentView: SetState<ViewState>,
    setSelectedTopic: SetState<Topic | null>,
    setSelectedTask: SetState<Task | null>,
    topic: Topic
) => {
    setCurrentView('topic')
    setSelectedTopic(topic)
    setSelectedTask(null)
}

export const handleShowTask = (
    setCurrentView: SetState<ViewState>,
    setSelectedTask: SetState<Task | null>,
    task: Task
) => {
    setCurrentView('task')
    setSelectedTask(task)
}

export const handleBackToMain = (
    setCurrentView: SetState<ViewState>,
    setSelectedTopic: SetState<Topic | null>,
    setSelectedTask: SetState<Task | null>
) => {
    setCurrentView('main')
    setSelectedTopic(null)
    setSelectedTask(null)
}

export const handleBackToTopics = (
    setCurrentView: SetState<ViewState>,
    setSelectedTopic: SetState<Topic | null>,
) => {
    setCurrentView('topics')
    setSelectedTopic(null)
}