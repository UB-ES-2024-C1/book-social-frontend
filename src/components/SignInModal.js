import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import {purple} from "@mui/material/colors";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo2 from "../logo2.svg";
import IconButton from "@mui/material/IconButton";
import {AiOutlineClose} from "react-icons/ai";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: paletteColors.color_primary_weakest,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    borderRadius: 4,
};

const SignInModal = ({open, handleClose}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        console.log("Name:", name)
        console.log("Username:", username);
        console.log("Password:", password);
        handleClose();
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
                    Create account
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                        color: paletteColors.textColor,
                        '& .MuiInputLabel-root': {
                            color: paletteColors.textColor,
                            '&:hover .MuiOutlinedInput-input': {color: 'white'}
                        },

                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {borderColor: paletteColors.textColor},
                            '&:hover fieldset': {borderColor: paletteColors.textColor},
                            '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                            '&:hover .MuiOutlinedInput-input': {color: 'white'}
                        },
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        color: paletteColors.textColor,
                        '& .MuiInputLabel-root': {
                            color: paletteColors.textColor,
                            '&:hover .MuiOutlinedInput-input': {color: 'white'}
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {borderColor: paletteColors.textColor},
                            '&:hover fieldset': {borderColor: paletteColors.textColor},
                            '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                            '&:hover .MuiOutlinedInput-input': {color: 'white'}
                        },
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSignIn}
                    sx={{
                        mt: 2,
                        backgroundColor: purple[800],
                        color: paletteColors.textColor,
                        '&:hover': {
                            backgroundColor: paletteColors.color_primary_weak,
                            color: paletteColors.textColor,
                        }
                    }}
                >
                    Sign In
                </Button>
            </Box>
        </Modal>
    );
};

export default SignInModal;
