import React, {createContext, useState} from "react";

interface IAppStateProps {
    children: React.ReactNode
}

export interface IAppContext {
    isSidebarOpen: boolean,
    toggleSidebar: () => void
}

const initialValues = {
    isSidebarOpen: true
}

export const AppContext = createContext<IAppContext | null>(null);

const AppState = ({children}: IAppStateProps) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState)
    }

    return (
        <AppContext.Provider value={{isSidebarOpen, toggleSidebar}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppState;