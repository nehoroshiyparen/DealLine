import { useEffect, useRef, useState } from 'react'
import './addMember.scss'

const AddMember = () => {

    const [isListOpen, setIsListOpen] = useState<boolean>(false)
    const listRef = useRef<HTMLDivElement | null>(null)

    const openList = () => {
        setIsListOpen((prev) => !prev)
    }

    useEffect(() => {
        const list = listRef.current

        if (!list) return

        if (isListOpen) {
            list.style.height = '300px'
        } else {
            list.style.height = '0px'
        }
    }, [isListOpen])

    return (
        <div className="add-member">
            <div className='example' onClick={openList}>
                <div className="mini-profile--avatar">
                    <div
                        style={{
                            width: '45px',
                            backgroundImage: `url('/images/profile.png')`,
                            backgroundSize: 'cover',
                        }}
                        className="member-avatar"/>
                </div>
                <div className='text-_send_invitation_'>
                    Пригласите нового участника
                </div>
                <div className={`invitation-list--open`} style={{rotate: `${isListOpen ? '-90deg' : '0deg'}`}}>

                </div>
            </div>
            <div className={`invitation-list`} ref={listRef}>
                <div className='invitation-list--inside'>
                    <input 
                        className='search-person--input'
                        placeholder='Найти человека'
                        />
                </div>
            </div>
        </div>
    )
}

export default AddMember