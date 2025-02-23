import { Link } from 'react-router-dom'
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext'
import './discussionEditSection.scss'
import Member from '../../components/member/member'
import AddMember from '../../components/addMember/addMember'

const DiscussionEditSection = () => {

    const { 
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
                        <input 
                            className='edit-box title'
                            style={{}}
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            >

                        </input>
                    </div>
                    <div className="editeble-param">
                        <div className="param-title _description">
                            Описание:
                        </div>
                        <textarea 
                            className='edit-box title'
                            style={{height: '180px'}}
                            placeholder='Опишите свой проект'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description || ''}
                            >

                        </textarea>
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
                                {members?.map((member) => (
                                    <Member member={member} owner={owner!} key={member.id}/>
                                )).reverse()}
                                <AddMember/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default DiscussionEditSection