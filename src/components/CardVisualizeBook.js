import React, {useState} from 'react';
import {Box, Card, CardContent, CardMedia, Rating, Skeleton, Tooltip, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import {useNavigate} from "react-router-dom";

const truncateText = (text) => {
    const maxLength = 87;
    const defaultText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    // Si el texto es nulo o undefined, usa el texto por defecto y trunca si es necesario
    const textToUse = text || defaultText;

    if (textToUse.length > maxLength) {
        return textToUse.slice(0, maxLength) + '...';
    }
    return textToUse;
};


const CardvisualizeBook = ({id, image, title, author, summary, genre, rating}) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const goToDetails = () => {
        console.log('Card clicked');
        navigate(`/book-details/${(id ?? 1).toString().trim()}`);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <Card sx={{
            fontFamily: 'Roboto, Arial, sans-serif',
            display: 'flex',
            borderRadius: 10,
            boxShadow: 3,
            width: 500,
            height: 250,
            backgroundImage: 'linear-gradient(135deg, #1B1B33 0%, #1E1C4A 100%)',
        }} onClick={goToDetails}>
            <Box sx={{position: 'relative', width: 150, height: '100%'}}>
                {isLoading && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{borderRadius: 10}}
                    />
                )}
                <CardMedia
                    component="img"
                    sx={{
                        width: 150,
                        padding: 1.5,
                        borderRadius: 10,
                        display: isLoading ? 'none' : 'block',
                    }}
                    image={image}
                    alt={`${title} cover`}
                    onLoad={handleImageLoad}
                />
            </Box>
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
                    textAlign: 'left',
                    cursor: 'pointer',
                }}>
                    <Tooltip title={title} placement="top" arrow>
                        <Typography variant="h6" component="div" sx={{
                            color: 'white',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%',
                            fontSize: '1.1rem',
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
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {truncateText(summary)}
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
