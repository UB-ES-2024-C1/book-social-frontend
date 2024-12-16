import React, {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, Modal, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo2 from "../logo2.svg";
import IconButton from "@mui/material/IconButton";
import {AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import BookSocialPrimaryButton from "./BookSocialPrimaryButton";
import {useAuth} from "../hooks/authentication";
import {useNavigate} from "react-router-dom";
import * as routes from '../resources/routes_name';
import BookSocialTextField from "./BookSocialTextField";
import BookSocialDropdown from "./BookSocialDropdown";
import BookSocialText from "./BookSocialText";
import api from "../services/api";

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
    const {signIn, error} = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [genre, setGenre] = useState('');
    const [personType, setPersonType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [genres, setGenres] = useState([]); // Estado para almacenar los géneros
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const types_person = ['Reader', 'Writer'];

    const handleSignIn = async () => {
        console.log(genre);
        await signIn(
            name,
            username,
            email,
            password,
            genre,
            personType
        );
        if (error) {
            setErrorMessage(error);
        } else {
            setErrorMessage('');
            handleClose();
            navigate(routes.HOME);
        }
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await api.get('books/genres');
                setGenres(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        if (open) {
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
                    <img src={logo2} className="App-logo" alt="logo" style={{width: '200px'}}/>
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
                    <BookSocialTextField
                        value={name}
                        type={'text'}
                        label={'Name'}
                        onChange={(e) => setName(e.target.value)}
                        dataTestId={'name-input'}
                    />
                    <BookSocialTextField
                        value={username}
                        label={'Username'}
                        type={'text'}
                        onChange={(e) => setUsername(e.target.value)}
                        dataTestId={'username-input'}
                    />
                </Box>
                <BookSocialTextField
                    value={email}
                    label={'Email'}
                    type={'email'}
                    onChange={(e) => setEmail(e.target.value)}
                    dataTestId={'email'}
                />
                <Box sx={{position: 'relative'}}>
                    <BookSocialTextField
                        value={password}
                        type={showPassword ? 'text' : 'password'}
                        label={'Enter your password'}
                        onChange={(e) => setPassword(e.target.value)}
                        dataTestId={'password-input'}
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
                <Box sx={{position: 'relative'}}>
                    <BookSocialTextField
                        value={password2}
                        type={showPassword2 ? 'text' : 'password'}
                        label={'Confirm your password'}
                        onChange={(e) => setPassword2(e.target.value)}
                        dataTestId={'password2-input'}
                    />
                    <IconButton
                        onClick={toggleShowPassword2}
                        edge="end"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: 13,
                            transform: 'translateY(-50%)',
                            color: paletteColors.textColor,
                        }}
                    >
                        {showPassword2 ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </IconButton>
                </Box>
                <Box sx={{display: 'flex', gap: 2}}>
                    <FormControl fullWidth>
                        <InputLabel id="genre-label" sx={{
                            color: paletteColors.textColor,
                            "&.Mui-focused": {
                                color: paletteColors.textColor,
                            },
                        }}>Genre</InputLabel>
                        <BookSocialDropdown
                            label='Genre'
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            options={genres} // Usar los géneros obtenidos de la API
                            dataTestId={'genre-dropdown'}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="person-type-label" sx={{
                            color: paletteColors.textColor,
                            "&.Mui-focused": {
                                color: paletteColors.textColor,
                            },
                        }}>Person Type</InputLabel>
                        <BookSocialDropdown
                            label='Person Type'
                            value={personType}
                            onChange={(e) => setPersonType(e.target.value)}
                            options={types_person}
                            dataTestId={'person-type-dropdown'}
                        />
                    </FormControl>
                </Box>

                {errorMessage && (
                    <BookSocialText level={"small"} text={errorMessage} sx={{textAlign: 'left'}}
                                    color={paletteColors.warning_error}
                    />
                )}
                <BookSocialPrimaryButton buttonText={'Create Account'} onClick={handleSignIn} isExpanded={false}
                                         bgColor={paletteColors.color_primary} dataTestId={'create-button'}/>
            </Box>
        </Modal>
    );
};

export default SignInModal;
