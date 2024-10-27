import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';
import paletteColors from "../resources/palette";

const BookSocialText = ({level, text, color, style, sx}) => {
    // Define font sizes for each text level
    const fontSizes = {
        p: '1rem', // Paragraph
        small: '0.875rem', // Small text
        large: '1.25rem', // Larger text
    };

    // Determine the appropriate text level and size
    const variant = level === 'large' ? 'body1' : level === 'small' ? 'body2' : 'body1';

    return (
        <Typography
            variant={variant}
            style={{
                color: color,
                fontSize: fontSizes[level] || fontSizes.p, // Default to paragraph size if level is not found
                fontFamily: 'Robotos',
                ...style, // Apply any additional styles passed in
            }}
            sx={sx} // Apply additional styles using sx prop
        >
            {text} {/* Render the text passed as a prop */}
        </Typography>
    );
};

// Define prop types
BookSocialText.propTypes = {
    level: PropTypes.oneOf(['small', 'p', 'large']).isRequired, // Only allow paragraph or size variations
    text: PropTypes.string.isRequired, // Text to display
    color: PropTypes.string, // Optional color
    style: PropTypes.object, // Optional additional styles
    sx: PropTypes.object, // Optional additional styles using sx
};

BookSocialText.defaultProps = {
    color: paletteColors.textColor, // Default color
    style: {}, // Default to an empty object for style
    sx: {}, // Default to an empty object for sx
};

export default BookSocialText;
