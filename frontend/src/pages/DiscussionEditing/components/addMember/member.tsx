import { MiniUser } from "../../../../types"

interface AvailableUserProps {
    user: MiniUser;
    func: (user: MiniUser) => void;
}

const AvailableUser = ({user, func}: AvailableUserProps) => {
    return (
        <div 
            className="available-user" 
            onClick={() => {
                console.log(`Нажатие на ${user.username}`);
                func(user);
            }}
        >
            {user.username}
        </div>
    )
}

export default AvailableUser