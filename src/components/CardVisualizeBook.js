import React from 'react';
import {Box, Card, CardContent, CardMedia, Rating, Typography} from '@mui/material';
import paletteColors from "../resources/palette";

const CardvisualizeBook = ({image, title, author, summary, rating}) => {
    return (
        <Card sx={{
            fontFamily: 'Roboto, Arial, sans-serif',
            display: 'flex',
            borderRadius: 10,
            boxShadow: 3,
            width: 500,
            height: 250,
            backgroundImage: 'linear-gradient(135deg, #1B1B33 0%, #1E1C4A 100%)',
        }}>
            <CardMedia
                component="img"
                sx={{
                    width: 150,
                    padding: 1.5,
                    borderRadius: 10,
                }}
                image={image}
                alt={`${title} cover`}
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: 2,
                flex: 1,
                overflow: 'hidden',
            }}>
                <CardContent sx={{flex: '1 0 auto', padding: '25px', textAlign: 'center', cursor: 'pointer'}}>
                    <Typography variant="h6" component="div" sx={{
                        color: 'white',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                    }}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{
                        color: paletteColors.color_primary,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                    }}>
                        by {author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                        my: 1,
                        color: paletteColors.textColor_weakest,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3, // Limitar a 3 líneas
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {summary}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        mt: 2,
                        color: 'white',
                    }}>
                        <Rating
                            value={rating}
                            precision={0.5}
                            readOnly
                            sx={{
                                color: '#FFD700',
                                '& .MuiRating-iconFilled': {
                                    color: '#FFD700',
                                    WebkitTextStroke: 'white',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: 'white',
                                }
                            }}
                        />
                        <Typography variant="body2" sx={{ml: 1, color: 'white'}}>
                            {rating}
                        </Typography>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CardvisualizeBook;
