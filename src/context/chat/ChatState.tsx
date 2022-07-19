import {
    addDoc,
    collection, deleteDoc, doc,
    DocumentData,
    getFirestore,
    orderBy,
    query,
    QuerySnapshot,
    Timestamp
} from "firebase/firestore";
import React, {createContext, ReactNode, useContext} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {AuthContext, IAuthContext} from "../auth/AuthState";
import {useParams} from "react-router-dom";
import {AlertContext, IAlertContext} from "../alert/AlertState";

interface INewMessage {
    text: string;
    name: string;
    photoUrl?: string
    uid: string;
    createdAt: string;
}

export interface IChatContext {
    messages: QuerySnapshot<DocumentData> | undefined;
    loading: boolean;
    addMessage: (roomId: string, message: INewMessage) => void;
    deleteMessage: (roomId: string, messageId: string) => void;
}

interface IChatStateProps {
    children: ReactNode
}

export const ChatContext = createContext<IChatContext | null>(null);

const ChatState = ({children}: IChatStateProps) => {
    const {auth, app} = useContext(AuthContext) as IAuthContext;
    const {addAlert} = useContext(AlertContext) as IAlertContext;
    const {id} = useParams();

    const [messages, loading] = useCollection(
        query(collection(getFirestore(app), `rooms/${id}/messages`), orderBy("createdAt"))
    );

    const addMessage = async (roomId: string, message: INewMessage) => {
        try {
            await addDoc(collection(getFirestore(app), `rooms/${id}/messages`), message);
        } catch (e) {
            addAlert('Возникла ошибка', 'error');
        }
    };

    const deleteMessage = async (messageId: string) => {
        try {
            await deleteDoc(doc(getFirestore(app), `rooms/${id}/messages`, messageId));
        } catch (e) {
            addAlert('Возникла ошибка при удалении', 'error');
        }
    }

    return (
        <ChatContext.Provider value={id ? {messages, loading, addMessage, deleteMessage} : null}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatState;