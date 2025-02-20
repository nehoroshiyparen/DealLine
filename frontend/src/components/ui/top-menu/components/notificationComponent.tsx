import { Link } from 'react-router-dom';
import { Notification } from '../../../../types'
import './notifications.scss'
import NotificationService from '../../../../service/notificationService';

interface NotificationComponentProps {
    notification: Notification;
}

const NotificationComponent = ({notification}: NotificationComponentProps) => {

    const accept_friendRequest = async() => {
        try {
            await NotificationService.accept_friendRequest(notification.id)
        } catch (e) {
            console.log('Ошибка при принятии запроса дружбы')
        }
    }

    const accept_discussionInvitation = async() => {
        try {
            await NotificationService.accept_discussionInvitation(notification.id, notification.discussionId)
        } catch (e) {
            console.log('Ошибка при принятии запроса на вступление в проект')
        }
    }

    const reject = async() => {
        try {
            await NotificationService.reject(notification.id)
        } catch (e) {
            console.log('Ошибка при отклонении предложения')
        }
    }

    return (
        <div className={`notification--component type-${notification.type}`}>
            <div className='notification-main-info'>
                <div
                    style={{backgroundImage: 
                        `url(${notification.type === 'friend_request' ?
                            '/images/add-friend.png' 
                            : notification.type === 'discussion_invitation' ? 
                                '/images/project--_white.png' 
                                : '/images/info-white.png'})`,
                            backgroundSize: 'cover'
                }} 
                    className='notification-type--image'>

                </div>
                <div className='notification-info--container'>
                    {notification.type === 'friend_request' ?
                        <div>
                            <Link to={`../user/${notification.Sender.username}`} className='blue-text--link'>
                                {notification.Sender.username}
                            </Link> отправи(л/ла) вам запрос в друзья 
                        </div>
                        : notification.type === 'discussion_invitation' ? 
                            <div>
                                <Link to={`../user/${notification.Sender.username}`} className='blue-text--link'>
                                    {notification.Sender.username}
                                </Link> приглашает вас принять участие в проекте
                            </div>
                            : notification.message
                    }
                </div>
            </div>
            {notification.type === 'friend_request' ?
                <div className='notification-functions'>
                    <div className='notification-func--button func-accept' onClick={accept_friendRequest}>
                        Принять заявку
                    </div>
                    <div className='notification-func--button func-reject' onClick={reject}>
                        Отклонить
                    </div>
                </div>
                    : notification.type === 'discussion_invitation' ? 
                    <div className='notification-functions'>
                        <div className='notification-func--button func-accept' onClick={accept_discussionInvitation}>
                            Принять заявку
                        </div>
                        <div className='notification-func--button func-reject' onClick={reject}>
                            Отклонить
                        </div>
                    </div>
                        : 
                        <div className='notification-functions' style={{justifyContent: 'flex-start', marginLeft: '20px'}}>
                            <div className='notification-func--button func-accept' onClick={reject}>
                                Понял!
                            </div>
                        </div>
                
            }
        </div>
    )
}

export default NotificationComponent