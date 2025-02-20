import { Notification } from '../../../../types'
import NotificationComponent from './notificationComponent';
import './notifications.scss'

interface NotificationListProps {
    notifications: Notification[] | null;
}

const NotificationList = ({notifications}: NotificationListProps) => {
    return (
        <div className='notification-list--component'>
            {notifications ? 
                <div className="notification-list">
                    {notifications.map((notification) => (
                        <NotificationComponent notification={notification} key={notification.id}/>
                    ))}
                </div>
                :
                <div className='no-notifications'>
                    Уведомлений нет    
                </div>
            }
        </div>
    )
}

export default NotificationList