import React, { Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from '../routes.tsx'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'

export default function AppRouter() {

    const isAuthentcated = useSelector((state: RootState) => state.user.isAuthentcated)
    console.log(isAuthentcated)
    
    return(
        <Routes>
            {isAuthentcated && (
                <>
                    <Route path="/login" element={<Navigate to="/discussions" replace />} />
                    <Route path="/registration" element={<Navigate to="/discussions" replace />} />
                </>
            )}
            {
                isAuthentcated && PrivateRoutes.map(({path, Component}) => (
                    isAuthentcated ? (
                        <Route key={path} path={path} element={<Component/>}/>
                    ) : (
                        <Route key={path} path={path} element={<Navigate to="/login" replace />} />
                    )
                ))
            }
            {!isAuthentcated && (
                PrivateRoutes.map(({ path }) => (
                    <Route key={path} path={path} element={<Navigate to="/login" replace />} />
                ))
            )}
            {!isAuthentcated && (
                PublicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component/>} />
                ))
            )}
        </Routes>
    )
}