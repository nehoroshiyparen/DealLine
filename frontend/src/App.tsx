import { BrowserRouter, Navigate } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { Provider } from 'react-redux'
import store from './store/store'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/userSlice'
import { AppDispatch, RootState } from './store/store'
import { useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector((state: RootState) => state.user)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Пытаемся получить данные о пользователе, если есть токен
    if (localStorage.getItem('token') && !user.isAuthentcated) {
      dispatch(checkAuth()).finally(() => {
        // После выполнения запроса к API, данные о пользователе будут загружены
        setIsLoading(false)
      })
    } else {
      // Если данных о пользователе нет, тоже завершаем загрузку
      setIsLoading(false)
    }
  }, [user.isAuthentcated, dispatch])

  // Если данные пользователя ещё загружаются, показываем загрузку
  if (isLoading) {
    return <div>Загрузка...</div>
  }

  // Если пользователь не авторизован, перенаправляем на страницу логина
  if (!user.isAuthentcated) {
    return <Navigate to="/login" replace />
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </BrowserRouter>
  )
}

export default App
