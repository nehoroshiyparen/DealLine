import Discussion from './pages/discussions/discussions.tsx'
import { Friends } from './pages/friends/friends.tsx'
import LogIn from './pages/registration/login.tsx'
import Registration from './pages/registration/registration.tsx'
import { INDEX_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, DISCUSSION_ROUTE, FRIENDS_ROUTE } from './utils/consts'

export const PublicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LogIn
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    }
]

export const PrivateRoutes = [
    {
        path: DISCUSSION_ROUTE,
        Component: Discussion,
        layout: 'main',
    },
    {
        path: FRIENDS_ROUTE,
        Component: Friends,
        layout: 'main'
    }
]