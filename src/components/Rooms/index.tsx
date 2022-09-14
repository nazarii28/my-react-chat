import React, {useContext, useState} from 'react';
import List from '@mui/material/List';
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import {IRoomsContext, RoomsContext} from "../../context/rooms/RoomsState";
import {AppContext, IAppContext} from "../../context/app/AppState";
import RoomsItem from './RoomsItem';

const deleteButtonStyles = {
    color: 'red'
}

const addRoomInputStyles = {
    width: '100%'
}

const addRoomButtonStyles = {
    width: '100%',
    marginTop: '20px'
}

const skeletonWrapperStyles = {
    display: 'flex',
    marginBottom: 3,
    marginTop: 4
}

const skeletonAvatarStyles = {
    marginLeft: '30px',
    marginRight: '20px'
}

const skeletonContentStyles = {
    flexGrow: 1,
    marginRight: '30px'
}

const Rooms = () => {
    const {rooms, loading, addRoom, deleteRoom} = useContext(RoomsContext) as IRoomsContext;
    const {isSidebarOpen} = useContext(AppContext) as IAppContext;

    const [value, setValue] = useState('');

    const addHandler = () => {
        addRoom(value);
    }

    const navigate = useNavigate();
    const clickHandler = (id: string) => {
        navigate(`/rooms/${id}`);
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [currentId, setCurrentId] = useState('');
    const closeHandler = () => {
        setAnchorEl(null);
    }

    const deleteHandler = () => {
        deleteRoom(currentId);
        setAnchorEl(null);
    }

    const clickMenuHandler = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setCurrentId(id);
    }

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={closeHandler}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem
                    sx={deleteButtonStyles}
                    onClick={deleteHandler}>Delete</MenuItem>
            </Menu>
            <List>
                {
                    loading ?
                        [0, 1, 2, 3].map(item => (
                            <Box
                                sx={skeletonWrapperStyles}
                                key={item}
                            >
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                    sx={skeletonAvatarStyles}
                                />
                                <Skeleton
                                    sx={skeletonContentStyles}
                                    variant="rectangular" width={210} height={40} />
                            </Box>
                        ))
                        : rooms?.docs.map((room) => (
                        <RoomsItem
                            key={room.id}
                            isOpen={isSidebarOpen}
                            onClick={() => clickHandler(room.id)}
                            onClickMenu={(e: React.MouseEvent<HTMLElement>) => clickMenuHandler(e, room.id)}
                            name={room.data().name}
                            avatar={room.data().image}
                        />
                    ))
                }
            </List>
            {
                isSidebarOpen &&
                <>
                    <Box
                        mt={3}>
                        <TextField
                            sx={addRoomInputStyles}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            label="Добавить комнату"
                            variant="outlined" />
                    </Box>
                    <Button
                        sx={addRoomButtonStyles}
                        variant="outlined"
                        onClick={addHandler}>Добавить
                    </Button>
                </>
            }
        </>
    );
};

export default Rooms;