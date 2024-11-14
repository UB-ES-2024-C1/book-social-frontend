import React from 'react';
import {Box, Card, CardContent, CardMedia, Rating, Typography} from '@mui/material';
import bookImage from '../assets/books/book1.jpg';
import paletteColors from "../resources/palette";


const CardvisualizeBook = ({image, title, author, summary, rating}) => {
    return (
        <Card sx={{
            fontFamily: 'Roboto, Arial, sans-serif',
            display: 'flex',
            borderRadius: 10,
            boxShadow: 3,
            maxWidth: 500,
            backgroundImage: 'linear-gradient(135deg, #1B1B33 0%, #1E1C4A 100%)',
        }}>
            <CardMedia
                component="img"
                sx={{width: 150, padding: 1.5, borderRadius: 10,}}
                image={bookImage}
                alt={`${title} cover`}
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 2,
                flex: 1,
            }}>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{color: 'white'}}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{color: paletteColors.color_primary}}>
                        by {author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{my: 1, color: 'white'}}>
                        {summary}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'right', alignItems: 'center', mt: 2, color: 'white'}}>
                        <Rating
                            value={rating}
                            precision={0.5}
                            readOnly
                            sx={{
                                color: '#FFD700',
                                '& .MuiRating-icon': {
                                    WebkitTextStroke: 'white',
                                },
                            }}
                        /> <Typography variant="body2" color="white" sx={{ml: 1, color: 'white'}}>
                        {rating}
                    </Typography>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CardvisualizeBook;
