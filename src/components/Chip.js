import React from 'react';
import PropTypes from 'prop-types';
import {Chip} from '@mui/material';
import paletteColors from "../resources/palette";

const BookSocialChip = ({size = 'sm', text}) => {
    const chipSize = size === 'md' ? {fontSize: '16px', padding: '8px 16px'} : {fontSize: '12px', padding: '6px 12px'};

    return (
        <Chip
            label={text}
            style={{
                ...chipSize,
                borderRadius: '32px',
                backgroundColor: paletteColors.color_primary,
                color: paletteColors.textColor,
                fontWeight: 'bold',
                textTransform: 'capitalize',
            }}
        />
    );
};

// PropTypes para validación
BookSocialChip.propTypes = {
    size: PropTypes.oneOf(['sm', 'md']),
    text: PropTypes.string.isRequired,
};

export default BookSocialChip;
