import React from 'react';
import PropTypes from 'prop-types';
import {Box, Rating} from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import paletteColors from "../resources/palette";
import BookSocialText from "./BookSocialText";

const labels = {
    0.5: 'Terrible',
    1: 'Very Bad',
    1.5: 'Bad',
    2: 'Below Average',
    2.5: 'Average',
    3: 'Good',
    3.5: 'Very Good',
    4: 'Great',
    4.5: 'Excellent',
    5: 'Masterpiece',
};


const BookSocialRating = ({value = 0, size = 'lg', numberRatings = null, showLabel = true}) => {
    const hoverSizeMap = {
        sm: 'small',
        md: 'medium',
        lg: 'large',
    };

    const roundedValue = Math.floor(value * 2) / 2;

    const getLabelText = (ratingValue) =>
        `${ratingValue} Star${ratingValue !== 1 ? 's' : ''}, ${labels[ratingValue]}`;

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.25}
                getLabelText={getLabelText}
                readOnly
                size={hoverSizeMap[size]}
                emptyIcon={<StarIcon style={{color: paletteColors.textColor_weakest, opacity: 0.55}}
                                     fontSize="inherit"/>}
            />
            {roundedValue !== null && showLabel && (
                <Box sx={{ml: 2}}>
                    <BookSocialText
                        level={"p"}
                        text={labels[roundedValue]}
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
