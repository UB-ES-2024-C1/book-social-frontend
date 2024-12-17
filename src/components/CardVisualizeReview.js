import React, {useState} from 'react';
import {Avatar, Box, Card, CardContent, Tooltip, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import BookSocialRating from "./Rating";

const CardVisualizeReview = ({review}) => {
    const [isLoading, setIsLoading] = useState(true);

    const {rating, comment, authorName, authorImage, authorUsername} = review;

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <Card sx={{
            fontFamily: 'Roboto, Arial, sans-serif',
            borderRadius: 10,
            boxShadow: 3,
            backgroundColor: '#1B1B33',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 2, // Agrega padding alrededor de toda la tarjeta
        }}>
            <CardContent sx={{display: 'flex', alignItems: 'flex-start', padding: 0}}>
                <Box sx={{display: 'flex', alignItems: 'center', marginRight: 2}}>
                    <Avatar alt={authorName} src={authorImage} sx={{width: 40, height: 40, marginRight: 1}}/>
                    <Tooltip title={authorName} placement="top" arrow>
                        <Typography variant="subtitle1" component="div" sx={{color: 'white', fontWeight: 'bold'}}>
                            {authorName}
                        </Typography>
                    </Tooltip>
                    <Typography variant="body2" sx={{color: 'gray', marginLeft: 1}}>
                        @{authorUsername}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', padding: '10px'}}>
                <BookSocialRating value={rating}/>
                <Typography variant="body2" sx={{
                    my: 1,
                    color: paletteColors.textColor_weakest,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    textAlign: 'left',
                }}>
                    {comment ? comment : "No opinion provided."}
                </Typography>
            </Box>
        </Card>
    );
};

export default CardVisualizeReview;
