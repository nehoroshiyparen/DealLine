import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser, loginUser, logout } from '../../store/userSlice'
import '../../index.css'
import './style.scss'
import { AppDispatch } from '../../store/store'

export default function Registration() {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [conf_password, setConf_password] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    const handleRegister = () => {
        dispatch(registerUser({ username , email, password }))
        console.log(username, email, password)
    }

    return (
        <div className="container">
             <div className="container-display-block align-items-center">
                <div className='log-in-block'>
                <>
                    <div className="logblock-title">
                        Регистрация
                    </div>
                    <div className='registration-form'>
                        <input className='email input' 
                        onChange={e => setEmail(e.target.value)}
                        placeholder={'Введите почту'}
                        type='email'
                        value={email} 
                        style={{marginBottom: '15px'}}>

                        </input>
                        <input className='username input' 
                        onChange={e => setUsername(e.target.value)}
                        placeholder={'Введите юзернейм'} 
                        type='username'
                        value={username}
                        style={{marginBottom: '15px'}}>

                        </input>     
                        <input className='first-password input' 
                        onChange={e => setPassword(e.target.value)}
                        placeholder={'Пароль'}
                        type='password'
                        value={password} 
                        style={{marginBottom: '15px'}}>

                        </input>
                        <input className='second-password input'
                        onChange={e => setConf_password(e.target.value)}
                        placeholder={'Повторите пароль'}
                        type='password'
                        value={conf_password}>

                        </input>
                        <div className='confirm-log-button' onClick={handleRegister}>
                            Зарегистрироваться
                        </div>
                    </div>
                    <div className='change-way-help'>
                        Уже есть аккаунт? <Link to='/login' style={{cursor: 'pointer', fontWeight: 'bold'}}>Войти</Link>
                    </div>
                </>
                </div>
            </div>
        </div>
    )
}