import React from 'react';
import PropTypes from 'prop-types';
import {Box, Rating} from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import paletteColors from "../resources/palette";
import BookSocialText from "./BookSocialText";
import BookSocialTitle from "./BookSocialTitle";


const BookSocialRating = ({value = 0, size = 'lg', numberRatings = null, showLabel = true}) => {
    const hoverSizeMap = {
        sm: 'small',
        md: 'medium',
        lg: 'large',
    };

    const roundedValue = Math.floor(value * 2) / 2;

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.25}
                readOnly
                size={hoverSizeMap[size]}
                emptyIcon={<StarIcon style={{color: paletteColors.textColor_weakest, opacity: 0.55}}
                                     fontSize="inherit"/>}
            />
            {showLabel && (
                <Box sx={{ml: 2}}>
                    <BookSocialTitle
                        level={4}
                        text={value.toFixed(2)}
                        color={paletteColors.textColorWeakest}
                    />
                </Box>
            )}

            {numberRatings !== null && (
                <Box sx={{ml: 2}}>
                    <BookSocialText level={"small"} text={`${numberRatings} ratings`}
                                    color={paletteColors.textColor_weakest}/>
                </Box>
            )}
        </Box>
    );
};

BookSocialRating.propTypes = {
    value: PropTypes.number.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    numberRatings: PropTypes.number,
    showLabel: PropTypes.bool
};

export default BookSocialRating;
