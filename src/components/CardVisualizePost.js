import React from 'react';
import { Box, Card, CardContent, Avatar, Tooltip, Typography, CardMedia } from '@mui/material';
import paletteColors from "../resources/palette";

const CardVisualizePost = ({ authorName, authorImage, username, title, content, image }) => {
    const imageUrl = Array.isArray(image) && image.length > 1 ? `${image[0]},${image[1]}` : null;

    return (
        <Card sx={{
            fontFamily: 'Roboto, Arial, sans-serif',
            borderRadius: 10,
            boxShadow: 3,
            backgroundColor: '#1B1B33',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
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
                        @{username}
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
                    textAlign: 'left',
                }}>
                    {content}
                </Typography>
            </Box>
            {/* Mostrar la imagen si existe */}
            {imageUrl && (
                <Box sx={{ position: 'relative', padding: '16px 16px' }}>
                    <CardMedia
                        component="img"
                        sx={{
                            display: 'block',
                            borderRadius: 10,
                            width: '100%',
                            maxHeight: 180,
                            objectFit: 'contain',
                        }}
                        image={imageUrl}
                    />
                </Box>
            )}
        </Card>
    );
};

export default CardVisualizePost;
