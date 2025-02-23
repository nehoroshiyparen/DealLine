import { useParams } from "react-router-dom"
import DiscussionService from "../../service/discussionService"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { Discussion, MiniUser, Task, Topic } from "../../types"

const useDiscussionEditingState = () => {
    const { id } = useParams()
    const user = useSelector((state: RootState) => state.user.user)
    const [discussion, setDiscussion] = useState<Discussion>()

    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [owner, setOwner] = useState<MiniUser>()
    const [members, setMembers] = useState<MiniUser[]>()

    const [selectedTopic, setSelectedTopic] = useState<Topic| null>(null)
    const [selectedTopicTitle, setSelectedTopicTitle] = useState<string>('')

    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [selecetedTaskTitle, setSelectedTaskTitle] = useState<string>('')

    const fetchDiscussion = async() => {
        try {
            const response = await DiscussionService.fetchDiscussions(user!.id, Number(id))
            const discussion = Array.isArray(response.data) 
                ? response.data[0]
                : response.data

            setDiscussion(discussion)

            setTitle(discussion.title)
            setDescription(discussion.description)
            setOwner(discussion.owner)
            setMembers(discussion.members)

        } catch (e) {
            console.log('Произошла ошибка при получении информации об обсуждении: ', e)
        }
    }

    useEffect(() => {
        fetchDiscussion()
    }, [])

    useEffect(() => {
        if (selectedTopic) {
            setSelectedTopicTitle(selectedTopic.title)
            setSelectedTask(null)
        }
    }, [selectedTopic])

    useEffect(() => {
        if (selectedTask) {
            setSelectedTaskTitle(selectedTask.title)
        }
    }, [selectedTask])



    return {
        user, 
        discussion,
        title, setTitle,
        description, setDescription,
        owner, setOwner,
        members, setMembers,
        selectedTopic, setSelectedTopic,
        selectedTopicTitle, setSelectedTopicTitle,
        selectedTask, setSelectedTask,
        selecetedTaskTitle, setSelectedTaskTitle,
    }
}

export default useDiscussionEditingState