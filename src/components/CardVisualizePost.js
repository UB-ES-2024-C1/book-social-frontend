import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Avatar, Tooltip, Typography, Skeleton } from '@mui/material';
import paletteColors from "../resources/palette";

const CardVisualizePost = ({ authorName, authorImage, username, title, content, hashtags, image }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <Card sx={{
            fontFamily: 'Roboto, Arial, sans-serif',
            borderRadius: 10,
            boxShadow: 3,
            width: 600,
            backgroundColor: '#1B1B33',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 2, // Agrega padding alrededor de toda la tarjeta
        }}>
            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', padding: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                    <Avatar alt={authorName} src={authorImage} sx={{ width: 40, height: 40, marginRight: 1 }} />
                    <Tooltip title={authorName} placement="top" arrow>
                        <Typography variant="subtitle1" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {authorName}
                        </Typography>
                    </Tooltip>
                    <Typography variant="body2" sx={{ color: 'gray', marginLeft: 1 }}>
                        @{'johndoe'}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
                <Tooltip title={title} placement="top" arrow>
                    <Typography variant="h6" component="div" sx={{
                        color: 'white',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                        fontSize: '1rem',
                        alignSelf: 'flex-start',
                    }}>
                        {title}
                    </Typography>
                </Tooltip>
                <Typography variant="body2" sx={{
                    my: 1,
                    color: paletteColors.textColor_weakest,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    textAlign: 'left', // Alinear el contenido al inicio
                }}>
                    {content}
                </Typography>
                <Typography variant="body2" sx={{
                    color: paletteColors.color_primary,
                    alignSelf: 'flex-start', // Alinear el título al inicio
                }}>
                    {hashtags.join(' ')}
                </Typography>
            </Box>
            {/* Sección de la imagen */}
            {image && (
                <Box sx={{ position: 'relative', padding: '16px 16px' }}>
                    {isLoading && (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={150}
                            sx={{ borderRadius: 10 }}
                        />
                    )}
                    <CardMedia
                        component="img"
                        sx={{
                            display: isLoading ? 'none' : 'block',
                            borderRadius: 10,
                            width: '100%', // Ajusta el ancho de la imagen
                            maxHeight: 180,
                            objectFit: 'cover',
                        }}
                        image={image}
                        alt={`${title} image`}
                        onLoad={handleImageLoad}
                    />
                </Box>
            )}
        </Card>
    );
};

export default CardVisualizePost;
