import './DiscussionEditing.scss'
import useDiscussionEditingState from '../../hooks/DiscussionEditing/useDiscussionEditing'
import DefaultSeparation from './components/separation/default-separation'
import { DiscussionEditProvider } from './context+provider/discussionEditProvider'
import DiscussionEditSection from './sections/discussionEditSection/discussionEditSection'
import TopicEditSection from './sections/topicEditSection/topicEditSection'
import TaskEditSection from './sections/taskEditSection/taskEditSection'
import SaveSection from './sections/saveSection/saveSection'

const DiscussionEditing = () => {

    const state = useDiscussionEditingState()

    const ContextValue = {
        user: state.user,
        discussion: state.discussion,
        updatedDiscussion: state.updatedDiscussion,
        isNewDiscussion: state.isNewDiscussion,
        updateField: state.updateField,
        addTopic: state.addTopic,
        deleteTopic: state.deleteTopic,
        addTaskToTopic: state.addTaskToTopic,
        deleteTask: state.deleteTask,
        createNewDiscussion: state.createNewDiscussion,
        saveChanges: state.saveChanges,
        deleteDiscussion: state.deleteDiscussion,
        title: state.title,
        setTitle: state.setTitle,
        description: state.description,
        setDescription: state.setDescription,
        owner: state.owner,
        setOwner: state.setOwner,
        members: state.members,
        setMembers: state.setMembers,

        selectedTopic: state.selectedTopic,
        setSelectedTopic: state.setSelectedTopic,
        selectedTopicTitle: state.selectedTopicTitle,
        setSelectedTopicTitle: state.setSelectedTopicTitle,

        selectedTask: state.selectedTask,
        setSelectedTask: state.setSelectedTask,
        selectedTaskTitle: state.selecetedTaskTitle,
        setSelectedTaskTitle: state.setSelectedTaskTitle,
        selectedTaskDescription: state.selectedTaskDescription,
        setSelectedTaskDescription: state.setSelectedTaskDescription,
        selectedTaskAssignees: state.selectedTaskAssignees,
        setSelectedTaskAssignees: state.setSelectedTaskAssignees,
        selectedTaskDeadline: state.selectedTaskDeadline,
        setSelectedTaskDeadline: state.setSelectedTaskDeadline,
        selectedTaskPriority: state.selectedTaskPriority,
        setSelectedTaskPriority: state.setSelectedTaskPriority,
        selectedTaskStatus: state.selectedTaskStatus,
        setSelectedTaskStatus: state.setSelectedTaskStatus,
    }

    return (
        <div className="DiscussionEditing">
            <div className="edit-wrapper">
                <DiscussionEditProvider value={ContextValue}>
                    <DiscussionEditSection/>
                    <DefaultSeparation/>
                    <TopicEditSection/>
                    <DefaultSeparation/>
                    <TaskEditSection/>
                    <DefaultSeparation/>
                    <SaveSection/>
                </DiscussionEditProvider>
            </div>
        </div>
    )
}

export default DiscussionEditing