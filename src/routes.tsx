import {CHAT_ROUTE, LOGIN_ROUTE, ROOMS_ROUTE} from "./utils/consts";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import BlankPage from "./components/BlankPage";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Login/>
    }
]

export const privateRoutes = [
    {
        path: ROOMS_ROUTE,
        component: <BlankPage/>
    },
    {
        path: CHAT_ROUTE,
        component: <Chat/>
    }
]