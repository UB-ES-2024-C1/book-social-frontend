import React, {useState} from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../assets/no_image_available.png';
import {Skeleton} from '@mui/material';

const BookSocialImage = ({url, size = 'sm'}) => {
    const [isLoading, setIsLoading] = useState(true);

    let dimensions;

    switch (size) {
        case 'lg':
            dimensions = {width: '250px', height: '300px'};
            break;
        case 'md':
            dimensions = {width: '150px'};
            break;
        case 'sm':
        default:
            dimensions = {width: '100px', height: '100px'};
            break;
    }

    const imageUrl = url ? new URL(url) : defaultImage;

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <Skeleton
                    variant="rectangular"
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{
                        borderRadius: '24px',
                        backgroundColor: '#e0e0e0',
                    }}
                />
            )}
            <img
                src={imageUrl}
                alt="Book"
                style={{
                    ...dimensions,
                    borderRadius: '24px',
                    objectFit: 'cover',
                    display: isLoading ? 'none' : 'block',
                }}
                onLoad={handleImageLoad}
            />
        </>
    );
};

BookSocialImage.propTypes = {
    url: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default BookSocialImage;
