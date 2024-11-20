import {INDEX_ROUTE} from './utils/consts'

import Index from './pages/discussion.tsx'
import { Component } from 'react'

export const PublicRoutes = [
    {
        path: INDEX_ROUTE,
        Component: Index
    }
]