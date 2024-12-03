import React from 'react';
import {Button, Typography} from '@mui/material';
import paletteColors from "../../resources/palette";
import PropTypes from 'prop-types';

const BookSocialPrimaryButton = ({
                                     buttonText,
                                     onClick,
                                     textColor = paletteColors.textColorWeakest,
                                     bgColor = paletteColors.color_primary,
                                     isExpanded = false,
                                     dataTestId,
                                 }) => {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            sx={{
                backgroundColor: bgColor,
                '&:hover': {backgroundColor: bgColor},
                borderRadius: isExpanded ? '24px' : '16px',
                padding: '16px',
                width: isExpanded ? '33.33%' : 'auto',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
            }}
            data-testid={dataTestId}
        >
            <Typography
                variant={isExpanded ? "h6" : "button"} // Adjust the typography size
                sx={{color: textColor, fontFamily: 'Roboto'}}
            >
                {buttonText}
            </Typography>
        </Button>
    );
};

// Adding PropTypes for better type checking
BookSocialPrimaryButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    textColor: PropTypes.string,
    bgColor: PropTypes.string,
    isExpanded: PropTypes.bool,
    dataTestId: PropTypes.string, 
};

export default BookSocialPrimaryButton;
