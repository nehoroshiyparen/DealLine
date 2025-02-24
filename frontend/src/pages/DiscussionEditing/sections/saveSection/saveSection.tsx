import { Link, useNavigate } from 'react-router-dom'
import DiscussionService from '../../../../service/discussionService'
import { useDiscussionEditContext } from '../../context+provider/discussionEditContext'
import generatePatch from '../../../../utils/discussionUtils/generatePatch'
import './saveSection.scss'

const SaveSection = () => {

    const {
        discussion,
        updatedDiscussion
    } = useDiscussionEditContext()

    const navigate = useNavigate()

    const deleteDiscussion = async() => {
        try {
            const response = await DiscussionService.deleteDiscussion(discussion!.id)
            console.log(response)
            navigate('/discussions')
        } catch (e) {
            console.log('При удалении обсуждения на стороне сервера произошла ошибка ', e)
        }
    }

    if (!discussion || !updatedDiscussion) return

    const saveChanges = async() => {
        try {
            const patch = generatePatch(discussion, updatedDiscussion)
            const response = await DiscussionService.saveChanges(discussion.id, patch)
            console.log(response.data)
        } catch (e) {
            console.log('Ошибка при попытке сохранить изменения', e)
        }
    }

    return (
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