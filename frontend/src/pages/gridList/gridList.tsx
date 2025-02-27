import { useSelector } from 'react-redux'
import { useDiscussion } from '../../hooks/store/useDiscussion'
import './gridList.scss'
import { RootState } from '../../store/store'
import { useEffect, useState } from 'react'
import { Discussion } from '../../types'
import { Link } from 'react-router-dom'
import GridLayout from './components/gridLayout/gridLayout'

const GridList = () => {

    const user = useSelector((state: RootState) => state.user.user)
    const { discussionsState, fetchDiscussions } = useDiscussion()
    const [discussions, setDiscussions] = useState<Discussion[] | null>([])

    useEffect(() => {
        fetchDiscussions(user.id)
    }, [user])

    useEffect(() => {
        if (discussionsState) {
            setDiscussions(discussionsState.discussions)
        }
    }, [discussionsState])

    return (
        <div className="grid-list">
            <div className='grid-list--header'>
                Доступные сетки
            </div>
            <div className='available-grids'>
                {discussions ?
                    <div className='grids--container'>
                        {discussions.map((discussion) => (
                            <Link to={`./${discussion.id}`} key={discussion.id}>
                                <GridLayout discussion={discussion}/>
                            </Link>
                        ))}
                    </div>
                    : 
                    <div className='no-grids'>
                        <div>
                            Нет доступных сеток
                        </div>
                        <Link to={'/discussions/create'} className='grid-advice'>
                            Создайте свой проект
                        </Link>
                    </div> 
                }
            </div>
        </div>
    )
}

export default GridList