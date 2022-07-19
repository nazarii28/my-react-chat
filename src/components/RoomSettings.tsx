import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, {useContext, useEffect, useState} from 'react';
import { getFirestore, doc, setDoc, DocumentData } from 'firebase/firestore';
import Button from '@mui/material/Button';
import {AuthContext, IAuthContext} from "../context/auth/AuthState";

interface RoomSettingsProps {
    id?: string,
    roomData?: DocumentData
}

const RoomSettings = ({id, roomData}: RoomSettingsProps) => {
    const [roomImageUrl, setRoomImageUrl] = useState('');
    const [background, setBackground] = useState('');
    const [name, setName] = useState('');
    const {app} = useContext(AuthContext) as IAuthContext;

    useEffect(() => {
        if(roomData) {
            setName(roomData.name);
        }
        if(roomData && roomData.image) {
            setRoomImageUrl(roomData.image);
        }
        if(roomData && roomData.background) {
            setBackground(roomData.background)
        }
    }, [roomData]);

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomImageUrl(e.target.value)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackground(e.target.value)
    }

    const handleSubmit = async () => {
        await setDoc(doc(getFirestore(app), "rooms", id || ''), {
            name,
            image: roomImageUrl,
            background
        });
    }

    return (
        <Box
            sx={{
                padding: '0 15px'
            }}
        >
             <Typography
                 sx={{textAlign: 'center'}}
                 fontSize={24}
                 fontWeight={600}
                 component="h2">
                 Room Settings
             </Typography>
            <Box mt={3}>
                <TextField
                    value={name}
                    onChange={handleNameChange}
                    label="Название комнаты"
                    variant="outlined" />
            </Box>
            <Box mt={3}>
                <TextField
                    value={roomImageUrl}
                    onChange={handleImageInputChange}
                    label="Изображение комнаты"
                    variant="outlined" />
            </Box>
            <Box mt={3}>
                <TextField
                    value={background}
                    onChange={handleBackgroundChange}
                    label="Фон комнаты"
                    variant="outlined" />
            </Box>
            <Box mt={3}>
                <Button variant="outlined" onClick={handleSubmit}>
                    Подтвердить
                </Button>
            </Box>
            <Box mt={3}>
                <Button variant="outlined" color="error">
                    Удалить комнату
                </Button>
            </Box>
        </Box>
    );
};

export default RoomSettings;