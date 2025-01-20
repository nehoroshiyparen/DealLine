import { useCallback, useEffect, useRef, useState } from "react"
import UserService from "../../service/userService"
import { MiniUser } from "../../types"

export function Friends() {

    const [users, setUsers] = useState<MiniUser[]>([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [errorMessage, setErrorMessage] = useState('Введите имя пользователя')
    const observer = useRef<IntersectionObserver | null>(null)

    let timer: NodeJS.Timeout

    function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
        return (...args: Parameters<T>) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }

    const fetchUsers = async(query: string, page: number) => {
        setLoading(true)
        try {
            const response = await UserService.fetchUsers(query, page)
            const data = response.data
            if (data.users.length > 0) {
                setUsers((prev) => (page === 1 ? data.users : [...prev, ...data.users]))
                setErrorMessage('')
            } else {
                setHasMore(false)
                if (page === 1) {
                    setErrorMessage('Пользователей с таким именем не существует')
                }
            }
        } catch  (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const debouncedFetchUsers = useCallback(
        debounce((query: string) => {
            setPage(1)
            setUsers([])
            setHasMore(true)
            if (query !== '') {
                fetchUsers(query, 1)
                setErrorMessage('')
            }
            setErrorMessage('Введите имя пользователя')
        }, 500),
        []
    )

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setQuery(value)
        if (value === '') {
            setUsers([])
            setErrorMessage('Введите имя пользователя')
        } 
        debouncedFetchUsers(value)
    }

    const lastUserRef = (node: HTMLDivElement) => {
        if (loading) {
            return
        }
        if (observer.current) {
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1)
            }
        })

        if (node) observer.current.observe(node)
    }

    useEffect(() => {
        if (page > 1) fetchUsers(query, page)
    }, [page])

    return (
        <>
            <input className=""
            placeholder="Поиск друзей"
            value={query}
            onChange={handleSearch}/>

            {errorMessage && <p>{errorMessage}</p>}

            {users.map((user, index) => (
                <div key={user.id} ref={index === users.length - 1 ? lastUserRef : null} >
                    {user.username}
                </div>
            ))}
        </>
    )
}