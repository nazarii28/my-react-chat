import React, {createContext, useContext, useState} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {addDoc, collection, deleteDoc, doc, DocumentData, getFirestore, QuerySnapshot} from "firebase/firestore";
import {AlertContext, IAlertContext} from "../alert/AlertState";
import {AuthContext, IAuthContext} from '../auth/AuthState';

export interface IRoomsContext {
    rooms: QuerySnapshot<DocumentData> | undefined;
    loading: boolean;
    addRoom: (name: string) => void;
    deleteRoom: (id: string) => void;
}

interface IRoomsStateProps {
    children: React.ReactNode
}

export const RoomsContext = createContext<IRoomsContext | null>(null);

const RoomsState = ({children}: IRoomsStateProps) => {

    const {app} = useContext(AuthContext) as IAuthContext;
    const {addAlert} = useContext(AlertContext) as IAlertContext;
    const [rooms, loading] = useCollection(
        collection(getFirestore(app), 'rooms')
    );

    const addRoom = async (name: string) => {
        try {
            await addDoc(collection(getFirestore(app), "rooms"), {
                name,
            });
            addAlert('Комната добавлена');
        } catch (e) {
            addAlert('Возникла ошибка', 'error');
        }
    }

    const deleteRoom = async (id: string) => {
        await deleteDoc(doc(getFirestore(app), "rooms", id));
        addAlert('Комната удалена');
    }

    return (
        <RoomsContext.Provider value={{rooms, loading, addRoom, deleteRoom}}>
            {children}
        </RoomsContext.Provider>
    );
};

export default RoomsState;