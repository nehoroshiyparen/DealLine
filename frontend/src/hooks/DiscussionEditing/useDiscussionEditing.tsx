import { useNavigate, useParams } from "react-router-dom"
import DiscussionService from "../../service/discussionService"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { Discussion, emptyDiscussion, MiniUser, Task, Topic } from "../../types"
import { v4 as uuidv4 } from 'uuid'
import { TopicService } from "../../service/topicService"
import { TaskService } from "../../service/ taskService"
import generatePatch from '../../utils/discussionUtils/generatePatch'

const useDiscussionEditingState = () => {
    const { id } = useParams()
    const user = useSelector((state: RootState) => state.user.user)
    const [discussion, setDiscussion] = useState<Partial<Discussion>>({})
    const [updatedDiscussion, setUpdatedDiscussion] = useState<Partial<Discussion> & { id?: number }>({})

    const isNewDiscussion = !id
    const [creationDone, setCreationDone] = useState<boolean>(false)

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

    const [deletedTopics, setDeletedTopics] = useState<number[]>([])
    const [deletedTasks, setDeletedTasks] = useState<number[]>([])

    const newDiscussion = {
        ...emptyDiscussion,
        owner: user,
        members: user ? [user] : []
    }

    const navigate = useNavigate()

    const fetchDiscussion = async() => {
        try {
            if (!id) {
                setDiscussion(newDiscussion)

                setTitle(''); 
                setDescription('');
                setOwner(user); 
                setMembers([user]);
                
                setUpdatedDiscussion(newDiscussion)

                return
            }

            const response = await DiscussionService.fetchDiscussions(user!.id, Number(id))
            const discussion = Array.isArray(response.data) 
                ? response.data[0]
                : response.data

            setDiscussion(discussion)

            setTitle(discussion.title)
            setDescription(discussion.description)
            setOwner(discussion.owner)
            setMembers(discussion.members)

            setUpdatedDiscussion(discussion)
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

    const addTopic = () => {
        const newTopic: Omit<Partial<Topic>, "id"> & { id?: number | string } = {
            id: uuidv4(), 
            title: '',
            tasks: []
        };

        setSelectedTopic(newTopic as Topic)
    
        setUpdatedDiscussion(prev => ({
            ...prev,
            topics: [...(prev.topics || []), newTopic as Topic]
        }));
    };

    const deleteTopic = (topicId: number) => {
        setDeletedTopics(prev => [...prev, topicId])
        setUpdatedDiscussion(prev => ({
            ...prev,
            topics: prev.topics?.filter(topic => topic.id !== topicId) || []
        }))

        setSelectedTopic(null)
    }

    const addTaskToTopic = (topicId: number) => {
        const newTask: Omit<Partial<Task>, "id"> & { id?: number | string } = {
            id: uuidv4(),
            title: '', 
            assignees: [],
            topicId
        }

        setSelectedTask(newTask as Task)

        setUpdatedDiscussion(prev => ({
            ...prev,
            topics: prev.topics?.map(topic =>
                topic.id === topicId
                    ? { ...topic, tasks: [...topic.tasks, newTask as Task] }
                    : topic
            ) || []
        }));
    };

    const deleteTask = (taskId: number) => {
        setDeletedTasks(prev => [...prev, taskId])
        setUpdatedDiscussion(prev => ({
            ...prev,
            topics: prev.topics?.map(topic => ({
                ...topic,
                tasks: topic.tasks.filter(task => task.id !== taskId)
            })) || []
        }))

        setSelectedTask(null)
    }

    const createNewDiscussion = async() => {
        try {
            const response = await DiscussionService.createDiscussion(user.id)
            const newDiscussion = response.data.discussion

            setDiscussion(prev => ({
                ...prev,
                id: newDiscussion.id
            }))
            setUpdatedDiscussion(prev => ({
                ...prev,
                id: newDiscussion.id
            }))
            setCreationDone(true)
        } catch (e) {
            console.log('Ошибка при создании обсуждения', e)
        }
    }

    useEffect(() => {
        if (isNewDiscussion) {
            saveChanges()
        }
    }, [creationDone])

    const saveChanges = async() => {
        try {
            if (discussion?.id! < 0) {
                await createNewDiscussion()
            }

            const topicIdMap = new Map<string, number>();
            const taskIdMap = new Map<string, number>();
    
            if (!discussion.id) return

            const topicsToCreate = updatedDiscussion.topics?.filter(topic => 
                typeof topic.id === 'string'
            ) || []

            for (const topic of topicsToCreate) {
                const response = await TopicService.createTopic(discussion!.id)
                const newTopicId = response.data.topic.id;
                
                topicIdMap.set(String(topic.id), newTopicId);
                topic.id = newTopicId
            }

            const tasksToCreate = updatedDiscussion.topics?.flatMap(topic => 
                topic.tasks
                    .filter(task => typeof task.id === 'string')
                    .map(task => ({
                        ...task,
                        topicId: topicIdMap.get(String(task.topicId)) ?? task.topicId,
                    }))
            ) || [];

            for (const task of tasksToCreate) {
                console.log(task.topicId)
                const response = await TaskService.createTask(task.topicId)
                const newTaskId = response.data.id;

                taskIdMap.set(String(task.id), newTaskId);
                task.id = newTaskId;
                console.log(response.data)
            }

            for (const topicId of deletedTopics) {
                if (typeof topicId === 'number') {
                    await TopicService.deleteTopic(topicId)
                }
            }

            for (const taskId of deletedTasks) {
                if (typeof taskId === 'number') {
                    await TaskService.deleteTask(taskId)
                }
            }

            const patch = generatePatch(discussion as Discussion, updatedDiscussion, topicIdMap, taskIdMap)
            if (Object.keys(patch).length === 0 && (deletedTasks.length + deletedTopics.length === 0)) {
                console.log('Изменений не было. Запрос на изменение не отправлен')  
                return
            } 

            setDeletedTasks([])
            setDeletedTopics([])

            console.log(updatedDiscussion)
            console.log(patch)
            const response = await DiscussionService.saveChanges(discussion!.id, patch)
            console.log(response.data)
        } catch (e) {
            console.log('Ошибка при попытке сохранить изменения', e)
        }
    }

    const deleteDiscussion = async() => {
        try {
            if (!discussion?.id) {
                console.log('Обсуждения не существует. Невозможно его удалить');
                return;
            }

            const response = await DiscussionService.deleteDiscussion(discussion!.id)
            console.log(response)
            navigate('/discussions')
        } catch (e) {
            console.log('При удалении обсуждения на стороне сервера произошла ошибка ', e)
        }
    }

    return {
        user, 
        discussion,
        updatedDiscussion,
        isNewDiscussion,
        updateField,
        addTopic,
        deleteTopic,
        addTaskToTopic,
        deleteTask,
        createNewDiscussion,
        saveChanges,
        deleteDiscussion,
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