import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';
import paletteColors from "../resources/palette";

const BookSocialText = ({level, text, color = paletteColors.textColor, style = {}, sx = {}}) => {
    // Define font sizes for each text level
    const fontSizes = {
        p: '1rem', // Paragraph
        small: '0.875rem', // Small text
        large: '1.25rem', // Larger text
    };

    // Function to process Markdown-like syntax for bold, italic, line breaks, and bullet points
    const processText = (text) => {
        // Split the text into parts
        const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|__.*?__|_.*?_|\~.*?(\n|$))/g);

        let bulletList = []; // To hold all bullet point items

        return parts.map((part, index) => {
            // Ensure that part is a string before calling `startsWith`
            if (typeof part !== 'string') return part; // If it's not a string, return as is
            
            // Handle newlines by converting them to <br /> elements
            if (part.includes('\n')) {
                const textWithBreaks = part.split('\n').map((line, i) => (
                    <React.Fragment key={`${index}-${i}`}>
                        {i > 0 && <br/>}
                        {line}
                    </React.Fragment>
                ));
                return textWithBreaks;
            }

            // Handle bold text
            if (part.startsWith('**') || part.startsWith('__')) {
                return <strong key={index} style={{fontWeight: 'bold'}}>{part.replace(/\*\*|\_\_/g, '')}</strong>;
            }
            // Handle italic text
            if (part.startsWith('*') || part.startsWith('_')) {
                return <em key={index} style={{fontStyle: 'italic'}}>{part.replace(/\*|\_/g, '')}</em>;
            }

            // Return regular text if no special formatting is applied
            return part;
        })
            .concat(
                bulletList.length > 0 ? (
                    <ul style={{paddingLeft: '20px', marginTop: '4px', marginBottom: '0px', listStyleType: 'disc'}}>
                        {bulletList}
                    </ul>
                ) : null // Reduce margin and padding for the list
            );
    };

    // Determine the appropriate text level and size
    const variant = level === 'large' ? 'body1' : level === 'small' ? 'body2' : 'body1';

    return (
        <Typography
            variant={variant}
            style={{
                color: color,
                fontSize: fontSizes[level] || fontSizes.p, // Default to paragraph size if level is not found
                fontFamily: 'Roboto',
                ...style, // Merge any additional custom styles passed in `style`
            }}
            sx={sx} // Allow passing additional styles using sx
        >
            {processText(text)} {/* Render the processed text with Markdown-like formatting */}
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
    style: {},
    sx: {},
};

export default BookSocialText;
