import React, {createContext, useState} from 'react';
import {AlertColor} from "@mui/material";

interface IAlertStateProps {
    children: React.ReactNode
}

type AddAlertType = (text: string, severity?: AlertColor) => void

interface IAlertState {
    severity: AlertColor,
    text: string
}

export interface IAlertContext {
    alert: IAlertState | null,
    addAlert: AddAlertType
}

export const AlertContext = createContext<IAlertContext | null>(null);

const AlertState = ({children}: IAlertStateProps) => {

    const [alert, setAlert] = useState<null | IAlertState>(null);

    const addAlert = (text: string, severity: AlertColor = 'success') => {
        setAlert({text, severity});
        setTimeout(() => {
            setAlert(null);
        }, 1000)
    }

    return (
        <AlertContext.Provider value={{alert, addAlert}}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertState;