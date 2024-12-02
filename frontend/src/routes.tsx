import LogIn from './pages/registration/login.tsx'
import {INDEX_ROUTE, REGISTER_ROUTE} from './utils/consts'


import { Component } from 'react'

export const PublicRoutes = [
    {
        path: INDEX_ROUTE,
    },
    {
        path: REGISTER_ROUTE,
        Component: LogIn
    }
]