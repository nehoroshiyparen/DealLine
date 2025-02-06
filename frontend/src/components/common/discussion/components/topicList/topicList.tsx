import { useContext, useEffect, useRef } from "react"
import { Topic } from "../../../../../types"
import TopicComponent from "../topicComponent/topic"
import './topicList.scss'
import { useDiscussionContext } from "../../discussion"

interface Props {
    topics: Topic[],
}

const TopicList = ({ topics }: Props) => {
    const context = useDiscussionContext()
    if (!context) return

    const { 
        isTopicsOpen, 
        selectedTopic, 
        sizeRef,
        topicsRef,
        topics_header__top,
    } = context

    const contentRef = useRef<HTMLDivElement | null>(null)

    // ЛОГИКА ВЫБОРА КОНКРЕТНОГО ТОПИКА

    useEffect(() => {
        const header = topics_header__top.current
        const container = topicsRef.current
        const size = sizeRef.current
        const border = contentRef.current

        if (!header || !size || !container || !border) return

        if (selectedTopic) {
            header.style.opacity = '0'

            topics.forEach((topic) => {
                if (topic.id !== selectedTopic.id) {
                    const elem = document.querySelector(`#topic-id${topic.id}`) as HTMLElement
                    elem.style.opacity = '0'
                } else {
                    const elem = document.querySelector(`#topic-id${topic.id}`) as HTMLElement
                    elem.classList.add('choosen-topic')
                    elem.style.fontWeight = '600'
                    const headerPosition = header.getBoundingClientRect().top + window.scrollY
                    const elemPosition = elem.getBoundingClientRect().top + window.scrollY
                    const offset = elemPosition - headerPosition

                    container.style.top = `-${offset}px`
                    container.style.height = `${elem.scrollHeight}`
                    size.style.height = `${elem.scrollHeight}`
                    border.style.borderColor = '#ffffff00'
                }
            })
        } else {
            header.style.opacity = '1'

            topics.forEach((topic) => {
                const elem = document.querySelector(`#topic-id${topic.id}`) as HTMLElement
                elem.classList.remove('choosen-topic')
                elem.style.fontWeight = 'normal'
                elem.style.opacity = '1'
                container.style.top = `0px`
                border.style.borderColor = '#505050'
            })
        }
    }, [selectedTopic])

    // ЛОГИКА ОТКРЫТИЯ

    useEffect(() => {
        const content = contentRef.current
        if (!content) return

        if (isTopicsOpen) {
            content.style.height = `${content.scrollHeight}px`
        } else {
            content.style.height = `${content.scrollHeight}px`
            requestAnimationFrame(() => {
                content.style.height = '0px'
            })
        }
    }, [isTopicsOpen])

    return (
        <div className="topics-list">
            <div 
                className="topics-list-content" 
                ref={contentRef}
                style={{
                    overflow: 'hidden',
                    transition: 'height 0.3s ease-in-out',
                }}
            >
                {topics.map((topic, index) => (
                    <div className="hightest-topic" id={`topic-id${topic.id}`} key={index}>
                        <TopicComponent topic={topic} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopicList
