import React, {createContext, useContext, useState} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {addDoc, collection, DocumentData, getFirestore, QuerySnapshot} from "firebase/firestore";
import {Context} from "../../index";
import AlertState from "../alert/AlertState";

interface IRoomsContext {
    rooms: QuerySnapshot<DocumentData> | undefined;
    loading: boolean;
    addRoom: (name: string) => void;
}

interface IRoomsStateProps {
    children: React.ReactNode
}

const RoomsState = ({children}: IRoomsStateProps) => {

    const {app} = useContext(Context);
    const {addAlert} = useContext(AlertContext);
    const [rooms, loading] = useCollection(
        collection(getFirestore(app), 'rooms')
    );

    const addRoom = async (name: string) => {
        try {
            await addDoc(collection(getFirestore(app), "rooms"), {
                name,
            });
            if (addAlert) {
                addAlert('Комната добавлена');
            }
        } catch (e) {
            if (addAlert) {
                addAlert('Возникла ошибка', 'error');
            }
        }
    }

    const defaultState = {
        rooms, loading, addRoom
    };

    const RoomsContext = createContext<IRoomsContext>(defaultState);
    return (
        <RoomsContext.Provider value={defaultState}>
            {children}
        </RoomsContext.Provider>
    );
};

export default RoomsState;