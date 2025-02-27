import { Link } from "react-router-dom";
import { MiniUser } from "../../../../types"
import './user.scss'
import { useState } from "react";
import UserService from "../../../../service/userService";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";


interface UserProps {
    user: MiniUser;
    friends: MiniUser[];
}

const User = ({ user, friends }: UserProps) => {

    const MainUser = useSelector((state: RootState) => state.user.user)
    const [isFriend, setIsFriend] = useState<boolean>(friends.some(friend => friend.id === user.id))

    const addFriend = async() => {
        const response = await UserService.addFriend(user.id, MainUser.id, '')
        if (response.status === 200) {
            setIsFriend(prev => !prev)
        }
    }

    const deleteFriend = async() => {
        const response = await UserService.deleteFriend(user.id, MainUser.id)
        if (response.status === 200) {
            setIsFriend(prev => !prev)
        }
    }

    return (
            <div className="user--search">
                <Link to={`/user/${user.username}`}>
                    <div className="user_username--search">
                        {user.username}
                    </div>
                </Link>
                <div className="user--search-functions">
                    <div 
                        className={`search-function ${user.id === MainUser.id ? '' : isFriend ? 'delete-friend--' : 'add-friend--'}`}
                        onClick={isFriend ? addFriend : deleteFriend}
                    >

                    </div>
                </div>
            </div>
    )
}

export default User