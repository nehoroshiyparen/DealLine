import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicRoutes } from '../routes.tsx'

export default function AppRouter() {
    return(
        <Routes>
            {
                PublicRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))
            }
        </Routes>
    )
}