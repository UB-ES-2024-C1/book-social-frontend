import React, {useState} from 'react';
import {Box, Checkbox, FormControlLabel, Modal, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo2 from "../logo2.svg";
import IconButton from "@mui/material/IconButton";
import {AiOutlineClose} from "react-icons/ai";
import {useAuth} from "../hooks/authentication";
import {useNavigate} from 'react-router-dom';
import * as routes from '../resources/routes_name';
import BookSocialPrimaryButton from "./BookSocialPrimaryButton";
import TextFieldButton from "./TextFieldButton";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: paletteColors.background_header,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    borderRadius: 4,
};

const LoginModal = ({open, handleClose}) => {
    const {login} = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        login(username, password);
        handleClose();
        navigate(routes.HOME);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'grey.500',
                    }}
                >
                    <AiOutlineClose/>
                </IconButton>
                <div className="logo" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    marginBottom: '15px',
                }}>
                    <img src={logo2}
                         className="App-logo"
                         alt="logo"
                         style={{width: '200px'}}
                    />
                </div>
                <Typography
                    id="modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        fontFamily: 'Arial, sans-serif',
                        color: paletteColors.textColor,
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <AccountCircle sx={{mr: 1}}/>
                    Login
                </Typography>
                <TextFieldButton
                    value={username}
                    label={'Username'}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextFieldButton
                    value={password}
                    label={'Enter your password'}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            sx={{
                                color: paletteColors.color_primary,
                                '&.Mui-checked': {
                                    color: paletteColors.color_primary,
                                }
                            }}
                        />
                    }
                    label="Remember me" sx={{color: paletteColors.textColor}}
                />
                <BookSocialPrimaryButton buttonText={'Login'} onClick={handleLogin} isExpanded={false}
                                         bgColor={paletteColors.color_primary}/>
            </Box>
        </Modal>
    );
};

export default LoginModal;
