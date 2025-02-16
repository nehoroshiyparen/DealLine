import { MiniUser } from "../../../types"
import './MemberList.scss'
import { MemberAvatar } from "./MemberAvatar"
import MiniProfile from "./MiniProfile"

interface ListProps {
    members: MiniUser[]
}

const MemberList = ({members}: ListProps) => {
    return (
        <div className="Member-list--component" style={{width: `${members.length * 35}px`}}>
             <div className="member-list">
                {members.map((member, index) => (
                    <MemberAvatar avatar={member.avatar} index={index} key={member.id}/>
                ))}
            </div>
            <div className="member-list--advanced" style={{left: `${members.length <= 5 ? members.length *30.5 : 5 * 30.5}px`}}>
                <div className="mini-profile--list">
                    {members.map((member) => (
                        <MiniProfile user={member} key={member.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MemberList