import React, { useEffect, useRef, useState } from "react"
import './commentForm.scss'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; 
import { htmlToMarkdown } from "../../../utils/MarkdownUtils/htmlToMarkdown";

const Comments = ({}) => {

    const [comment, setComment] = useState('')
    const [preview, setPreview] = useState(false)

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        console.log('логика отправки коммента')
    }

    const insertCode = () => {
        const code = '```\n// Ваш код здесь\n```';
        const editor = document.querySelector('.ql-editor') as HTMLElement;
        if (editor) {
            const sanitizedCode = code.trim();
    
            const cursorPosition = editor.innerText.length;
            editor.innerText += sanitizedCode;
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(editor.childNodes[0], cursorPosition + sanitizedCode.length);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    };

    const handlePreviewToggle = () => {
        if (preview) {
            setComment(cleanComment(comment));
        }
        setPreview(!preview);
    };


    const cleanComment = (content: string) => {
        return content
            .replace(/<p>\s*<\/p>/g, '') // Удаляем пустые параграфы
            .replace(/<p><br><\/p>/g, '') // Удаляем параграфы с переносами строк
            .replace(/<br\s*\/?>/g, '') // Удаляем одиночные переносы строк
            .replace(/<\/h[1-6]>[\n\s]*<h[1-6]>/g, '</h1>') // Убираем лишние переносы между заголовками
            .replace(/<h[1-6]>\s*<\/h[1-6]>/g, ''); // Удаляем пустые заголовки
    };

    const markdownContent = htmlToMarkdown(cleanComment(comment));

    return (
        <div className="comment-form">
            <form onSubmit={handleSubmit}>
                <div className="toolbar">
                    <button type="button" onClick={insertCode}>
                        Вставить код
                    </button>
                    <button type="button" onClick={handlePreviewToggle}>
                        {preview ? 'Редактировать' : "Предосмотр"}
                    </button>
                </div>

                {preview ? (
                    <ReactMarkdown
                    unwrapDisallowed={true}
                    disallowedElements={["pre"]}
                    children={markdownContent}
                    components={{
                        code({ className, children, ...props }) {
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
                ) : (
                    <ReactQuill
                        value={comment}
                        onChange={setComment}
                        placeholder="Напишите ваш комментарий..."
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                ['code-block'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image'],
                                ['clean'],
                            ],
                        }}
                    />
                )}
                <button type="submit" className="submit-button">
                    Отправить
                </button>
            </form>
        </div>
    )
}

export default Comments