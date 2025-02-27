import { Link } from "react-router-dom"

const NewDiscussion = () => {
    return (
        <Link to={'/discussions/create'}>
            <div className="discussion new-discussion">
                Создать новое обсуждение 
            </div>
        </Link>
    )
}

export default NewDiscussion