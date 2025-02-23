import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AdvancedUser } from "../../types"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import UserService from "../../service/userService"

const useProfileState = () => {

    const { username } = useParams()
    const [owner, setOwner] = useState<AdvancedUser | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const user = useSelector((state: RootState) => state.user.user)

    const fetchUser = async() => {
        try {
            const response = await UserService.fetchOneUser(username!)
            if (response.data) {
                setOwner(response.data.user)
            }
        } catch (e) {
            console.log('Пользователя с таким useraname не найдено')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (username) {
            fetchUser()
        }
    }, [username])

    const addFriend = async(message: string = '') => {
        try {
            if (user && owner) {
                const response = await UserService.addFriend(user.id, owner.id, message)   
                return response.data.message
            }
        } catch (e) {
            console.log('Произошла ошибка , епть: ', e)
        }
    }

    const deleteFriend = async() => {
        try {
            if (user && owner) {
                const response = await UserService.deleteFriend(user.id, owner.id)
                return response.data.message
            }
        } catch (e) {
            console.log('Ошибка при удалении из друзей', e)
        }
    }

    return {
        username,
        owner, setOwner,
        isLoading, setIsLoading,
        user,

        addFriend,
        deleteFriend,
    }
}

export default useProfileState