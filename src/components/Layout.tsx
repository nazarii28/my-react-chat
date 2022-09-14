import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import {AlertContext, IAlertContext} from "../context/alert/AlertState";
import Alert from '@mui/material/Alert';
import Rooms from './Rooms';
import {AppContext, IAppContext} from "../context/app/AppState";

interface LayoutProps {
    children: React.ReactNode,
    backLink?: string,
    name?: string
}

const AlertStyles = {
    position: 'fixed',
    top: '12px',
    left: '0',
    width: '100%',
    zIndex: 9999,
}

const LayoutStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}

const LayoutWrapperStyles = {
    px: 1,
    flexGrow: 1,
    position: 'relative',
    width: '100%',
    display: 'flex',
    padding: 0
}

const LayoutContentStyles = {
    flexGrow: 1,
    overflowY: 'auto',
    height: '100vh',
    position: 'relative'
}

const LayoutSidebarStyles = (open: boolean) => ({
    width: '100%',
    maxWidth: open ? '300px' : '70px',
    padding: open ? '15px' : 0
})

const Layout = ({children, backLink, name}: LayoutProps) => {
    const {alert} = useContext(AlertContext) as IAlertContext;
    const {isSidebarOpen} = useContext(AppContext) as IAppContext;

    return (
        <Box
            sx={LayoutStyles}
        >
            {Boolean(alert) && <Alert
                sx={AlertStyles}
                severity={alert?.severity}>{alert?.text}</Alert>}
            <NavBar backLink={backLink} name={name}/>
            <Box
                sx={LayoutWrapperStyles}
            >
                <Box
                    sx={LayoutSidebarStyles(isSidebarOpen)}
                >
                    <Rooms/>
                </Box>
                <Box
                    sx={LayoutContentStyles}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;