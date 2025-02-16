import { useParams } from "react-router-dom"
import UserService from "../../service/userService"
import { useEffect, useState } from "react"
import { AdvancedUser } from "../../types"
import './userProfile.scss'
import MemberList from "../../components/common/memberList/MemberList"

const UserProfile = () => {

    const { username } = useParams()
    const [user, setUser] = useState<AdvancedUser | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchUser = async() => {
        try {
            const response = await UserService.fetchOneUser(username!)
            if (response.data) {
                setUser(response.data.user)
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

    if (!user) {
        return (
            <div>
                Такого пользователя не существует
            </div>
        )
    }

    return (
        <div className="user-profile">
            <div className="user-profile--container">
                <div className="user-info--top">
                    <div className="user-avatar">
                        <div className='user-pic'
                            style={{
                                backgroundImage: `url(${user?.avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(user.avatar)}` : '/images/profile.png'})`,
                                backgroundSize: '100%'
                            }}>
                        </div>
                    </div>
                    <div className="user-u-e">
                        <div className="user-username">
                            {user.username}
                        </div>
                        <div className="user-email">
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className="user-info--middle">
                    <div className="designation--middle">
                        Дополнительная информация
                    </div>
                    <div className="middle--content">
                        <div className="user-description user-param">
                            О себе: <b>{user.description ? user.description : ' Не указано'}</b>
                        </div>
                        <div className="user-contacts user-param">
                            <div className="">Ссылки на меня: </div>
                            <div className="user-contacts__ --list">
                                {user.contacts ?
                                    user.contacts.map((contact, index) => (
                                        <div className="contact-link--elem" key={index}>
                                            {contact.social_media}: {contact.link}
                                        </div>
                                    ))
                                    : 
                                    <div>
                                        Отсутствуют :(
                                    </div>
                                } 
                            </div>
                        </div>
                        <div className="user-discussions user-param">
                            <div className="">Пользовтель состоит в этих проектах/осбуждениях: </div>
                            <div className="--list">
                                {user.discussions ? 
                                    user.discussions.map((discussion, index) => (
                                        <div key={index}>{index + 1}. {discussion.title} </div>
                                    )) 
                                    : 
                                    <div className="">
                                        Не состоит в обсуждениях
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="user-friends user-param">
                            Друзья: 
                            <MemberList members={user.friends}/>
                        </div>
                    </div>
                </div>
                <div className="user-info--bottom">
                    <span>
                        Показалось что слишком сыро ? Да , тебе не показалось . У меня нет дизайнера, а у меня самого нет сил на то чтобы придумывать крутой дизайн.
                        Все силы ушли на дизайн страницы обсуждений и сетки обсуждений. 
                        Ну в общем поэтому теперь так. Но кстати если ты дизайнер то пиши мне. Я буду тебя очень любить и у нас будут крутые сайты, мы никогда не будем
                        ссориться и будет жить дружно и счастливо. 
                    </span>
                </div>
                <div className="hohoho">
                    <span>
                        Если очень скучно то вот тебе скример, можешь перейти по ссылке и напугаться. Хоть какое-то развлечение будет на странице...
                    </span>
                    <div className="screamer">
                        <a href="https://parad1st.github.io/Screamer/">
                            Ссылка
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile