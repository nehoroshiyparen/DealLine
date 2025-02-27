import { Discussion, DiscussionUpdatingPatch, emptyTask, emptyTopic, Task, Topic } from "../../types"

function createPatch<T extends Record<string, any>>(initial: T, current: T, excludeKeys: (keyof T)[] = []): Partial<T> {
    const patch: Partial<T> = {}
    Object.keys(current).forEach(key => {
        if (!excludeKeys.includes(key as keyof T) && JSON.stringify(initial[key]) !== JSON.stringify(current[key])) {
            patch[key as keyof T] = current[key]
        }
    })
    return patch
}

function createDiscussionPatch(
    initialDiscussion: Discussion,
    currentDiscussion: Partial<Discussion> & { id?: number },
    topicIdMap: Map<string, number>,
    taskIdMap: Map<string, number>,
): DiscussionUpdatingPatch {
    const patch: DiscussionUpdatingPatch = {}

    const discussionPatch = createPatch(initialDiscussion, currentDiscussion, ["topics"])

    if (Object.keys(discussionPatch).length > 0) {
        patch.discussion = discussionPatch
    }

    if (currentDiscussion.topics && initialDiscussion.topics) {
        const topicsPatch = currentDiscussion.topics
            .map(topic => {
                const initial = initialDiscussion.topics.find(t => t.id === topic.id) || emptyTopic;
                if (!initial) return null;

                const diff = createPatch(initial, topic, ["tasks"]);
                return Object.keys(diff).length > 0 ? { id: topic.id, ...diff } : null;
            })
            .filter(Boolean) as Partial<Topic>[];

        if (topicsPatch.length > 0) {
            patch.topics = topicsPatch;
        }
    }

    if (currentDiscussion.topics && initialDiscussion.topics) {
        const tasksPatch: Partial<Task>[] = [];
    
        currentDiscussion.topics.forEach(topic => {
            const currentTopicId = topicIdMap.get(String(topic.id)) || topic.id;
    
            console.log(currentTopicId);
    
            const initialTopic = initialDiscussion.topics.find(t => t.id === currentTopicId);
    
            if (!initialTopic) {
                topic.tasks.forEach(task => {
                    const newTaskId = taskIdMap.get(String(task.id)) || task.id

                    console.log(newTaskId)
            
                    const { id, topicId, ...taskData } = task
                    tasksPatch.push({ id: newTaskId, topicId: currentTopicId, ...taskData })
                })
            
                return
            }
    
            topic.tasks.forEach(task => {
                const initialTask = initialTopic.tasks.find(t => t.id === task.id) || {
                    title: '',
                    deadline: null,
                    assignees: [],
                    discussionId: task.discussionId
                };
                const diff = createPatch(initialTask, task);
                if (Object.keys(diff).length > 0) {
                    tasksPatch.push({ id: task.id, ...diff });
                }
            });
        });
    
        if (tasksPatch.length > 0) {
            patch.tasks = tasksPatch;
        }
    }
    

    return patch
}

export default createDiscussionPatch
