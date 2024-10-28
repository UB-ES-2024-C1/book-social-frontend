import React, {useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo2 from "../logo2.svg";
import IconButton from "@mui/material/IconButton";
import {AiOutlineClose} from "react-icons/ai";
import BookSocialPrimaryButton from "./BookSocialPrimaryButton";
import {useAuth} from "../hooks/authentication";
import {useNavigate} from "react-router-dom";
import * as routes from '../resources/routes_name';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 670,
    bgcolor: paletteColors.background_header,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    borderRadius: 4,
};

const SignInModal = ({open, handleClose}) => {
    const {signIn} = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [genre, setGenre] = useState('');
    const [personType, setPersonType] = useState('');
    const navigate = useNavigate();


    const handleSignIn = () => {
        signIn(name, username, email, password);
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
                    Create account
                </Typography>
                <Box sx={{display: 'flex', gap: 2}}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            color: paletteColors.textColor,
                            '& .MuiInputLabel-root': {
                                color: paletteColors.textColor,
                                '&:hover .MuiInputLabel-input': {color: 'white'}
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {borderColor: paletteColors.textColor},
                                '&:hover fieldset': {borderColor: paletteColors.textColor},
                                '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                            },
                        }}
                    /><TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                        color: paletteColors.textColor,
                        '& .MuiInputLabel-root': {
                            color: paletteColors.textColor,
                            '&:hover .MuiInputLabel-input': {color: 'white'}
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {borderColor: paletteColors.textColor},
                            '&:hover fieldset': {borderColor: paletteColors.textColor},
                            '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                        },
                    }}
                />
                </Box>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        color: paletteColors.textColor,
                        '& .MuiInputLabel-root': {
                            color: paletteColors.textColor,
                            '&:hover .MuiInputLabel-input': {color: 'white'}
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {borderColor: paletteColors.textColor},
                            '&:hover fieldset': {borderColor: paletteColors.textColor},
                            '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                        },
                    }}
                />
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
                            '&:hover .MuiInputLabel-input': {color: 'white'}
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {borderColor: paletteColors.textColor},
                            '&:hover fieldset': {borderColor: paletteColors.textColor},
                            '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                        },
                    }}
                />
                <TextField
                    label="Enter your password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        color: paletteColors.textColor,
                        '& .MuiInputLabel-root': {
                            color: paletteColors.textColor,
                            '&:hover .MuiInputLabel-input': {color: 'white'}
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {borderColor: paletteColors.textColor},
                            '&:hover fieldset': {borderColor: paletteColors.textColor},
                            '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                        },
                    }}
                />
                <Box sx={{display: 'flex', gap: 2}}>
                    <FormControl fullWidth>
                        <InputLabel id="genre-label" sx={{
                            color: paletteColors.textColor,
                            "&.Mui-focused": {
                                color: paletteColors.textColor,
                            },
                        }}>Genre</InputLabel>
                        <Select
                            labelId="genre-label"
                            id="genre"
                            value={genre}
                            label="Genre"
                            onChange={(e) => setGenre(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: paletteColors.textColor,
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: paletteColors.textColor,
                                    color: paletteColors.textColor
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: paletteColors.textColor,
                                },
                                color: paletteColors.textColor,
                                "& .MuiSelect-icon": {
                                    color: paletteColors.textColor,
                                },
                            }}
                        >
                            <MenuItem value="fiction">Fiction</MenuItem>
                            <MenuItem value="horror">Horror</MenuItem>
                            <MenuItem value="comedy">Comedy</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="person-type-label" sx={{
                            color: paletteColors.textColor,
                            "&.Mui-focused": {
                                color: paletteColors.textColor,
                            },
                        }}>Person Type</InputLabel>
                        <Select
                            labelId="person-type-label"
                            id="person-type"
                            value={personType}
                            label="Person Type"
                            onChange={(e) => setPersonType(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: paletteColors.textColor,
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: paletteColors.textColor,
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: paletteColors.textColor,
                                },
                                color: paletteColors.textColor,
                                "& .MuiSelect-icon": {
                                    color: paletteColors.textColor,
                                },
                            }}
                        >
                            <MenuItem value="fiction">Fiction</MenuItem>
                            <MenuItem value="horror">Horror</MenuItem>
                            <MenuItem value="comedy">Comedy</MenuItem>
                        </Select>
                    </FormControl>

                </Box>
                <BookSocialPrimaryButton buttonText={'Sign In'} onClick={handleSignIn} isExpanded={false}
                                         bgColor={paletteColors.color_primary}/>
            </Box>
        </Modal>
    );
};

export default SignInModal;
