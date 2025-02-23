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
import useProfileState from "../../hooks/profileComponent/useProfileState"

const UserProfile = () => {

    const state = useProfileState()

    const addFriend = () => {
        state.addFriend()
    }

    const deleteFriend = () => {
        state.deleteFriend()
    }

    if (state.isLoading) {
        return (
            <div>
                Загрузка пользователя...
            </div>
        )
    }

    if (!state.owner) {
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
                                <DefaultAvatar avatar={state.owner.avatar}/>
                            </div>
                        </div>
                        <div className="profile_wrapper">
                            <div className="profile-header_main">
                                <div className="header-left--block">
                                    <div className="user_username">
                                        {state.owner.username}
                                    </div>
                                    <div className="edit-under--information">
                                        Укажите информацию о себе
                                    </div>
                                </div>
                                <div className="header-right--block">
                                    {state.user ? 
                                        state.user.id === state.owner.id ? 
                                            <div className="edit-profile--button header-profile--button">
                                                Редактировать
                                            </div>
                                        : 
                                            state.owner.friends.some((friend) => friend.id === state.user?.id) ? 
                                                <div className="edit-profile--button header-profile--button" onClick={deleteFriend}>
                                                    Удалить из друзей
                                                </div>
                                                :
                                                <div className="edit-profile--button header-profile--button" onClick={addFriend}>
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
                            <PublicDiscussionsList publicDiscussions={state.owner.discussions}/>
                        </div>
                    </div>
                    <div className="right-content--wrapper content-layout--wrapper">
                        <div className="wrapper--inside">
                            <div className="wrapper-head--title_friends">
                                Друзья  <span style={{color: '#797979'}}>{state.owner.friends.length}</span>
                            </div>
                            <FriendList friends={state.owner.friends}/>
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