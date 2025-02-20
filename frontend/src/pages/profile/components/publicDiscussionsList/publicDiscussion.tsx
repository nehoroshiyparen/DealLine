import './publicDiscussionsList.scss'

interface PublicDiscusionProps {
    title: string;
    description: string;
}

const PublicDiscussion = ({title, description}: PublicDiscusionProps) => {
    return (
        <div className="public-discussion">
            <div className="public-discussion--header">
                <div className="pub-disc--header-wrapper">
                    <div
                        style={{
                            backgroundImage: `url('/images/project--_white.png')`,
                            backgroundSize: 'cover',
                        }} 
                        className="discussion_picture"
                    />
                    <div className="public-discussion_title">
                        {title}
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: `url('/images/dots.png')`,
                        backgroundSize: 'cover',
                    }} 
                    className="public-discussion_functions"/>
            </div>
            <div className='public-discussion--inforamtion'>
                <div className='public-discussion_description'>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default PublicDiscussion