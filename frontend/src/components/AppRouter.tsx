import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { checkAuth } from '../store/userSlice' // Подставь правильный импорт
import MainLayout from './layouts/main-layout.tsx'
import EmptyLayout from './layouts/empty-layout.tsx'
import { PrivateRoutes, PublicRoutes } from '../routes.tsx'

export default function AppRouter() {
    const dispatch = useDispatch<AppDispatch>()
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthentcated)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('token') && !isAuthenticated) {
            dispatch(checkAuth()).finally(() => {
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [dispatch, isAuthenticated])

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <Routes>
            {isAuthenticated && (
                <>
                    <Route path="/login" element={<Navigate to="/discussions" replace />} />
                    <Route path="/registration" element={<Navigate to="/discussions" replace />} />
                </>
            )}
            {isAuthenticated &&
                PrivateRoutes.map(({ path, Component, layout }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            layout === 'main' ? (
                                <MainLayout>
                                    <Component />
                                </MainLayout>
                            ) : (
                                <EmptyLayout>
                                    <Component />
                                </EmptyLayout>
                            )
                        }
                    />
                ))}
            {!isAuthenticated &&
                PrivateRoutes.map(({ path }) => (
                    <Route key={path} path={path} element={<Navigate to="/login" replace />} />
                ))}
            {!isAuthenticated &&
                PublicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
        </Routes>
    )
}