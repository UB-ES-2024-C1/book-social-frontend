import React from 'react';
import {MenuItem, Select} from '@mui/material';
import PropTypes from 'prop-types';
import paletteColors from "../resources/palette";

const BookSocialDropdown = ({
                                value,
                                onChange,
                                label,
                                options = [],
                                sx = {},
                            }) => {
    return (
        <Select
            labelId={`${label}-label`}
            id={`${label}-select`}
            value={value}
            label={label}
            onChange={onChange}
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
                ...sx,
            }}
            MenuProps={{
                PaperProps: {
                    sx: {
                        backgroundColor: '#5b5a5a',
                    },
                },
            }}
        >
            {options.map((option) => (
                <MenuItem
                    key={option.toLowerCase()}
                    value={option.toLowerCase()}
                    sx={{
                        backgroundColor: '#5b5a5a',
                        color: 'white',
                        "&:hover": {
                            backgroundColor: paletteColors.textColorStrong,
                        },
                    }}
                >
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
};

// Agregar PropTypes para un mejor chequeo de tipos
BookSocialDropdown.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    sx: PropTypes.object,
};

export default BookSocialDropdown;
