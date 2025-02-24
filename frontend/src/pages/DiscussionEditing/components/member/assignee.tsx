import { Link } from "react-router-dom";
import { MiniUser } from "../../../../types";
import './member.scss'

interface AssigneeProps {
    member: MiniUser;
}

const Assignee = ({member}: AssigneeProps) => {
    return (
        <div className="mini-profile--member">
            <div className="mini-profile--avatar">
                <div
                    style={{
                        width: '45px',
                        backgroundImage: `url(${member.avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(member.avatar)}` : '/images/profile.png'})`,
                        backgroundSize: 'cover',
                    }}
                    className="member-avatar"/>
            </div>
            <div className="mini-profile--contacts">
                <Link 
                    to={`../../user/${member.username}`} 
                    className="profile--link"
                >
                    {member.username}
                </Link>
                <div className="m-p-contacts--email">
                    {member.email}
                </div>
            </div>
            <div className="delete-member">
                
            </div>
            <div className="edit-member--element">
                <div className="edit-member">

                </div>
            </div>
        </div>
    )
}

export default Assignee