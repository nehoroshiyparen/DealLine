import './discussion.scss'
import { Discussion as DiscussionType } from '../../../types'
import TopicList from './components/topicList/topicList'
import TopicComponent from './components/topicComponent/topic'
import MainInfo from './components/mainInfo/mainInfo'
import TaskComponent from './components/task/task'
import { useDiscussionState } from '../../../hooks/discussionComponent/useDiscussionState'
import { useDiscussionAnimation } from '../../../hooks/discussionComponent/animations/useDiscussionAnimation'
import { DiscussionProvider } from './context+provider/discussionProvider'
import TopicListHeader from './components/topicListHeader'
import TopicCopy from './components/topicComponent/topicCopy'

interface DiscussionProps {
    discussion: DiscussionType
}

export default function Discussion({ discussion }: DiscussionProps) {
    
    const state = useDiscussionState(discussion)

    useDiscussionAnimation({
        hightestContainerRef: state.hightestContainerRef,
        isOpen: state.isOpen,
        currentView: state.currentView,
        originalSize: state.originalSize,
        selectedTopic: state.selectedTopic,
        selectedTask: state.selectedTask,
        discussionRef: state.discussionRef,
        topicsListRef: state.topicsListRef,
        topicRef: state.topicRef,
        taskRef: state.taskRef,
        topicListHeaderRef: state.topicListHeaderRef,
        topicListContentRef: state.topicListContentRef,
        savedPosition: state.savedPosition,
        setSavedPosition: state.setSavedPosition,
        discussion
    })

    const contextValue = {
        hightestContainerRef: state.hightestContainerRef,
        discussionRef: state.discussionRef,
        topicsListRef: state.topicsListRef,
        topicRef: state.topicRef,
        taskRef: state.taskRef,
        topicListHeaderRef: state.topicListHeaderRef,
        topicListContentRef: state.topicListContentRef,
        isTopicListOpen: state.isTopicListOpen,
        isTopicOpen: state.isTopicOpen,
        isTaskOpen: state.isTaskOpen,
        selectedTopic: state.selectedTopic,
        selectedTask: state.selectedTask,
        savedPosition: state.savedPosition,
        currentView: state.currentView,
        prevView: state.prevView,
        handleOpenTopics: state.handleOpenTopics,
        handleShowTopics: state.handleShowTopics,
        handleBackToTopic: state.handleBackToTopic,
        handleOpenTask: state.handleOpenTask,
        handleChooseTopic: state.handleChooseTopic,
        handleBackToTopics: state.handleBackToTopics,
        setSelectedTopic: state.setSelectedTopic,
        setSelectedTask: state.setSelectedTask,
        setIsTopicOpen: state.setIsTopicOpen,
        setIsTaskOpen: state.setIsTaskOpen,
        setSavedPosition: state.setSavedPosition,
        topicListSectionSize: state.topicListSectionSize,
    }

    return (
        <DiscussionProvider value={contextValue}>
        <div className='discussion'>
            <div className='discussion-header'>
                <div 
                    className='disc-title' 
                    onClick={!state.isOpen || state.currentView === 'discussion' ? state.handleOpen : () => {}}
                    style={{ borderBottom: state.isOpen ? '1px solid #505050' : '1px solid rgba(255, 255, 255, 0)' }}
                >
                    <div className='path'>
                        <span onClick={state.handleBackToMain}>{discussion.title}</span>
                        {state.currentView !== 'discussion' && (
                            <span style={{ marginLeft: '10px' }}>
                                <span 
                                    onClick={state.handleBackToTopics}>{
                                        (state.currentView === 'topicList' || 
                                        state.currentView === 'topic' || 
                                        state.currentView === 'task')  && 
                                        '/ Темы'
                                        }
                                </span>
                                <span onClick={state.handleBackToTopic}>
                                    {state.selectedTopic  && ` / ${state.selectedTopic?.title}`}
                                </span>
                                {state.selectedTask && ` / ${state.selectedTask?.title}`}
                            </span>
                        )}
                    </div>
                    <div className='disc-title--disc --show' style={{ rotate: state.isOpen ? '-90deg' : '0deg' }}>
                        <img src='/images/direction.png' width={'100%'}/>
                    </div>
                </div>
            </div>
            <div 
                className='disc-view' 
                ref={state.hightestContainerRef} 
                style={{ 
                    transition: 'height 0.5s, padding 0.3s',
                    overflow: 'hidden',
                    height: '0px',
                    padding: '0px 30px'
                }}
            >
                <div className='content-container'>
                    {(state.currentView === 'discussion' || state.currentView === 'topicList') && (
                        <div>
                            <div className='discussion-info' 
                                style={{transition: 'opacity 0.3s, all 0.5s', top: '0px', position: 'relative'}}
                                ref={state.discussionRef}
                            >
                                <MainInfo discussion={discussion}/>
                            </div>
                            <div className='topicListheaderRef'
                                style={{transition: 'opacity 0.3s, all 0.5s', top: '0px', position: 'relative'}}
                                ref={state.topicListHeaderRef}
                            >
                                <TopicListHeader/>
                            </div>
                            <div className='topics-section' 
                                style={{transition: 'opacity 0.3s, all 0.5s', top: '0px', position: 'relative'}}
                                ref={state.topicsListRef}
                            >
                                <TopicList topics={discussion.topics}/>
                            </div>
                        </div>
                    )}
                    {state.currentView === 'topic' && (
                        <div className='topic-component' 
                            ref={state.topicRef}
                            style={{transition: 'opacity 0.3s, all 0.5s', top: '0px', position: 'relative'}}
                        >
                            <TopicCopy topic={state.selectedTopic}/>
                        </div>
                    )}
                    {state.currentView === 'task' && (
                        <div className='task-component' 
                            style={{transition: 'opacity 0.3s, all 0.5s', top: '0px', position: 'relative'}}
                            ref={state.taskRef}
                        >
                            <TaskComponent task={state.selectedTask}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </DiscussionProvider>
    )
}