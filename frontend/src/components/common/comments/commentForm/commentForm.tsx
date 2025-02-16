import React, { useState } from "react";
import './commentForm.scss';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; 
import './reactQuill.scss';
import { htmlToMarkdown } from "../../../../utils/MarkdownUtils/htmlToMarkdown";
import './reactMarkdown.scss';
import { TaskService } from "../../../../service/ taskService";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface props {
    taskId: number
}

const CommentsForm = ({taskId}: props) => {
  const [comment, setComment] = useState('');
  const [preview, setPreview] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const userId = user.user.id

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    const content = htmlToMarkdown(cleanComment(comment))
    if (!content) {
      console.log('Пошел нахуй нельзя отправить пустой комментарий')
    } else {
      await TaskService.sendComment(userId, taskId, content)
    }
  };

  const insertCode = () => {
    const code = '``` Ваш код здесь```';
    setComment((prev) => prev.trim() + code);
  };

  const handlePreviewToggle = () => {
    if (preview) {
      setComment(cleanComment(comment));
    }
    setPreview(!preview);
  };

    const cleanComment = (content: string) => {
        return content
        .replace(/<p>\s*<\/p>/g, '')
        .replace(/<p><br><\/p>/g, '')
        .replace(/<br\s*\/?>/g, '')
        .replace(/<\/h[1-6]>[\n\s]*<h[1-6]>/g, '</h1>')
    };

  const markdown = htmlToMarkdown(cleanComment(comment))

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
        <div className="writing-space">
          {preview ? (
            <div className="markdown-container">
              {markdown ? (
                <ReactMarkdown
                  unwrapDisallowed={true}
                  disallowedElements={["pre"]}
                  children={markdown}
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
              ) : (
                <p className="markdown-placeholder">Пусто</p>
              )}
            </div>
          ) : (
            <ReactQuill
              value={comment}
              onChange={setComment}
              placeholder="Напишите ваш комментарий..."
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          )}
        </div>
        <button type="submit" className="submit-button">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default CommentsForm;