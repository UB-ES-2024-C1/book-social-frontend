// NavAppBar.js
import * as React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchBar from './SearchBar';

export default function NavAppBar() {
    const [logged] = useState(true);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: '#282c34'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    </Typography>
                    {logged ? (
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
                            <Button color="inherit" sx={{textTransform: 'none'}}>Login</Button>
                            <Button color="inherit" sx={{textTransform: 'none'}}>Sign in</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
