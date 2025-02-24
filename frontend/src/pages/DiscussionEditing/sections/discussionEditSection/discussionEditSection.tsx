import { Link } from 'react-router-dom'
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext'
import './discussionEditSection.scss'
import Member from '../../components/member/member'
import AddMember from '../../components/addMember/addMember'
import TextareaEditor from '../../components/editors/TextareaEditor'
import InputEditor from '../../components/editors/InputEditor'
import { MiniUser } from '../../../../types'
import { useEffect, useState } from 'react'
import UserService from '../../../../service/userService'

const DiscussionEditSection = () => {

    const [friends, setFriends] = useState<MiniUser[]>()

    const { 
        user,
        discussion,
        title,
        setTitle,
        description,
        setDescription,
        owner,
        setOwner,
        members,
        setMembers

    } = useDiscussionEditContext()

    useEffect(() => {
        if (user) {
            const fetchUserFriends = async() => {
                const response = await UserService.getUserFriends(user.id)
                const data = response.data
                setFriends(data.friends)
            }

            fetchUserFriends()
        }
    }, [])

    if (!discussion) return null

    return (
        <div className='discussion-edit--section'>
            <div className='discussion__title--editing'>
                    {discussion?.title}
                </div>
                <div className='edit-params---container'>
                    <div className="editeble-param">
                        <div className="param-title _title">
                            Название:
                        </div>
                        <InputEditor 
                            state={title} 
                            setState={setTitle} 
                            entity='discussion' 
                            id={discussion.id}
                        />
                    </div>
                    <div className="editeble-param">
                        <div className="param-title _description">
                            Описание:
                        </div>
                        <TextareaEditor 
                            state={description} 
                            setState={setDescription} 
                            placeholder='Опишите проект'
                            entity='discussion'
                            id={discussion.id}
                        />
                    </div>
                    <div className="editeble-param">
                        <div className="param-title _owner">
                            Владелец обсуждения: 
                        </div>
                        <div className='regular-box'>
                            <Link to={`../../user/${owner?.username}`} className='profile--link'>{owner?.username}</Link>
                        </div>
                    </div>
                    <div className="editeble-param" style={{marginBottom: '0px'}}>
                        <div className="param-title _members">
                            Участники обсуждения
                        </div>
                        <div className='regular-box'>
                            <div className='member-list--editeble'>
                                <div className='member-list--scroll'>
                                    {members?.map((member) => (
                                        <Member member={member} owner={owner!} key={member.id}/>
                                    )).reverse()}
                                </div>
                                <AddMember users={friends} type='friends'/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default DiscussionEditSection