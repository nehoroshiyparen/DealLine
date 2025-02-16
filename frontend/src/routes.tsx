import path from 'path'
import Discussion from './pages/discussions/discussions.tsx'
import { Friends } from './pages/friends/friends.tsx'
import LogIn from './pages/registration/login.tsx'
import Registration from './pages/registration/registration.tsx'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, DISCUSSION_ROUTE, FRIENDS_ROUTE, NET_ROUTE, USER_PROFILE_ROUTE } from './utils/consts'
import Grid from './pages/grid/grid.tsx'
import UserProfile from './pages/profile/userProfile.tsx'

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
    },
    {
        path: NET_ROUTE,
        Component: Grid,
        layout: 'main'
    },
    {
        path: USER_PROFILE_ROUTE + '/:username',
        Component: UserProfile,
        layout: 'main'
    }
]