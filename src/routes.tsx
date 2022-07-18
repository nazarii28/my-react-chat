import {CHAT_ROUTE, LOGIN_ROUTE, ROOMS_ROUTE} from "./utils/consts";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Rooms from "./pages/Rooms";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Login/>
    }
]

export const privateRoutes = [
    {
        path: ROOMS_ROUTE,
        component: <Rooms/>
    },
    {
        path: CHAT_ROUTE,
        component: <Chat/>
    }
]