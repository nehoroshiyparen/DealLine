import { MiniUser } from "../../../../types"
import '../discussion.scss'

interface ListProps {
    members: MiniUser[]
}

interface AvatarProps {
    avatar: string;
    index: number
}

const MemberAvatar = ({avatar, index}: AvatarProps) => {
    return (
        <div
            style={{
                zIndex: index,
                left: `${index*-20}px`,
                backgroundImage: `url(${avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(avatar)}` : '/images/profile.png'})`,
                backgroundSize: 'cover'
            }}
            className="member-avatar"/>
    )
}

const MemberList = ({members}: ListProps) => {
    return (
        <div className="member-list">
            {members.map((member, index) => (
                <MemberAvatar avatar={member.avatar} index={index} key={member.id}/>
            ))}
        </div>
    )
}



export default MemberList