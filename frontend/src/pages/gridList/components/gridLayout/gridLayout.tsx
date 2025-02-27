import { Discussion } from "../../../../types";
import './gridLayout.scss'

interface GridLayoutProps {
    discussion: Discussion;
}

const GridLayout = ({discussion}: GridLayoutProps) => {
    return (
        <div className="grid-layout--wrapper">
            <div className="grid-layout--inside">
                <div className="grid-layout_title">
                    {discussion.title}
                </div>
                <div className="grid-info">
                    <div className="grid-param--row">
                        Тем {discussion.topics.length}
                    </div>
                    <div className="grid-param--row">
                        Задач {discussion.topics?.reduce((total, topic) => total + topic.tasks.length, 0) || 0}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GridLayout