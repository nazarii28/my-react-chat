import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import React from "react";

interface IRoomsItemProps {
    onClick: () => void,
    onClickMenu: (e: React.MouseEvent<HTMLElement>) => void,
    name: string,
    avatar: string,
    isOpen: boolean
}

const RoomsItem = ({onClick, onClickMenu, name, avatar, isOpen}: IRoomsItemProps) => {
    return (
        <ListItem
            sx={{
                padding: 0
            }}
            secondaryAction={
                isOpen &&
                <IconButton
                    onClick={onClickMenu}
                    edge="end"
                    aria-label="delete">
                    <MoreVertIcon/>
                </IconButton>
            }
        >
            <ListItemButton
                onClick={onClick}
            >
                <ListItemAvatar>
                    <Avatar
                        alt={name}
                        src={avatar}
                    />
                </ListItemAvatar>
                {
                    isOpen && <ListItemText primary={name} />
                }
            </ListItemButton>
        </ListItem>
    );
}

export default RoomsItem;