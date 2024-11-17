import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../assets/no_image_available.png';

const BookSocialImage = ({url, size = 'sm'}) => {
    let dimensions;

    switch (size) {
        case 'lg':
            dimensions = {width: '250px', height: '300px'};
            break;
        case 'md':
            dimensions = {width: '200px', height: '200px'};
            break;
        case 'sm':
        default:
            dimensions = {width: '100px', height: '100px'};
            break;
    }

    const imageUrl = url ? new URL(url) : defaultImage;

    return (
        <img
            src={imageUrl}
            alt="Book"
            style={{
                ...dimensions,
                borderRadius: '24px',
                objectFit: 'cover',
            }}
        />
    );
};

BookSocialImage.propTypes = {
    url: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default BookSocialImage;
