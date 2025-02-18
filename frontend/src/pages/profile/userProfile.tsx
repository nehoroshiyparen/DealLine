import { useParams } from "react-router-dom"
import UserService from "../../service/userService"
import { useEffect, useState } from "react"
import { AdvancedUser } from "../../types"
import './userProfile.scss'
import DefaultAvatar from "../../components/common/memberList/defaultAvatar"
import FriendList from "./components/friendList/friendList"
import PublicDiscussionsList from "./components/publicDiscussionsList/publicDiscussionsList"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"

const UserProfile = () => {

    const { username } = useParams()
    const [owner, setOwner] = useState<AdvancedUser | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const user = useSelector((state: RootState) => state.user.user)

    const fetchUser = async() => {
        try {
            const response = await UserService.fetchOneUser(username!)
            if (response.data) {
                setOwner(response.data.user)
            }
        } catch (e) {
            console.log('Пользователя с таким useraname не найдено')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (username) {
            fetchUser()
        }
    }, [username])

    if (isLoading) {
        return (
            <div>
                Загрузка пользователя...
            </div>
        )
    }

    if (!owner) {
        return (
            <div>
                Такого пользователя не существует
            </div>
        )
    }

    return (
        <div className="user-profile">
            <div className="user-profile--container">
                <div className="beauty-background--block">
                    <div className="profile-header">
                        <div className="profile_avatar">
                            <div className="avatar-background">
                                <DefaultAvatar avatar={owner.avatar}/>
                            </div>
                        </div>
                        <div className="profile_wrapper">
                            <div className="profile-header_main">
                                <div className="header-left--block">
                                    <div className="user_username">
                                        {owner.username}
                                    </div>
                                    <div className="edit-under--information">
                                        Укажите информацию о себе
                                    </div>
                                </div>
                                <div className="header-right--block">
                                    {user ? 
                                        user.id === owner.id ? 
                                            <div className="edit-profile--button header-profile--button">
                                                Редактировать
                                            </div>
                                        : 
                                            <div className="edit-profile--button header-profile--button">
                                                Добавить в друзья
                                            </div>
                                        : 
                                            <div className="edit-profile--button header-profile--button">
                                                Добавить в друзья
                                            </div>
                                    }
                                    <div className="more-profile--button header-profile--button">
                                        Еще ⬇
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-content--layout">
                    <div className="left-content--wrapper content-layout--wrapper">
                        <div className="wrapper--inside">
                            <div className="wrapper-head--title_discussions">
                                Публичные проекты
                            </div>
                            <PublicDiscussionsList publicDiscussions={owner.discussions}/>
                        </div>
                    </div>
                    <div className="right-content--wrapper content-layout--wrapper">
                        <div className="wrapper--inside">
                            <div className="wrapper-head--title_friends">
                                Друзья  <span style={{color: '#797979'}}>{owner.friends.length}</span>
                            </div>
                            <FriendList friends={owner.friends}/>
                        </div>
                    </div>
                </div>
                <div className="costblLb">

                </div>
            </div>
        </div>
    )
}

export default UserProfile