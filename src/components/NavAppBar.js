import * as React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchBar from './SearchBar';
import LoginModal from './LoginModal';
import logo from "../logo.svg";
import {useAuth} from "../hooks/authentication";
import SignInModal from "./SignInModal";

export default function NavAppBar() {
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignIn, setOpenSignIn] = React.useState(false);

    const {isLoggedIn} = useAuth();
    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);
    const handleOpenSignIn = () => setOpenSignIn(true);
    const handleCloseSignIn = () => setOpenSignIn(false);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: '#282c34', height: '68px'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}/>
                    {isLoggedIn ? (
                        <>
                            <SearchBar/>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="account of current user"
                                sx={{ml: 2}}
                                component={Link}
                                to="/profile"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <div className="logo" style={{
                                display: 'flex',
                                justifyContent: 'left',
                                width: '100%',
                            }}>
                                <img src={logo}
                                     className="App-logo"
                                     alt="logo"
                                     style={{
                                         width: '120px',
                                     }}/>
                            </div>
                            <Button color="inherit" sx={{textTransform: 'none'}} onClick={handleOpenLogin}>
                                Login
                            </Button>
                            <Button color="inherit" sx={{textTransform: 'none'}} onClick={handleOpenSignIn}>
                                Sign in
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <LoginModal open={openLogin} handleClose={handleCloseLogin}/>
            <SignInModal open={openSignIn} handleClose={handleCloseSignIn}/>
        </Box>
    );
}
