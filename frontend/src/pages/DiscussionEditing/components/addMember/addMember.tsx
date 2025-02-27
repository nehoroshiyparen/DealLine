import { useEffect, useRef, useState } from 'react'
import './addMember.scss'
import { MiniUser } from '../../../../types'
import AvailableUser from './member';
import DiscussionService from '../../../../service/discussionService';
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext';

interface AddMemberProps {
    users: MiniUser[] | undefined;
    type: 'friends' | 'assignees';
}

const AddMember = ({users, type}: AddMemberProps) => {

    const [isListOpen, setIsListOpen] = useState<boolean>(false)
    const listRef = useRef<HTMLDivElement | null>(null)

    const {
        user,
        discussion,
        selectedTask,
        updateField,
        selectedTaskAssignees,
        setSelectedTaskAssignees,
        isNewDiscussion,
    } = useDiscussionEditContext()

    const openList = () => {
        setIsListOpen((prev) => !prev)
    }

    useEffect(() => {
        const list = listRef.current

        if (!list) return

        if (isListOpen) {
            list.style.height = '300px'
        } else {
            list.style.height = '0px'
        }
    }, [isListOpen])

    const addFriend = (reciever: MiniUser) => {
        try {
            if (user && discussion) {
                const response = DiscussionService.sendInvitation(user?.id, reciever.id, discussion.id!)
                console.log(response)
            }
        } catch (e) {
            console.log('Не получилось отправить приглашение в обсуждение', e)
        }
    }

    const addAssignee = (user: MiniUser) => {
        console.log("Добавляем пользователя:", user);
        console.log("Текущие исполнители:", selectedTaskAssignees);
    
        if ((selectedTaskAssignees || []).some(assignee => assignee.id === user.id)) {
            console.log("Пользователь уже в списке!");
            return selectedTaskAssignees; 
        }
    
        setSelectedTaskAssignees(prev => {
            console.log("Обновляем локальный стейт:", prev);
            return [...(prev || []), user];
        });
    };

    useEffect(() => {
        if (selectedTaskAssignees) {
            updateField(
                "assignees",
                selectedTaskAssignees,
                selectedTask!.id,
                "task"
            );
        }
    }, [selectedTaskAssignees])

    if (isNewDiscussion && type === 'friends') return null

    return (
        <div className="add-member">
            <div className='example' onClick={openList}>
                <div className="mini-profile--avatar">
                    <div
                        style={{
                            width: '45px',
                            backgroundImage: `url('/images/profile.png')`,
                            backgroundSize: 'cover',
                        }}
                        className="member-avatar"/>
                </div>
                <div className='text-_send_invitation_'>
                    {type === 'friends' ? 'Пригласите нового участника' : 'Добавьте ответственных'}
                </div>
                <div className={`invitation-list--open`} style={{rotate: `${isListOpen ? '-90deg' : '0deg'}`}}>

                </div>
            </div>
            <div className={`invitation-list`} ref={listRef}>
                <div className='invitation-list--inside'>
                    <input 
                        className='search-person--input'
                        placeholder='Найти человека'
                        />
                </div>
                <div className='searching-list'>
                    {users?.map((user) => (
                        <AvailableUser user={user} key={user.id} func={type === 'friends' ? 
                            addFriend : 
                            addAssignee}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddMember