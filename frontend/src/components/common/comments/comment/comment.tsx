import { Comment } from '../../../../types'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './comment.scss'
import '../commentForm/reactMarkdown.scss'

interface props {
    comment: Comment
}

const CommentComponent = ({comment}: props) => {

    const author = comment.author
    const date = (new Date(comment.createdAt)).toLocaleString()

    return (
        <div className="comment">
            <div className="user_info--comment">
                <div className='author-avatar' style={{
                    backgroundImage: `url(${author.avatar ? `http://localhost:5665/api/upload/${encodeURIComponent(author.avatar)}` : '/images/profile.png'})`,
                    backgroundSize: '100%'
                }}/>
                <div className='author-info--2'>
                    <div className='author-username'>
                        {author.username}
                    </div> 
                    <div className='comment-createdAt'>
                        {date}
                    </div>
                </div>
            </div>
            <div className='markdown-container' style={{marginTop: '10px'}}>
                <ReactMarkdown
                    unwrapDisallowed={true}
                    children={comment.content}
                    components={{
                        code({ className, children }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : 'plaintext';
                            return (
                                <SyntaxHighlighter style={okaidia} language={language}>
                                  {String(children).trim()}
                                </SyntaxHighlighter>
                              );
                        }
                    }}
                />
            </div>
        </div>
    )
}


export default CommentComponent