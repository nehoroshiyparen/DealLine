import { Discussion } from "../../../../../types"
import { useDiscussionContext } from "../../context+provider/discussionContext"
import MemberList from "../MemberList"
import './mainInfo.scss'

interface props {
    discussion: Discussion
}

const MainInfo = ({discussion}: props) => {

    return (
        <div>
            <div className='disc-users'>
                <div className='disc-owner'>
                    <span>Создатель обсуждения</span>
                    <div className='disc-owner--info'>
                        <img 
                            src={discussion.owner?.avatar 
                                ? `http://localhost:5665/api/upload/${encodeURIComponent(discussion.owner.avatar)}`
                                : '/images/profile.png'} 
                            width={'100%'}
                            className='owner-avatar'
                        />
                        <span style={{ fontSize: '22px', fontWeight: '600', color: '#bcbfff' }}>
                            {discussion.owner.username}
                        </span>
                    </div>
                </div>
                <div className='disc-members'>
                    <span>Участники обсуждения</span>
                    <MemberList members={discussion.members}/>
                </div>
            </div>
            <div className='disc-creation_date'>
                Дата создания: <span style={{ fontWeight: 'bold' }}>
                    {discussion.creation_date ? discussion.creation_date : '20.10.2025'}
                </span>
            </div> 
            <div className='disc-description'>
                <span>Описание</span>
                <div className='disc-description--info'>
                    {discussion.description ? discussion.description : 'Описания нет'}
                </div>
            </div>
        </div>
    )
}

export default MainInfo