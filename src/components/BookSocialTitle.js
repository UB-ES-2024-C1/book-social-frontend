import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';
import paletteColors from "../resources/palette";

const BookSocialTitle = ({level, text, color, style, sx}) => {
    // Define font sizes for each heading level
    const fontSizes = {
        h1: '6rem', // Adjust the sizes as needed
        h2: '3rem',
        h3: '2rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
    };

    // Determine the appropriate heading level and size
    const variant = `h${level}`; // Material-UI Typography variant

    return (
        <Typography
            variant={variant}
            style={{
                color: color,
                fontSize: fontSizes[`h${level}`] || fontSizes.h2, // Default to h2 if level is not found
                fontFamily: 'Montserrat',
                ...style, // Apply any additional styles passed in
            }}
            sx={sx} // Apply additional styles using sx prop
        >
            {text} {/* Render the text passed as a prop */}
        </Typography>
    );
};

// Define prop types
BookSocialTitle.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired, // Only allow heading levels 1 to 6
    text: PropTypes.string.isRequired, // Text to display
    color: PropTypes.string, // Optional color
    style: PropTypes.object, // Optional additional styles
    sx: PropTypes.object, // Optional additional styles using sx
};

BookSocialTitle.defaultProps = {
    color: paletteColors.textColor, // Default color
    style: {}, // Default to an empty object for style
    sx: {}, // Default to an empty object for sx
};

export default BookSocialTitle;
