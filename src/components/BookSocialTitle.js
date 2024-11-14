import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';
import paletteColors from "../resources/palette";

const BookSocialTitle = ({level, text, color = paletteColors.textColor, textAlign = 'center'}) => {
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
                textAlign: textAlign, // Apply text alignment
            }}
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
    textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']), // Text alignment
};

export default BookSocialTitle;
