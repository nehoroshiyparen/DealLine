import { Link } from "react-router-dom";
import { MiniUser } from "../../../types"

interface MiniProfileProps {
    user: MiniUser;
}


const MiniProfile = ({user}: MiniProfileProps) => {
    return (
        <Link to={'./'}>
            <div className="mini-profile--user">
                <div className="mini-profile--avatar">
                    <div
                        style={{
                            width: '45px',
                            backgroundImage: `url(${user.avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(user.avatar)}` : '/images/profile.png'})`,
                            backgroundSize: 'cover',
                        }}
                        className="member-avatar"/>
                </div>
                <div className="mini-profile--contacts">
                    <div className="m-p-contacts--username">
                        {user.username}
                    </div>
                    <div className="m-p-contacts--email">
                        {user.email}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MiniProfile