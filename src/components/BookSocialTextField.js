import React from 'react';
import {TextField, Typography} from '@mui/material'
import paletteColors from "../resources/palette";
import PropTypes from 'prop-types'


const BookSocialTextField = ({
    label,
    value,
    onChange,
    errorMessage = "",
    status = "default", // 'default', 'error', or 'success'
}) => {
    const isError = status === "error";

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                variant="outlined"
                error={isError}
                helperText={isError ? errorMessage : ""}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: isError ? 'red' : status === 'success' ? 'green' : 'default',
                        },
                        '&:hover fieldset': {
                            borderColor: isError ? 'darkred' : status === 'success' ? 'darkgreen' : 'default',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: isError ? 'red' : status === 'success' ? 'green' : 'default',
                        },
                    },
                }}
            />
        </div>
    );
};

// Adding PropTypes for type checking
BookSocialTextField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    status: PropTypes.oneOf(['default', 'error', 'success']),
};

export default BookSocialTextField;