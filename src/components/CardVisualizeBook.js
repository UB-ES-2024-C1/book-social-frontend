import React from 'react';
import {Box, Card, CardContent, CardMedia, Rating, Tooltip, Typography} from '@mui/material';
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
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                textAlign: 'left',
                padding: 2,
                flex: 1,
                overflow: 'hidden',
            }}>
                <CardContent sx={{
                    flex: '1 0 auto',
                    padding: '25px',
                    textAlign: 'left',
                    cursor: 'pointer',
                }}>
                    <Tooltip title={title} placement="top" arrow>
                        <Typography variant="h6" component="div" sx={{
                            color: 'white',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', // Truncar con "..."
                            maxWidth: '100%',
                            fontSize: '1.1rem', // Ajustar tamaño de fuente
                        }}>
                            {title}
                        </Typography>
                    </Tooltip>
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
                        textAlign: 'justify',
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
                        justifyContent: 'flex-start',
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
