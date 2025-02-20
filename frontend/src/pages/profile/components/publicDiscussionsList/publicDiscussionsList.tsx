import PublicDiscussion from "./publicDiscussion";

interface publicDiscussionsListProps {
    publicDiscussions: {
        title: string;
        description: string
    }[]
}

const PublicDiscussionsList = ({publicDiscussions}: publicDiscussionsListProps) => {
    return (
        <div className="public-discussions--list">
            {publicDiscussions.map((discussion, index) => (
                <PublicDiscussion title={discussion.title} description={discussion.description} key={index}/>
            ))}
        </div>
    )
}

export default PublicDiscussionsList