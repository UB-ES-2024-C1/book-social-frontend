import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Rating,
    Skeleton,
    Tooltip,
    Typography
} from '@mui/material';
import paletteColors from "../resources/palette";
import {useNavigate} from "react-router-dom";
import useSavedBooks from "../hooks/saved_books"; // Importa el icono de "guardado"

const truncateText = (text) => {
    const maxLength = 87;
    const defaultText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    const textToUse = text || defaultText;

    if (textToUse.length > maxLength) {
        return textToUse.slice(0, maxLength) + '...';
    }
    return textToUse;
};

const CardvisualizeBook = ({id, image, title, author, summary, genre, rating}) => {
    const navigate = useNavigate();
    const [isImageLoading, setIsImageLoading] = useState(true);
    const {loading, saveBook, isBookSaved} = useSavedBooks();

    const goToDetails = () => {
        console.log('Card clicked');
        navigate(`/book-details/${(id ?? 1).toString().trim()}`);
    };

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };
    
    // Imagen predeterminada
    const defaultImage = "https://terracehospice.org/wp-content/uploads/2024/05/default_book_cover_2015.jpg";

    // Verificar si la imagen es base64 y añadir el prefijo adecuado
    const isBase64 = (str) => {
        return str && (str.startsWith('data:image/') || str.startsWith('data:image;base64,'));
    };

    // Función para verificar si una cadena es una URL válida
    const isValidUrl = (str) => {
        try {
            new URL(str); // Intenta crear un objeto URL
            return true;
        } catch (_) {
            return false;
        }
    };

    // Función para añadir el prefijo de base64 adecuado si es necesario
    const formatBase64Image = (image) => {
        if (image && !isBase64(image)) {
            return `data:image/jpeg;base64,${image}`; // Aquí puedes ajustarlo si no es JPEG
        }
        return image;
    };

    // Manejo de la imagen
    let imageUrl = defaultImage; // Valor predeterminado

    if (image) {
        if (isValidUrl(image)) {
            imageUrl = image; // Si es una URL válida, usamos la URL directamente
        } else {
            // Si no es una URL, la tratamos como base64
            imageUrl = formatBase64Image(image);
        }
    }

    //TODO change to save with the api of save
    const saveForLater = (event) => {
        event.stopPropagation();
        saveBook(id)
        console.log(`Book with ID ${id} saved for later`);
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
                {isImageLoading && (
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
                        display: isImageLoading ? 'none' : 'block',
                    }}
                    image={imageUrl}
                    alt={`${title} cover`}
                    onLoad={handleImageLoad}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                        WebkitLineClamp: 2,
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

                <Button
                    variant="contained"
                    color={isBookSaved(id) ? 'success' : 'primary'}
                    onClick={saveForLater}
                    sx={{
                        mt: 1,
                        alignSelf: 'flex-end',
                        fontSize: '0.8rem',
                        textTransform: 'none',
                        backgroundColor: isBookSaved(id) ? '#4caf50' : paletteColors.color_primary,
                        position: 'relative',
                        minWidth: '120px',
                        height: '40px',
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute'
                            }}
                        />
                    ) : (
                        <>
                            {isBookSaved(id) ? 'Saved' : 'Save'}
                        </>
                    )}
                </Button>


            </Box>
        </Card>
    );
};

export default CardvisualizeBook;
