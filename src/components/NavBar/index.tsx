import {useState, useContext, MouseEvent} from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import {AuthContext, IAuthContext} from "../../context/auth/AuthState";

interface NavBarProps {
    backLink?: string,
    name?: string
}

const NavBar = ({backLink, name}: NavBarProps) => {

    const {auth} = useContext(AuthContext) as IAuthContext;
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar
                sx={{zIndex: 999}}
                position="relative">
                <Toolbar>
                    {
                        Boolean(backLink) &&
                            <IconButton
                                onClick={() => navigate(`${backLink}`)}
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}>
                                <ArrowBackIcon />
                            </IconButton>
                    }


                    <Box sx={{flexGrow: 1}}>
                        <h3>{Boolean(name) ? name : 'My Chat'}</h3>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                            {
                                user &&
                                (user.photoURL !== null) ?
                                <Avatar alt="Remy Sharp" src={user.photoURL} />
                                    :
                                <Avatar alt="Remy Sharp" src={undefined} />
                            }

                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleCloseMenu}>
                                <Typography
                                    onClick={() => signOut(auth)}
                                    textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;