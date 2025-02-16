interface AvatarProps {
    avatar: string;
    index: number
}

export const MemberAvatar = ({avatar, index}: AvatarProps) => {
    return (
        <div
            style={{
                zIndex: index,
                left: `${index*30}px`,
                backgroundImage: `url(${avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(avatar)}` : '/images/profile.png'})`,
                backgroundSize: 'cover',
                position: 'absolute'
            }}
            className="member-avatar"/>
    )
}