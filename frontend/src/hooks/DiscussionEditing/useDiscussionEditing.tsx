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
    const [updatedDiscussion, setUpdatedDiscussion] = useState<Partial<Discussion> & { id?: number }>({})

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [owner, setOwner] = useState<MiniUser>()
    const [members, setMembers] = useState<MiniUser[]>()

    const [selectedTopic, setSelectedTopic] = useState<Topic| null>(null)
    const [selectedTopicTitle, setSelectedTopicTitle] = useState<string>('')

    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [selecetedTaskTitle, setSelectedTaskTitle] = useState<string>('')
    const [selectedTaskDescription, setSelectedTaskDescription] = useState<string>('')
    const [selectedTaskAssignees, setSelectedTaskAssignees] = useState<MiniUser[] | undefined>(undefined)
    const [selectedTaskDeadline, setSelectedTaskDeadline] = useState<Date | null>(null)
    const [selectedTaskPriority, setSelectedTaskPriority] = useState('')
    const [selectedTaskStatus, setSelectedTaskStatus] = useState('')

    const fetchDiscussion = async() => {
        try {
            const response = await DiscussionService.fetchDiscussions(user!.id, Number(id))
            const discussion = Array.isArray(response.data) 
                ? response.data[0]
                : response.data

            setDiscussion(discussion)
            setUpdatedDiscussion(discussion)


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
        if (selectedTopic && updatedDiscussion?.topics) {
            const topic = updatedDiscussion.topics.find(t => t.id === selectedTopic.id);
            if (topic) {
                setSelectedTopicTitle(topic.title);
            }
        }
    }, [selectedTopic]);

    useEffect(() => {
        setSelectedTask(null);
    }, [selectedTopic])

    useEffect(() => {
        if (selectedTask && updatedDiscussion?.topics) {
            let foundTask: Task | undefined;
            updatedDiscussion.topics.forEach(topic => {
                const task = topic.tasks.find(t => t.id === selectedTask.id);
                if (task) foundTask = task;
            });
    
            if (foundTask) {
                setSelectedTaskTitle(foundTask.title);
                setSelectedTaskDescription(foundTask.description);
                setSelectedTaskAssignees(foundTask.assignees);
                setSelectedTaskDeadline(foundTask.deadline);
                setSelectedTaskPriority(foundTask.priority);
                setSelectedTaskStatus(foundTask.status);
            } else {
                setSelectedTaskTitle('');
            }
        }
    }, [selectedTask]);

    const updateField = (
        field: string,
        value: any,
        id: number,
        entityType: 'discussion' | 'topic' | 'task'
    ) => {
        console.log(field)

        setUpdatedDiscussion((prev) => {
            let updated = { ...prev }

            if (entityType === 'discussion') {
                updated[field as keyof Discussion] = value
            } else if (entityType === 'topic') {
                updated.topics = updated.topics!.map((topic) => 
                    topic.id === id ? { ...topic, [field]: value} : topic
                )
            } else if (entityType === 'task') {
                updated.topics = updated.topics!.map((topic) => ({
                    ...topic,
                    tasks: topic.tasks.map((task) =>
                        task.id === id ? { ...task, [field]: value } : task
                    )
                }));
            }

            return updated
        })
    }

    useEffect(() => {
        console.log(updatedDiscussion)
    }, [updatedDiscussion])

    return {
        user, 
        discussion,
        updatedDiscussion,
        updateField,
        title, setTitle,
        description, setDescription,
        owner, setOwner,
        members, setMembers,
        selectedTopic, setSelectedTopic,
        selectedTopicTitle, setSelectedTopicTitle,
        selectedTask, setSelectedTask,
        selecetedTaskTitle, setSelectedTaskTitle,
        selectedTaskDescription, setSelectedTaskDescription,
        selectedTaskAssignees, setSelectedTaskAssignees,
        selectedTaskDeadline, setSelectedTaskDeadline,
        selectedTaskPriority, setSelectedTaskPriority,
        selectedTaskStatus, setSelectedTaskStatus,
    }
}

export default useDiscussionEditingState