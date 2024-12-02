import React, {useRef, useState} from 'react';
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import defaultbook from '../assets/books/DefaultBook.jpg';
import BookSocialTextField from '../components/BookSocialTextField';
import BookSocialPrimaryButton from '../components/BookSocialPrimaryButton';
import BookSocialGenereSelector from '../components/BookSocialGenereSelector';
import BookSocialLargeTextField from '../components/BookSocialLargeTextField';
import paletteColors from '../resources/palette';


const genresList = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Thriller', 'Non-fiction'];

const NewBook = () => {
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [isbn, setIsbn] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const fileInputRef = useRef(null);

    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [synopsisError, setSynopsisError] = useState('');
    const [genresError, setGenresError] = useState('');
    const [publishDateError, setPublishDateError] = useState('');
    const [isbnError, setIsbnError] = useState('');
    const [imageError, setImageError] = useState('');

    const [openPopup, setOpenPopup] = useState(false); // Controla la visibilidad del popup
    const [popupMessage, setPopupMessage] = useState(''); // Mensaje del popup

    const [openSuccessPopup, setOpenSuccessPopup] = useState(false); // Success popup state
    const [successMessage, setSuccessMessage] = useState(''); // Success popup message

    const [openConnectionErrorPopup, setOpenConnectionErrorPopup] = useState(false); // Connection error popup state
    const [connectionErrorMessage, setConnectionErrorMessage] = useState(''); // Connection error message

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (e.target.value.length > 200) {
            setTitleError('The title cannot exceed 200 characters.');
        } else {
            setTitleError('');
        }
    };

    const handleAuthorsChange = (e) => {
        const value = e.target.value;
        setAuthors(value);

        // Limpiar el error si el usuario comienza a escribir
        if (value.trim()) {
            setAuthorError('');
        }
    };


    const handleSynopsisChange = (e) => {
        const value = e.target.value;
        setSynopsis(value);

        // Limpiar el error si el usuario comienza a escribir
        if (value.trim()) {
            setSynopsisError('');
        }
    };


    const handleGenreChange = (newGenres) => {
        setSelectedGenres(newGenres);

        // Limpiar el error si se seleccionan géneros
        if (newGenres.length > 0) {
            setGenresError('');
        }
    };


    const handlePublishDateChange = (e) => {
        const selectedDate = e.target.value;
        const today = new Date(); // Current date and time
        const currentDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        setPublishDate(selectedDate);

        // Check if the date is in the future
        if (selectedDate > currentDate) {
            setPublishDateError('The publish date cannot be in the future.');
        } else {
            setPublishDateError(''); // Clear error if the date is valid
        }
    };


    const validateISBN = (value) => {
        // Expresión regular para ISBN-10
        const isbn10Pattern = /^(?:\d{9}[\dX]|\d{10})$/;
        // Expresión regular para ISBN-13
        const isbn13Pattern = /^(?:\d{13})$/;

        if (!value) {
            // Si está vacío, no se considera un error (porque es opcional)
            return '';
        }

        if (isbn10Pattern.test(value) || isbn13Pattern.test(value)) {
            return ''; // Si es un ISBN válido
        }

        return 'ISBN not valid';
    };

    const handleIsbnChange = (e) => {
        const value = e.target.value;
        setIsbn(value);
        const error = validateISBN(value);
        setIsbnError(error);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validar formato
            const validFormats = ['image/png', 'image/jpeg']; // PNG o JPG
            if (!validFormats.includes(file.type)) {
                setImageError('Only PNG or JPG files');
                setCoverImage(null); // Restablecer la imagen cargada
                return;
            }

            // Validar tamaño (máximo 10MB)
            if (file.size > 10 * 1024 * 1024) {  // 10MB en bytes
                setImageError('Maximum size of 10MB');
                setCoverImage(null); // Restablecer la imagen cargada
                return;
            }

            setImageError(''); // Reset error message
            if (coverImage) {
                URL.revokeObjectURL(coverImage);
            }
            const imageUrl = URL.createObjectURL(file); // Create temporary URL for the image
            setCoverImage(imageUrl); // Set the image preview
        }
    };

    const handleButtonImageClick = () => {
        // Trigger file input when the button is clicked
        fileInputRef.current.click();
    };


    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Validar campos y asignar errores si faltan
        let hasErrors = false;

        if (!title.trim()) {
            setTitleError('Title is required.');
            hasErrors = true;
        }

        if (!authors.trim()) {
            setAuthorError('Author(s) are required.');
            hasErrors = true;
        }

        if (!synopsis.trim()) {
            setSynopsisError('Synopsis is required.');
            hasErrors = true;
        }

        if (!selectedGenres.length) {
            setGenresError('At least one genre must be selected.');
            hasErrors = true;
        }

        if (!publishDate.trim()) {
            setPublishDateError('Publish date is required.');
            hasErrors = true;
        } else if (publishDateError) {
            hasErrors = true; // Si ya hay un error en la fecha, considerarlo
        }

        if (isbn && isbnError) {
            hasErrors = true; // Si el ISBN no es válido, detener el flujo
        }

        // Detener el flujo si hay errores
        if (hasErrors) {
            setPopupMessage('Please fix the errors and try again.');
            setOpenPopup(true);
            setIsSubmitting(false);
            return;
        }

        // Simulación de envío exitoso
        setSuccessMessage('Book registered successfully!');
        setOpenSuccessPopup(true);
        setIsSubmitting(false);
        /*
            try {
                const response = await fetch('/api/registerBook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title,
                        authors,
                        synopsis,
                        selectedGenres,
                        publishDate,
                        isbn,
                        coverImage,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send data to the backend');
                }

                setSuccessMessage('Book registered successfully!');
                setOpenSuccessPopup(true);
            } catch (error) {
                setConnectionErrorMessage('There was a connection issue. The book could not be sent.');
                setOpenConnectionErrorPopup(true);
            } finally {
                setIsSubmitting(false);
            }*/
    };


    const handleCloseConnectionErrorPopup = () => {
        setOpenConnectionErrorPopup(false);
    };

    const handleCloseSuccessPopup = () => {
        setOpenSuccessPopup(false);
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {xs: 'column', md: 'row'},
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px',
                marginLeft: '50px',
                width: {xs: '100%', sm: '90%', md: '80%'},
                overflow: 'auto', // Habilita el scroll si es necesario
            }}
        >

            {/* Imagen del libro */}
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <img
                    src={coverImage || defaultbook}
                    alt="book cover"
                    style={{
                        width: '100%',
                        maxWidth: '300px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                />
                {/* Campo para cargar la imagen de portada */}
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px'}}>
                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageChange}
                        style={{display: 'none'}} // Hide the input, but it's still accessible
                    />

                    {/* Upload Button */}
                    <BookSocialPrimaryButton
                        buttonText="Upload Cover Image"
                        onClick={handleButtonImageClick} // Trigger file input click
                        isExpanded={false}
                        bgColor={paletteColors.color_primary} // Use your desired background color
                    />
                </Box>
            </Box>

            {/* Formulario */}
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '800px', // Ajusta el tamaño máximo
                    padding: '20px',
                    flexWrap: 'wrap',
                }}
            >
                <Typography variant="h4" sx={{marginBottom: '20px', color: 'white'}}>
                    Register a New Book
                </Typography>
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    {/* Title Field */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialTextField
                            label="Title"
                            value={title}
                            onChange={handleTitleChange}
                            required={true}
                            maxLength={200}
                            status={titleError ? 'error' : 'default'}
                            errorMessage={titleError}
                        />
                    </div>
                    {/* Authors Field */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialTextField
                            label="Authors (separate by commas)"
                            value={authors}
                            onChange={handleAuthorsChange}
                            required={true}
                            status={authorError ? 'error' : 'default'}
                            errorMessage={authorError}
                        />
                    </div>
                    {/* Synopsis Field */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialLargeTextField
                            label="Synopsis"
                            value={synopsis}
                            onChange={handleSynopsisChange}
                            required={true}
                            status={synopsisError ? 'error' : 'default'}
                            errorMessage={synopsisError}
                            rows={3} // Set the desired number of rows
                        />

                    </div>

                    {/* Genres Field */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialGenereSelector
                            genres={genresList}
                            selectedGenres={selectedGenres}
                            onGenreChange={handleGenreChange}
                        />
                    </div>

                    {/* Publish Date Field */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialTextField
                            label="Publish Date"
                            type="date"
                            value={publishDate}
                            onChange={handlePublishDateChange}
                            required={true}
                            status={publishDateError ? 'error' : 'default'}
                            errorMessage={publishDateError} // Display the error message
                            isDate={true}
                        />
                    </div>

                    {/* ISBN Field*/}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialTextField
                            label="ISBN"
                            value={isbn}
                            onChange={handleIsbnChange}
                            errorMessage={isbnError}
                            status={isbnError ? 'error' : 'default'}
                        />

                    </div>
                    <Typography variant="body2" color={paletteColors.textColor}
                                sx={{marginTop: '8px', textAlign: 'left'}}>
                        * Required field
                    </Typography>

                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialPrimaryButton
                            buttonText={isSubmitting ? 'Submitting...' : 'Submit'}
                            onClick={handleSubmit}
                            isExpanded={false}
                            bgColor={paletteColors.color_primary}
                            disabled={isSubmitting}
                        />
                    </div>

                </form>
            </Box>

            {/* Popup de Errores */}
            <Dialog open={openPopup} onClose={() => setOpenPopup(false)}
                    PaperProps={{
                        sx: {
                            backgroundColor: paletteColors.color_primary_weak, // Cambia a tu color deseado
                            color: paletteColors.textColor, // Cambia el color del texto si es necesario
                        },
                    }}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>{popupMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <BookSocialPrimaryButton buttonText={'Close'} onClick={() => setOpenPopup(false)}
                                             bgColor={paletteColors.color_primary}/>
                </DialogActions>
            </Dialog>
            {/* Success Popup */}
            <Dialog
                open={openSuccessPopup}
                onClose={handleCloseSuccessPopup}
                PaperProps={{
                    sx: {
                        backgroundColor: paletteColors.color_primary_weak,
                        color: paletteColors.textColor,
                    },
                }}
            >
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography>{successMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <BookSocialPrimaryButton
                        buttonText={'Confirm'}
                        onClick={handleCloseSuccessPopup}
                        bgColor={paletteColors.color_primary}
                    />
                </DialogActions>
            </Dialog>

            {/* Connection Error Popup */}
            <Dialog
                open={openConnectionErrorPopup}
                onClose={handleCloseConnectionErrorPopup}
                PaperProps={{
                    sx: {
                        backgroundColor: paletteColors.color_primary_weak,
                        color: paletteColors.textColor,
                    },
                }}
            >
                <DialogTitle>Connection Error</DialogTitle>
                <DialogContent>
                    <Typography>{connectionErrorMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <BookSocialPrimaryButton
                        buttonText="Close"
                        onClick={handleCloseConnectionErrorPopup}
                        bgColor={paletteColors.color_primary}
                    />
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NewBook;
