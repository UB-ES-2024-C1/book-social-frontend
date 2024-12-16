import React, { useState, useEffect } from 'react';
import { MenuItem, Select, Chip, Box, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete'; // To use a custom delete icon
import paletteColors from '../resources/palette';

const BookSocialGenereSelector = ({ genres, selectedGenres, onGenreChange, label }) => {
    const [availableGenres, setAvailableGenres] = useState(genres);
    const [open, setOpen] = useState(false);  // State to control the dropdown open state

    useEffect(() => {
        setAvailableGenres(genres); // Update availableGenres when genres prop changes
    }, [genres]);

    const handleAddGenre = (event) => {
        const newGenres = event.target.value;
        onGenreChange(newGenres);
    };

    const handleOpen = () => setOpen(true); // Open dropdown
    const handleClose = () => setOpen(false); // Close dropdown

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Select
                multiple
                label
                value={selectedGenres}
                onChange={handleAddGenre}
                displayEmpty
                open={open}  // Use the open state to control dropdown visibility
                onOpen={handleOpen}
                onClose={handleClose}
                renderValue={(selected) =>
                    selected.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    sx={{
                                        backgroundColor: paletteColors.color_primary,  // Set background color of selected items
                                        color: 'white',  // Set text color to white
                                    }}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'left', width: '100%', color: paletteColors.textColor }}>
                            {label}
                        </Box>
                    )
                }
                sx={{
                    color: paletteColors.textColor,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // White border by default
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'lightgray', // Lighter border on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // White border when focused
                    },
                    '& .MuiSvgIcon-root': {
                        color: paletteColors.textColor, // Dropdown icon color
                    },
                }}
            >
                {availableGenres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                        {genre}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

BookSocialGenereSelector.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
    onGenreChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default BookSocialGenereSelector;
