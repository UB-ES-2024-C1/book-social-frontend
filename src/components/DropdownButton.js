import React from 'react';
import {MenuItem, Select} from '@mui/material';
import PropTypes from 'prop-types';
import paletteColors from "../resources/palette";

const Dropdownbutton = ({
                            value,
                            onChange,
                            label = "Person Type",
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
        >
            {options.map((option) => (
                <MenuItem key={option.toLowerCase()} value={option.toLowerCase()}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
};

// Agregar PropTypes para un mejor chequeo de tipos
Dropdownbutton.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    sx: PropTypes.object,
};

export default Dropdownbutton;
