
interface DefaultAvatarProps {
    avatar: string;
}

const DefaultAvatar = ({avatar}: DefaultAvatarProps) => {
    return (
        <div
            style={{
                backgroundImage: `url(${avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(avatar)}` : '/images/profile.png'})`,
                backgroundSize: 'cover',
                width: 'auto',
            }}
            className="default-avatar"/>
    )
}

export default DefaultAvatar