import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import {AlertContext, IAlertContext} from "../context/alert/AlertState";
import Alert from '@mui/material/Alert';

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

const LayoutContentStyles = {
    px: 1,
    flexGrow: 1,
    position: 'relative'
}

const Layout = ({children, backLink, name}: LayoutProps) => {
    const {alert} = useContext(AlertContext) as IAlertContext;

    return (
        <Box
            sx={LayoutStyles}
        >
            {Boolean(alert) && <Alert
                sx={AlertStyles}
                severity={alert?.severity}>{alert?.text}</Alert>}
            <NavBar backLink={backLink} name={name}/>
            <Box
                sx={LayoutContentStyles}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;