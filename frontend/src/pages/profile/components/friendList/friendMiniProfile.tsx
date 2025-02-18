import { Link } from "react-router-dom";
import DefaultAvatar from "../../../../components/common/memberList/defaultAvatar";
import { MiniUser } from "../../../../types"
import './friendList.scss'

interface FriendMiniProfileProps {
    friend: MiniUser;
}

const FriendMiniProfile = ({friend}: FriendMiniProfileProps) => {
    return (
        <Link to={`../user/${friend.username}`}>
            <div className="friend-mini-profile">
                <div className="friend_avatar">
                    <DefaultAvatar avatar={friend.avatar}/>
                </div>
                <div className="friend-info--wrapper">
                    <div className="friend_username">
                        {friend.username}
                    </div>
                    <div className="friend_email">
                        {friend.email}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default FriendMiniProfile