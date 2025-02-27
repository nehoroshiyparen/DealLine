import { useCallback, useEffect, useRef, useState } from "react"
import UserService from "../../service/userService"
import { MiniUser } from "../../types"
import User from "./components/user/user"
import './friends.scss'
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

export function Friends() {
    const user = useSelector((state: RootState) => state.user.user)

    const [users, setUsers] = useState<MiniUser[]>([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [errorMessage, setErrorMessage] = useState('Введите имя пользователя')
    const [friends, setFriends] = useState<MiniUser[]>([])

    const observer = useRef<IntersectionObserver | null>(null)

    const fetchFriends = async () => {
        try {
            const response = await UserService.getUserFriends(user.id)
            setFriends(response.data.friends)
        } catch (error) {
            console.error("Ошибка загрузки друзей:", error)
        }
    }

    const fetchUsers = async (query: string, page: number) => {
        setLoading(true)
        try {
            const response = await UserService.fetchUsers(query, page)
            const data = response.data

            setUsers(prev => (page === 1 ? data.users : [...prev, ...data.users]))
            setHasMore(data.users.length > 0) // Если нет новых пользователей, останавливаем подгрузку
            setErrorMessage(data.users.length === 0 && page === 1 ? 'Пользователей с таким именем не существует' : '')

        } catch (error) {
            console.error("Ошибка загрузки пользователей:", error)
        } finally {
            setLoading(false)
        }
    }

    const debouncedFetchUsers = useCallback(() => {
        let timer: NodeJS.Timeout
        return (query: string) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                setPage(1)
                setUsers([])
                setHasMore(true)
                if (query !== '') {
                    fetchUsers(query, 1)
                } else {
                    setErrorMessage('Введите имя пользователя')
                }
            }, 500)
        }
    }, [])()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setQuery(value)
        if (value === '') {
            setUsers([])
            setErrorMessage('Введите имя пользователя')
        } 
        debouncedFetchUsers(value)
    }

    const lastUserRef = useCallback((node: HTMLDivElement) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1)
            }
        })

        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        fetchFriends()
    }, [user])

    useEffect(() => {
        if (page > 1) fetchUsers(query, page)
    }, [page])

    return (
        <div className="friends-container">
            <input 
                className="friend--searcher"
                placeholder="Поиск друзей"
                value={query}
                onChange={handleSearch}
            />

            {errorMessage && <p className="friend-search-error">{errorMessage}</p>}

            <div className="friends-search">
                {users.map((user, index) => (
                    <div key={user.id} ref={index === users.length - 1 ? lastUserRef : null} >
                        <User user={user} friends={friends}/>
                    </div>
                ))}
            </div>

            {loading && <p>Загрузка...</p>}
        </div>
    )
}