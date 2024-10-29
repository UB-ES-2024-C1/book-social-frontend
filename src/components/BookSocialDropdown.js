import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import paletteColors from "../resources/palette";

const BookSocialDropdown = ({
    label,
    options,
    value,
    onChange,
    errorMessage = "",
    status = "default", // 'default', 'error'
}) => {
    const isError = status === "error";

    return (
        <FormControl variant="outlined" fullWidth error={isError}>
            {label && <InputLabel>{label}</InputLabel>}
            <Select
                value={value}
                onChange={onChange}
                label={label}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: isError
                            ? paletteColors.error
                            : paletteColors.color_primary,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: isError
                            ? paletteColors.error
                            : paletteColors.color_primary,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: isError
                            ? paletteColors.error
                            : paletteColors.color_primary,
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {isError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

// Definición de PropTypes para control de tipos
BookSocialDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    status: PropTypes.oneOf(['default', 'error']),
};

export default BookSocialDropdown;
