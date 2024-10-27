import React, {useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import {purple} from "@mui/material/colors";
import AccountCircle from "@mui/icons-material/AccountCircle";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: paletteColors.color_primary_weakest,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: 4,
};

const LoginModal = ({open, handleClose}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
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
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                        color: paletteColors.textColor,
                        '& .MuiInputLabel-root': {color: paletteColors.textColor},
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
                        '& .MuiInputLabel-root': {color: paletteColors.textColor},
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {borderColor: paletteColors.textColor},
                            '&:hover fieldset': {borderColor: paletteColors.textColor},
                            '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                            '&:hover .MuiOutlinedInput-input': {color: 'white'}
                        },
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            sx={{
                                color: purple[800],
                                '&.Mui-checked': {
                                    color: purple[600],
                                }
                            }}
                        />
                    }
                    label="Remember me" sx={{color: paletteColors.textColor}}
                />
                <Button
                    variant="contained"
                    onClick={handleLogin}
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
                    Login
                </Button>
            </Box>
        </Modal>
    );
};

export default LoginModal;
