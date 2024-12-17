import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import paletteColors from "../resources/palette";

const BookSocialLargeTextField = ({
    value,
    onChange,
    label,
    type = "text",
    minLength,
    maxLength,
    sx = {},
    errorMessage = "",
    status = "default", // 'default', 'error', or 'success'
    required = false,
    rows = 4, // Default rows to 4, but can be adjusted as needed
    dataTestId,
}) => {
    const isError = status === "error";
    const isSuccess = status === "success";

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                multiline // Enables multi-line input (for longer text like synopsis)
                rows={rows} // Number of rows for the text area
                data-testid={dataTestId}
                slotProps={{
                    inputLabel: {
                        shrink: true, // Apply shrink style to the label
                    },
                    input: {
                        maxLength: maxLength, // Limit character length
                    },
                }}
                sx={{
                    color: paletteColors.textColor,
                    '& .MuiInputLabel-root': {
                        color: isError ? 'red' : isSuccess ? 'green' : paletteColors.textColor,
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:hover .MuiOutlinedInput-input': { color: paletteColors.textColor },
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

// PropTypes for better type validation
BookSocialLargeTextField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    sx: PropTypes.object,
    errorMessage: PropTypes.string,
    status: PropTypes.oneOf(['default', 'error', 'success']),
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    dataTestId: PropTypes.string,
    rows: PropTypes.number, // Defines the number of rows for the text field
};

export default BookSocialLargeTextField;
