import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AiOutlineCompass, AiOutlineHome, AiOutlinePlus, AiOutlineSave} from 'react-icons/ai';
import {useNavigate} from "react-router-dom";
import logo from '../logo.svg';
import * as routes from '../resources/routes_name';
import paletteColors from "../resources/palette";


export default function PermanentDrawer({isLogged}) {
    const [selected, setSelected] = useState('Home');
    const navigate = useNavigate();
    isLogged = true;

    const handleSelect = (item) => {
        setSelected(item);
        switch (item) {
            case 'Home':
                navigate(routes.HOME);
                break;
            case 'Discovery':
                navigate(routes.DISCOVERY);
                break;
            case 'Saved':
                navigate(routes.SAVED);
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
            }}
            role="presentation"
        >
            <div className="logo" onClick={() => handleSelect('Home')} style={{
                display: 'flex',
                justifyContent: 'center',
                justifyItems:'center',
                width: '100%',
                margin: '15px',
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
                    {text: 'New post', icon: <AiOutlinePlus/>, route: 'New post'},
                    {text: 'Home', icon: <AiOutlineHome/>, route: 'Home'},
                    {text: 'Discovery', icon: <AiOutlineCompass/>, route: 'Discovery'},
                    {text: 'Saved', icon: <AiOutlineSave/>, route: 'Saved'}
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => handleSelect(item.route)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: item.route === 'New post' ? 'center' : 'flex-start',
                                width: item.route === 'Add' ? '80%' : '100%',
                                padding: item.route === 'Add' ? '5px' : '8px',
                                gap: '5px',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                border: item.route === 'New post'
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
                                color: selected === item.route ? '#6055CF' : 'inherit',
                                fontSize: '15px',
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    fontSize: '15px',
                                    color: selected === item.route ? '#6055CF' : paletteColors.textColor,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
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
    );
}
