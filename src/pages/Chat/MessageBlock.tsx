import React from 'react';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Menu, MenuItem} from "@mui/material";

interface MessageBlockProps {
    children: React.ReactNode,
    isSender?: boolean,
    photoUrl?: string,
    name?: string,
    onDelete?: (event: React.MouseEvent<HTMLElement>) => void,
    isLast?: boolean
}

const MessageBlock = ({children, isSender, photoUrl, name, onDelete, isLast}: MessageBlockProps) => {
    const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorMenu);

    const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
        if(isSender) {
            setAnchorMenu(event.currentTarget);
        }
    };
    const closeHandler = () => {
        setAnchorMenu(null);
    };
    return (
        <>
            <Menu
                anchorEl={anchorMenu}
                open={menuOpen}
                onClose={closeHandler}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    sx={{color: 'red'}}
                    onClick={onDelete}>Delete</MenuItem>
            </Menu>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: isSender ? 'row-reverse' : 'row',
                    padding: '0 10px',
                    height: '40px',
                }}>
                {isLast ? <Avatar src={photoUrl} alt={name}/> : <Box width="40px" />}
                <Box
                    onClick={clickHandler}
                    sx={{
                        background: (theme) => isSender ? theme.palette.primary.dark : theme.palette.primary.main,
                        borderRadius: `${(isLast && !isSender) ? '3px' : '10px'} ${(isLast && isSender) ? '3px' : '10px'} 10px 10px`,
                        padding: '7px 10px',
                        color: '#fff',
                        maxWidth: 300,
                        margin: '0 10px',
                        marginLeft: isSender ? 'auto' : '10px',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
};

export default MessageBlock;