import React from "react";
import './side-menu.scss'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import { AppDispatch } from "../../../store/store";

export default function Side_Menu() {

    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="side-menu">
            <div className="top-part">
                <div className="logo-place">
                    <div className="logo">
                        <Link to={'/discussions'}>
                            <image className="logo-image"/> <span className="logo-name">DealLine</span>
                        </Link>
                    </div>
                </div>
                <div className="main-menu">
                    <div className="main-menu-header">
                        Главное меню
                    </div>
                    <div className="functions">
                        <Link to={'/discussions'}>
                            <div className="main-menu-function">
                                <image className="function-image"/>
                                Список обсуждений
                            </div>
                        </Link>
                        <Link to={'/net'}>
                            <div className="main-menu-function" style={{marginTop: '25px'}}>
                                <image className="function-image"/>
                                Сетки обсуждений
                            </div>
                        </Link>
                        <Link to={'/friends'}>
                            <div className="main-menu-function">
                                <image className="function-image"/>
                                Поиск людей
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bottom-part">
                <div className="support">
                    <div className="support-header">
                        Поддержка
                    </div>
                    <div className="functions">
                        <Link to={'/discussions'}>
                            <div className="main-menu-function">
                                <image className="function-image"/>
                                Настройки
                            </div>
                        </Link>
                        <Link to={'/discussions'}>
                            <div className="main-menu-function">
                                <image className="function-image"/>
                                FAQ
                            </div>
                        </Link>
                        <Link to={'/discussions'}>
                            <div className="main-menu-function" onClick={handleLogout}>
                                <image className="function-image"/>
                                Выход
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}