import React from 'react';
import PropTypes from 'prop-types';
import {Box, LinearProgress} from '@mui/material';
import paletteColors from "../resources/palette";
import BookSocialText from "./BookSocialText";

const BookSocialLinealRating = ({value = 0, total, title}) => {
    const progressPercentage = total > 0 ? (value / total) * 100 : 0;

    const progressText = progressPercentage.toFixed(0);

    return (
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', margin: 0}}>
            <Box sx={{marginRight: 2}}>
                <BookSocialText
                    level={"p"}
                    text={title}
                    color={paletteColors.textColorWeakest}
                />
            </Box>
            <LinearProgress
                variant="determinate"
                value={Math.min(Math.max(progressPercentage, 0), 100)}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    flexGrow: 1,
                    backgroundColor: paletteColors.textColor_weakest,
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: paletteColors.secondary,
                    },
                }}
            />
            <Box sx={{marginLeft: 2}}>
                <BookSocialText
                    level={"small"}
                    text={`${progressText}%`}
                    color={paletteColors.textColor_weakest}
                />
            </Box>
        </Box>
    );
};

BookSocialLinealRating.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number,
    total: PropTypes.number.isRequired,
};

export default BookSocialLinealRating;
