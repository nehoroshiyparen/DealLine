import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'
import './style.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { loginUser } from '../../store/userSlice'

export default function LogIn() {
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = () => {
        dispatch(loginUser({user: usernameOrEmail, password}))
    }

    return (
        <>
            <div className="container">
                <div className="container-display-block align-items-center">
                    <div className='log-in-block'>
                        <>
                            <div className="logblock-title">
                                Вход в аккаунт
                            </div>
                            <div className='log-in-form'>
                                <input className='user-email-input input' 
                                onChange={e => setUsernameOrEmail(e.target.value)}
                                placeholder={'Почта или юзернейм'} 
                                type='usernameOrEmail'
                                value={usernameOrEmail}
                                style={{marginBottom: '15px'}}>

                                </input>
                                <div className='password-help'>
                                    <a href="">Забыли пароль?</a>
                                </div>
                                <input className='password input'
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                                placeholder={'Пароль'}
                                value={password}>

                                </input>
                                <div className='confirm-log-button' onClick={handleLogin}>
                                    Войти
                                </div>
                                <div className='Incase-test'>
                                    Продолжая, я соглашаюсь с <b style={{cursor: 'pointer'}}>Политикой конфиденциальности</b>
                                </div>
                            </div> 
                            <div className='change-way-help'>
                                Нет аккаунта? <Link to='/registration' style={{cursor: 'pointer', fontWeight: 'bold'}} >Зарегистрироваться</Link>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}