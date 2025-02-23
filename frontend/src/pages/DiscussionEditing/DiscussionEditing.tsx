import { Link } from 'react-router-dom'
import './DiscussionEditing.scss'
import useDiscussionEditingState from '../../hooks/DiscussionEditing/useDiscussionEditing'
import Member from './components/member/member'
import AddMember from './components/addMember/addMember'
import DefaultSeparation from './components/separation/default-separation'
import { DiscussionEditProvider } from './context+provider/discussionEditProvider'
import DiscussionEditSection from './sections/discussionEditSection/discussionEditSection'
import TopicEditSection from './sections/topicEditSection/topicEditSection'
import TaskEditSection from './sections/taskEditSection/taskEditSection'

const DiscussionEditing = () => {

    const state = useDiscussionEditingState()

    const ContextValue = {
        discussion: state.discussion,
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
        setSelectedTaskTitle: state.setSelectedTaskTitle
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
                </DiscussionEditProvider>
            </div>
        </div>
    )
}

export default DiscussionEditing