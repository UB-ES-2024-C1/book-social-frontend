import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {alpha, styled} from '@mui/material/styles';
import * as routes from '../resources/routes_name';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            navigate(`${routes.DISCOVERY}?search=${encodeURIComponent(inputValue.trim())}`);
            setInputValue('');
        }
    };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search by title"
                inputProps={{'aria-label': 'search'}}
            />
        </Search>
    );
};

export default SearchBar;
