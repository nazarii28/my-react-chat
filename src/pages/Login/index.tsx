import {useContext} from 'react';
import Button from '@mui/material/Button';
import {Box} from "@mui/material";
import {AuthContext, IAuthContext} from "../../context/auth/AuthState";

const Login = () => {
    const {signIn} = useContext(AuthContext) as IAuthContext;

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Button
                onClick={signIn}
                variant="contained">Login</Button>
        </Box>
    );
};

export default Login;