import './discussion.scss'
import { Discussion as DiscussionType } from '../../../types'
import TopicList from './topicList/topicList'
import MainInfo from './mainInfo/mainInfo'
import { useDiscussionState } from '../../../hooks/discussionComponent/useDiscussionState'
import { DiscussionProvider } from './context+provider/discussionProvider'
import { useDiscussionAnimation } from '../../../hooks/discussionComponent/useDiscussionAnimations'

interface DiscussionProps {
    discussion: DiscussionType
}

export default function Discussion({ discussion }: DiscussionProps) {

    const state = useDiscussionState(discussion)

    const ContextValue = {
        //Ссылки
        sizeRef: state.sizeRef,
        contentContainerRef: state.contentContainerRef,
        discussionRef: state.discussionRef,
        topicsRef: state.topicsRef,
        taskRef: state.taskRef,
        topicsHeaderRef: state.topicsHeaderRef,

        topicListContentRef: state.topicListContentRef,
        topicContentRef: state.topicContentRef,
        taskContentRef: state.taskContentRef,
        //Стейты
        isOpen: state.isOpen, setIsOpen: state.setIsOpen,
        isTopicsOpen: state.isTopicsOpen, setIsTopicsOpen: state.setIsTopicsOpen,
        currentView: state.currentView, setCurrentView: state.setCurrentView,
        prevView: state.prevView, setPrevView: state.setPrevView,
        selectedTopic: state.selectedTopic, setSelectedTopic: state.setSelectedTopic,
        selectedTask: state.selectedTask, setSelectedTask: state.setSelectedTask,
        //Функции
        NavigateToTopics: state.NavigateToTopics,
        NavigateToMain: state.NavigateToMain,
        NavigateToTopic: state.NavigateToTopic,
        NavigateBackToTopic: state.NavigateBackToTopic,
        NavigateToTask: state.NavigateToTask,

        OpenMain: state.OpenMain,
        OpenTopics: state.OpenTopics,
    }

    useDiscussionAnimation({
        sizeRef: state.sizeRef,
        contentContainerRef: state.contentContainerRef,
        discussionRef: state.discussionRef,
        topicsRef: state.topicsRef,
        taskRef: state.taskRef,
        topicsHeaderRef: state.topicsHeaderRef,

        topicListContentRef: state.topicListContentRef,
        topicContentRef: state.topicContentRef,
        taskContentRef: state.taskContentRef,

        isOpen: state.isOpen, setIsOpen: state.setIsOpen,
        isTopicsOpen: state.isTopicsOpen, setIsTopicsOpen: state.setIsTopicsOpen,
        currentView: state.currentView, setCurrentView: state.setCurrentView,
        prevView: state.prevView, setPrevView: state.setPrevView,
        selectedTopic: state.selectedTopic, setSelectedTopic: state.setSelectedTopic,
        selectedTask: state.selectedTask, setSelectedTask: state.setSelectedTask,

        discussion: discussion,
    })

    console.log(state.selectedTask, ' - selectedTask. ', state.selectedTopic, ' - selectedTopic')

    return (
        <DiscussionProvider value={ContextValue}>
        <div className='discussion'>
            <div className='discussion-header'>
                <div 
                    className='disc-title' 
                    onClick={!state.isOpen || state.currentView.current === state.discussionRef.current ? state.OpenMain : () => {}}
                    style={{ borderBottom: state.isOpen ? '1px solid #505050' : '1px solid hsla(0, 0.00%, 100.00%, 0.00)' }}
                >
                    <div className='path'>
                        <span onClick={state.NavigateToMain}>{discussion.title}</span>
                        {state.currentView !== state.discussionRef && (
                            <span style={{ marginLeft: '10px' }}>
                                <span onClick={state.NavigateToTopics}>{state.currentView === state.topicsRef && '/ Темы'}</span>
                                {state.selectedTopic && ` / ${state.selectedTopic?.title}`}
                                {state.currentView === state.taskRef && ` / ${state.selectedTask?.title}`}
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
                ref={state.sizeRef} 
                style={{ 
                    transition: 'height 0.5s, padding 0.3s',
                    overflow: 'hidden',
                    height: '0px',
                    padding: '0px 30px'
                }}
            >
                <div className='content-container' ref={state.contentContainerRef}>
                    <div className='discussion-info' ref={state.discussionRef}>
                        <MainInfo discussion={discussion}/>
                    </div>
                    <div className="topics-header--top" onClick={state.OpenTopics} ref={state.topicsHeaderRef}>
                        <span>Темы</span>
                        <div className='topic-header--disc --show' style={{rotate: `${state.isTopicsOpen ? '-90deg' : '0deg'}`}}>
                            <img src='/images/direction.png' width={'100%'}/>
                        </div>
                    </div>
                    <div className='topics-section' ref={state.topicsRef}>
                        <TopicList topics={discussion.topics}/>
                    </div>
                </div>
            </div>
        </div>
        </DiscussionProvider>
    )
}