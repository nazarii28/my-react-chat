import React, {useContext, useRef, useState} from 'react';
import Layout from '../../components/Layout';
import SendIcon from '@mui/icons-material/Send';
import {useCollection, useDocumentData} from "react-firebase-hooks/firestore";
import {
    addDoc,
    collection,
    getFirestore,
    Timestamp,
    query,
    orderBy,
    doc,
    deleteDoc
} from "firebase/firestore";
import {useParams} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MessageBlock from "./MessageBlock";
import {useAuthState} from "react-firebase-hooks/auth";
import MenuIcon from '@mui/icons-material/Menu';
import RoomSettings from '../../components/RoomSettings';
import Typography from '@mui/material/Typography';
import {AlertContext, IAlertContext} from "../../context/alert/AlertState";
import Loader from '../../components/Loader/Loader';
import {AuthContext, IAuthContext} from "../../context/auth/AuthState";
import {InputBase, styled} from '@mui/material';

const chatSettingsWrapperStyles = (open: boolean) => ({
    position: 'absolute',
    right: open ? 0 : '-100%',
    top: 0,
    width: '100%',
    maxWidth: '350px',
    zIndex: 2,
    height: '100%',
    textAlign: 'right',
    background: '#fff',
    paddingTop: '65px'
});

const chatStyles = (background: undefined | string, open: boolean) => ({
    position: 'relative',
    width: '100%',
    zIndex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: background ? `url(${background})` : '#c2c2c2',
});

const menuIconStyles = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    zIndex: 3
}

const ChatBox = styled(Box)(() => ({
    flexGrow: 1,
    overflow: 'auto',
    paddingBottom: '120px',
    '::-webkit-scrollbar': {
        display: 'none'
    }
}));

const BottomPanelStyled = styled(Box)(({theme}) => ({
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '55px',
    width: '98%',
    display: 'flex',
    padding: '5px',
    border: `1px solid ${theme.palette.grey['300']}`,
    background: '#fff',
    borderRadius: '50px',
    zIndex: 3
}));

const messageInputStyles = {
    flexGrow: 1,
    padding: '0 20px'
}

const loaderWrapperStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const SendButton = styled(IconButton)(({theme}) => ({
    color: '#fff',
    background: theme.palette.primary.main
}));

const Chat = () => {
    const {addAlert} = useContext(AlertContext) as IAlertContext;
    const {id} = useParams();
    const {auth, app} = useContext(AuthContext) as IAuthContext;
    const [user] = useAuthState(auth);
    const [messages, loading] = useCollection(
        query(collection(getFirestore(app), `rooms/${id}/messages`), orderBy("createdAt"))
    );
    const [roomData] = useDocumentData(
        doc(getFirestore(app), 'rooms', id || '')
    );

    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const messagesRef = useRef<HTMLElement>(null)

    const addMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(getFirestore(app), `rooms/${id}/messages`), {
                text: value,
                name: user?.displayName,
                photoUrl: user?.photoURL,
                uid: user?.uid,
                createdAt: Timestamp.now().toDate()
            });
            setValue('');
            if(messagesRef.current) {
                messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
            }
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

    if(loading) {
        return (
                <Box
                sx={loaderWrapperStyles}
                >
                    <Loader/>
                </Box>
            )
    }

    return (
        <>
            <Box
                sx={chatSettingsWrapperStyles(open)}
            >
                <RoomSettings roomData={roomData} id={id}/>
            </Box>
            <IconButton
                onClick={() => {
                    setOpen(!open)
                }}
                sx={menuIconStyles}
            >
                <MenuIcon/>
            </IconButton>
           <Box
            sx={chatStyles(roomData?.background, open)}
           >
               <ChatBox
                ref={messagesRef}
               >
                   {
                       messages?.docs.length === 0 &&
                       <Typography color="#fff">Нет сообщений</Typography>
                   }
                   {
                       messages?.docs.map((item, index) => (
                           <MessageBlock
                               onDelete={() => deleteMessage(item.id)}
                               key={item.id}
                               photoUrl={item.data().photoUrl}
                               name={item.data().name}
                               isLast={messages?.docs[index].data().name !== messages?.docs[index + 1]?.data().name}
                               isSender={item.data().uid === user?.uid}>
                               {item.data().text}
                           </MessageBlock>
                       ))
                   }
               </ChatBox>
           </Box>
            <BottomPanelStyled
                component="form"
                onSubmit={addMessage}
            >
                <InputBase
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    sx={messageInputStyles}/>
                <SendButton type="submit">
                    <SendIcon/>
                </SendButton>
            </BottomPanelStyled>
        </>
    );
};

export default Chat;