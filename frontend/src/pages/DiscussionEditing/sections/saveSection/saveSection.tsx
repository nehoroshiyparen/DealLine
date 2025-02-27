import { Link } from 'react-router-dom'
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext'
import './saveSection.scss'

const SaveSection = () => {

    const {
        isNewDiscussion,
        createNewDiscussion,
        saveChanges,
        deleteDiscussion
    } = useDiscussionEditContext()

    return (
        isNewDiscussion ?
        <div className="save-section">
                <div className="save-section-button save-func" onClick={createNewDiscussion}>
                    Создать обсуждение
                </div>
                <Link 
                    to={'/discussions'} 
                    className="save-section-button delete-func" 
                    
                >
                    Отменить создание
                </Link>
            </div>
        : 
            <div className="save-section">
                <div className="save-section-button save-func" onClick={saveChanges}>
                    Сохранить изменения
                </div>
                <Link 
                    to={'/discussions'} 
                    className="save-section-button delete-func" 
                    onClick={deleteDiscussion}
                >
                    Удалить
                </Link>
            </div>

    )
}

export default SaveSection