import { Link } from "react-router-dom"
import { Discussion } from "../../../../types"
import { MemberAvatar } from "../../../../components/common/memberList/MemberAvatar"
import MemberList from "../../../../components/common/memberList/MemberList"
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
                    <Link to={'./'}>
                        <div className='disc-owner--info'>
                            <MemberAvatar avatar={discussion.owner.avatar} index={0}/>
                            <span style={{ fontSize: '22px', fontWeight: '600', color: '#6598ff', marginLeft: '10px' }}>
                                {discussion.owner.username}
                            </span>
                        </div>
                    </Link>
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