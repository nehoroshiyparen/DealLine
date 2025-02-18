import { MiniUser } from "../../../../types"
import FriendMiniProfile from "./friendMiniProfile"
import './friendList.scss'

interface FriendListProps {
    friends: MiniUser[]
}

const FriendList = ({friends}: FriendListProps) => {
    return (
        <div className="friend-list--container">
            <div className="friend-list--inside">
                {friends.slice(0,5).map((friend) => (
                    <FriendMiniProfile friend={friend} key={friend.id}/>
                ))}
            </div>
        </div>
    )
}

export default FriendList