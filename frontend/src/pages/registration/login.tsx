import { useState, useEffect } from 'react'
import '../../index.css'
import './login.scss'

export default function LogIn() {
    const [have_account, setHave_account] = useState(true)

    const log_in = async() => {
        const usernameOrEmail = document.querySelector('.user-email-input')?.textContent
        const password = document.querySelector('.password')?.textContent

        console.log(usernameOrEmail, password)
    }

    const registration = async() => {
        const email = document.querySelector('.email')?.textContent
        const username = document.querySelector('.username')?.textContent
        const password = document.querySelector('.second-password')?.textContent

        console.log(email, username, password)
    }

    return (
        <>
            <div className="container">
                <div className="container-display-block align-items-center">
                    <div className='log-in-block'>
                        {have_account ? 
                        <>
                            <div className="logblock-title">
                                Вход в аккаунт
                            </div>
                            <div className='log-in-form'>
                                <input className='user-email-input input' placeholder={'Почта или юзернейм'} style={{marginBottom: '15px'}}>

                                </input>
                                <div className='password-help'>
                                    <a href="">Забыли пароль?</a>
                                </div>
                                <input className='password input' placeholder={'Пароль'}>

                                </input>
                                <div className='confirm-log-button' onClick={log_in}>
                                    Войти
                                </div>
                                <div className='Incase-test'>
                                    Продолжая, я соглашаюсь с <b style={{cursor: 'pointer'}}>Политикой конфиденциальности</b>
                                </div>
                            </div> 
                            <div className='change-way-help'>
                                Нет аккаунта? <b style={{cursor: 'pointer'}} onClick={() => setHave_account(false)}>Зарегистрироваться</b>
                            </div>
                        </>
                            : 
                        <>
                            <div className="logblock-title">
                                Регистрация
                            </div>
                            <div className='registration-form'>
                                <input className='email input' placeholder={'Введите почту'} style={{marginBottom: '15px'}}>

                                </input>
                                <input className='username input' placeholder={'Введите юзернейм'} style={{marginBottom: '15px'}}>

                                </input>
                                <input className='first-password input' placeholder={'Пароль'} style={{marginBottom: '15px'}}>

                                </input>
                                <input className='second-password input' placeholder={'Повторите пароль'}>

                                </input>
                                <div className='confirm-log-button' onClick={registration}>
                                    Зарегистрироваться
                                </div>
                            </div>
                            <div className='change-way-help'>
                                Уже есть аккаунт? <b style={{cursor: 'pointer'}} onClick={() => setHave_account(true)}>Войти</b>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}