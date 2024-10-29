import React from 'react';
import {TextField} from '@mui/material';
import PropTypes from 'prop-types';
import paletteColors from "../resources/palette";

const TextFieldButton = ({value, onChange, label, sx = {}}) => {
    return (
        <TextField
            label={label}
            type="password"
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            sx={{
                color: paletteColors.textColor,
                "&.Mui-focused": {
                    color: paletteColors.textColor,
                },
                '& .MuiInputLabel-root': {
                    color: paletteColors.textColor,
                    '&:hover .MuiInlinedInput-input': {color: 'white'}
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {borderColor: paletteColors.textColor},
                    '&:hover fieldset': {borderColor: paletteColors.textColor},
                    '&.Mui-focused fieldset': {borderColor: paletteColors.textColor},
                },
                '& .MuiOutlinedInput-input': {
                    color: 'white',
                },
                ...sx,
            }}
        />
    );
};

// PropTypes para una mejor validación de tipos
TextFieldButton.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    sx: PropTypes.object,
};

export default TextFieldButton;
