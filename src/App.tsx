import React, {useContext, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {HashRouter as BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRoutes';
import {Box} from "@mui/material";
import Loader from "./components/Loader/Loader";
import AlertState from "./context/alert/AlertState";
import RoomsState from "./context/rooms/RoomsState";
import AppState from "./context/app/AppState";
import {AuthContext, IAuthContext} from "./context/auth/AuthState";
import ChatState from "./context/chat/ChatState";

const loaderWrapperStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

function App() {
    const {auth} = useContext(AuthContext) as IAuthContext;
    const [user, loading] = useAuthState(auth);

    if (loading) return (
        <Box
            sx={loaderWrapperStyles}
        >
            <Loader/>
        </Box>
    )

    return (
        <>
            <BrowserRouter>
                <AppState>
                    <AlertState>
                        <RoomsState>
                            <ChatState>
                                <AppRouter/>
                            </ChatState>
                        </RoomsState>
                    </AlertState>
                </AppState>
            </BrowserRouter>
        </>
    );
}

export default App;
