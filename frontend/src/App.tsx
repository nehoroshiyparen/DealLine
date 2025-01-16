import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { Provider } from 'react-redux'
import store from './store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/userSlice'
import { AppDispatch, RootState } from './store/store'
import { useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])

  const user = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    console.log('Данные пользователя обновились:', user);
  }, [user]);

  if (user.loading) {
    return (
      <div>
        Загрузка :3
      </div>
    )
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
