import React from 'react';
import {TextField} from '@mui/material';
import PropTypes from 'prop-types';
import paletteColors from "../resources/palette";

const BookSocialTextField = ({
                                 value,
                                 onChange,
                                 label,
                                 type,
                                 minLength,
                                 maxLength,
                                 sx = {},
                                 errorMessage = "",
                                 status = "default", // 'default', 'error', or 'success'
                                 required = false, 
                                 isDate = false,
                                 dataTestId,

                             }) => {
    const isError = status === "error";
    const isSuccess = status === "success";

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
            <TextField
                label={label}
                type={type}
                variant="outlined"
                fullWidth
                value={value}
                onChange={onChange}
                error={isError}
                helperText={isError ? errorMessage : ""}
                required={required}
                slotProps={{
                    inputLabel: isDate ? {
                        shrink: true, // Aplica solo cuando es el campo "Publish Date"
                    } : {},
                    input: {
                        'data-testid': dataTestId,
                        maxLength: maxLength, // Limita la longitud de caracteres
                    }
                }}
                sx={{
                    color: paletteColors.textColor,
                    '& .MuiInputLabel-root': {
                        color: isError ? 'red' : isSuccess ? 'green' : paletteColors.textColor,
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:hover .MuiOutlinedInput-input': {color: paletteColors.textColor},
                        '& fieldset': {
                            borderColor: isError ? 'red' : isSuccess ? 'green' : 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: isError ? 'darkred' : isSuccess ? 'darkgreen' : paletteColors.textColor,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: isError ? 'red' : isSuccess ? 'green' : paletteColors.textColor,
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        color: paletteColors.textColor,
                    },
                    ...sx,
                }}
            />
        </div>
    );
};

// PropTypes para una mejor validación de tipos
BookSocialTextField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    sx: PropTypes.object,
    errorMessage: PropTypes.string,
    status: PropTypes.oneOf(['default', 'error', 'success']),
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    dataTestId: PropTypes.string,
};

export default BookSocialTextField;
