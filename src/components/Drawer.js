import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {AiFillSave, AiOutlineCompass, AiOutlineHome, AiOutlinePlus} from 'react-icons/ai';
import {useLocation, useNavigate} from "react-router-dom";
import logo from '../logo.svg';
import * as routes from '../resources/routes_name';
import paletteColors from "../resources/palette";
import {Typography} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useAuth} from "../hooks/authentication";
import useProfile from "../hooks/profile/profile";


export default function PermanentDrawer({isLogged}) {
    const {profile, loadingProfile} = useProfile();
    const {logout, user} = useAuth(); // Comprobar el tipo de user
    const [selected, setSelected] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // Estado para controlar el diálogo
    const navigate = useNavigate();
    const location = useLocation();

    isLogged = true;

    const handleLogout = () => {
        logout();
        navigate(routes.LANDING);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true); // Abre el diálogo
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Cierra el diálogo sin cerrar sesión
    };

    const confirmLogout = () => {
        handleLogout();
        handleCloseDialog();
    };

    useEffect(() => {
        const currentPath = location.pathname;
        switch (currentPath) {
            case routes.HOME:
                setSelected('Home');
                break;
            case routes.DISCOVERY:
                setSelected('Discovery');
                break;
            case routes.SAVED:
                setSelected('Saved Books');
                break;
            case routes.NEW_BOOK:
                setSelected('New book');
                break;
            case routes.NEW_POST:
                setSelected('New Post');
                break;
            default:
                setSelected('');
                break;
        }
    }, [location.pathname]);

    const handleSelect = (item) => {
        setSelected(item);
        switch (item) {
            case 'Home':
                navigate(routes.HOME);
                break;
            case 'Discovery':
                navigate(routes.DISCOVERY);
                break;
            case 'Saved Books':
                navigate(routes.SAVED);
                break;
            case 'New book':
                navigate(routes.NEW_BOOK);
                break;
            case 'New Post':
                navigate(routes.NEW_POST);
                break;
            default:
                break;
        }
    };

    const DrawerList = (
        <Box
            sx={{
                width: 225,
                height: '100vh',
                padding: '25px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: paletteColors.background_color,
                position: 'relative', // Permite posicionar elementos absolutos dentro
            }}
            role="presentation"
        >
            <div className="logo" onClick={() => handleSelect('Home')} style={{
                display: 'flex',
                justifyContent: 'center',
                justifyItems: 'center',
                width: '100%',
                margin: '15px',
                cursor: 'pointer'
            }}>
                <img src={logo}
                     className="App-logo"
                     alt="logo"
                     style={{
                         width: '225px',
                     }}/>
            </div>
            <Divider/>
            <List sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '10px',
                width: '100%',
            }}>
                {[
                    {
                        text: 'New post',
                        icon: <AiOutlinePlus/>,
                        route: 'New Post'
                    },
                    ...(profile?.role === 'writer'
                        ? [{
                            text: 'New book',
                            icon: <AiOutlinePlus/>,
                            route: 'New book',
                        }]
                        : []
                    ),
                    {
                        text: 'Home',
                        icon: <AiOutlineHome/>,
                        route: 'Home'
                    },
                    {
                        text: 'Discovery',
                        icon: <AiOutlineCompass/>,
                        route: 'Discovery'
                    },
                    {
                        text: 'Saved Books',
                        icon: <AiFillSave/>,
                        route: 'Saved Books'
                    },
                    // {text: 'Saved', icon: <AiOutlineSave/>, route: 'Saved'}
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => handleSelect(item.route)}
                            data-testid={`button-${item.route.toLowerCase().replace(/\s+/g, '-')}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: item.route === 'New Post' || item.route === 'New book' ? 'center' : 'flex-start',
                                width: item.route === 'Add' ? '80%' : '100%',
                                padding: item.route === 'Add' ? '5px' : '8px',
                                gap: '5px',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                border: item.route === 'New Post' || item.route === 'New book'
                                    ? '1px solid #FFFFFF'
                                    : selected === item.route
                                        ? '1px solid #6055CF'
                                        : '1px solid transparent',
                                margin: item.route === 'Add' ? '0 auto' : '0',
                                background: selected === item.route ? paletteColors.background_color : 'transparent',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                            className={selected === item.route ? 'active' : ''}
                        >

                            <ListItemIcon sx={{
                                color: selected === item.route ? paletteColors.color_primary : 'inherit',
                                fontSize: '15px',
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    fontSize: '15px',
                                    color: selected === item.route ? paletteColors.color_primary : paletteColors.textColor,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>
            <Typography
                id="modal-title"
                sx={{
                    fontFamily: 'Roboto',
                    textAlign: 'left', // Alinea el texto a la izquierda
                    display: 'flex', // Usar flexbox para organizar el contenido
                    alignItems: 'center', // Centra el icono verticalmente respecto al texto
                    position: 'absolute', // Alinea al contenedor padre
                    bottom: '20px', // Coloca el botón cerca del fondo
                    left: '20px', // Alinea a la izquierda del contenedor
                    cursor: 'pointer',
                    color: 'white',
                    justifyContent: 'flex-start', // Asegura que todo se alinee al inicio (izquierda)
                }}
                onClick={handleOpenDialog}
            >
                <Logout
                    sx={{
                        mr: 1,
                        color: 'white',
                    }}/> {/* Icono de logout */}
                Logout {/* Texto de logout */}
            </Typography>
        </Box>
    );


    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        background: paletteColors.background_color,
                        boxSizing: 'border-box',
                        color: paletteColors.textColor,
                    },
                }}
            >
                {isLogged && DrawerList}
            </Drawer>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: paletteColors.background_header,
                        color: 'white',
                    }
                }}
            >
                <DialogTitle id="logout-dialog-title">{"Are you sure you want to log out?"} </DialogTitle>
                <DialogContent sx={{justifyContent: 'center'}}>
                    <DialogContentText id="logout-dialog-description" sx={{justifyContent: 'center', color: 'white'}}>
                        If you log out, you will need to log in again to access your account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <Button onClick={handleCloseDialog} color='white'>
                        No
                    </Button>
                    <Button onClick={confirmLogout} color='white' autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}