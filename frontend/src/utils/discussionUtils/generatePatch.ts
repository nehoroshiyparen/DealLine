import { Discussion, DiscussionUpdatingPatch, Task, Topic } from "../../types"

function createPatch<T extends Record<string, any>>(initial: T, current: T): Partial<T> {
    const patch: Partial<T> = {}
    Object.keys(current).forEach(key => {
        if (JSON.stringify(initial[key]) !== JSON.stringify(current[key])) {
            patch[key as keyof T] = current[key]
        }
    })

    return patch
}

function createDiscussionPatch(
    initialDiscussion: Discussion,
    currentDiscussion: Partial<Discussion> & { id?: number }
): DiscussionUpdatingPatch {
    const patch: DiscussionUpdatingPatch = {}

    const discussionPatch = createPatch(initialDiscussion, currentDiscussion)

    if (Object.keys(discussionPatch).length > 0) {
        patch.discussion = discussionPatch
    }

    if (currentDiscussion.topics && initialDiscussion.topics) {
        const topicsPatch = currentDiscussion.topics
            .map(topic => {
                const initial = initialDiscussion.topics.find(t => t.id === topic.id);
                if (!initial) return null;
                const diff = createPatch(initial, topic);
                return Object.keys(diff).length > 0 ? { id: topic.id, ...diff } : null;
            })
            .filter(Boolean) as Partial<Topic>[];

        if (topicsPatch.length > 0) {
            patch.topics = topicsPatch;
        }
    }

    // Обновленные задачи
    if (currentDiscussion.topics && initialDiscussion.topics) {
        const tasksPatch: Partial<Task>[] = [];

        currentDiscussion.topics.forEach(topic => {
            const initialTopic = initialDiscussion.topics.find(t => t.id === topic.id);
            if (!initialTopic) return;

            topic.tasks.forEach(task => {
                const initialTask = initialTopic.tasks.find(t => t.id === task.id);
                if (!initialTask) return;
                
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
