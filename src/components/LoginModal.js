import React, {useEffect, useState} from 'react';
import {Box, Checkbox, FormControlLabel, Modal, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo2 from "../logo2.svg";
import IconButton from "@mui/material/IconButton";
import {AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {useAuth} from "../hooks/authentication";
import {useNavigate} from 'react-router-dom';
import * as routes from '../resources/routes_name';
import BookSocialPrimaryButton from "./BookSocialPrimaryButton";
import BookSocialTextField from "./BookSocialTextField";
import BookSocialText from "./BookSocialText";

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
    const {login, error} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Local error message state

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        await login(username, password);
        if (error) {
            setErrorMessage(error); // Set the error message from context
        } else {
            setErrorMessage(''); // Clear error message on successful login
            navigate(routes.HOME);
        }
    };

    useEffect(() => {
        if (open) { // If the modal is opened, clear any previous error
            setErrorMessage('');
        }
    }, [open]);

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
                <BookSocialTextField
                    value={username}
                    label={'Email'}
                    onChange={(e) => setUsername(e.target.value)}
                    dataTestId="username-input"
                />
                <Box sx={{position: 'relative'}}>
                    <BookSocialTextField
                        value={password}
                        type={showPassword ? 'text' : 'password'}
                        label={'Enter your password'}
                        onChange={(e) => setPassword(e.target.value)}
                        dataTestId="password-input"
                    />
                    <IconButton
                        onClick={toggleShowPassword}
                        edge="end"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: 13,
                            transform: 'translateY(-50%)',
                            color: paletteColors.textColor,
                        }}
                    >
                        {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </IconButton>
                </Box>
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
                {errorMessage && (
                    <BookSocialText level={"small"} text={errorMessage} sx={{textAlign: 'left'}}
                                    color={paletteColors.warning_error}
                    />
                )}
                <BookSocialPrimaryButton buttonText={'Login'} onClick={handleLogin} isExpanded={false}
                                         bgColor={paletteColors.color_primary} dataTestId={'login-button'}/>

            </Box>
        </Modal>
    );
};

export default LoginModal;
