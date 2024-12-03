import React, {useRef, useState} from 'react';
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import defaultbook from '../assets/books/DefaultBook.jpg';
import BookSocialTextField from '../components/BookSocialTextField';
import BookSocialPrimaryButton from '../components/BookSocialPrimaryButton';
import BookSocialGenereSelector from '../components/BookSocialGenereSelector';
import BookSocialLargeTextField from '../components/BookSocialLargeTextField';
import paletteColors from '../resources/palette';
import useProfile from '../hooks/profile/profile';
import api from '../services/api';


const genresList = ['Fantasy', 'Fiction', 'Romance', 'NonFiction', 'Poetry', 'Science', 'Nature', 'Theatre', 'Comedy'];

const NewBook = () => {
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [isbn, setIsbn] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const fileInputRef = useRef(null);
    const [edition, setEdition] = useState('');
    const [publisher, setPublisher] = useState('');
    const {profile, loading, error, fetchProfile} = useProfile();

    const [titleError, setTitleError] = useState('');
    const [languageError, setLanguageError] = useState('');
    const [synopsisError, setSynopsisError] = useState('');
    const [genresError, setGenresError] = useState('');
    const [publishDateError, setPublishDateError] = useState('');
    const [isbnError, setIsbnError] = useState('');
    const [imageError, setImageError] = useState('');
    const [editionError, setEditionError] = useState('');
    const [publisherError, setPublisherError] = useState('');

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

    const handleLanguageChange = (e) => {
        const value = e.target.value;
        setLanguage(value);

        if (value.trim()) {
            setLanguageError('');
        }
    }


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

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const validFormats = ['image/png', 'image/jpeg'];
            if (!validFormats.includes(file.type)) {
                setImageError('Only PNG or JPG files are allowed');
                setCoverImage(null);
                return;
            }
    
            if (file.size > 10 * 1024 * 1024) {
                setImageError('Maximum size of 10MB exceeded');
                setCoverImage(null);
                return;
            }
    
            setImageError('');
            try {
                const base64 = await convertToBase64(file); // Convertir a Base64
                setCoverImage(base64); // Guardar la representación Base64
            } catch (error) {
                console.error('Error converting image to Base64:', error);
            }
        }
    };
    

    const handleEditionChange = (e) => {
        const value = e.target.value;
        setEdition(value);

        // Limpiar el error si el usuario comienza a escribir
        if (value.trim()) {
            setEditionError('');
        }
    };
    const handlePublisherChange = (e) => {
        const value = e.target.value;
        setPublisher(value);

        // Limpiar el error si el usuario comienza a escribir
        if (value.trim()) {
            setPublisherError('');
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

        if(!language.trim()) {
            setLanguageError('Language is required.')
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

        if(!isbn.trim()) {
            setIsbnError('ISBN is required.');
            hasErrors = true;
        } else if (isbn && isbnError) {
            hasErrors = true;
        }

        // Detener el flujo si hay errores
        if (hasErrors) {
            setPopupMessage('Please fix the errors and try again.');
            setOpenPopup(true);
            setIsSubmitting(false);
            return;
        }

        let base64Image = coverImage;

        // Si no hay imagen cargada, convertir la default a Base64
        if (!coverImage) {
            try {
                const response = await fetch(defaultbook); // Fetch del archivo local
                const blob = await response.blob(); // Convertirlo a Blob
                base64Image = await convertToBase64(blob); // Convertir a Base64
            } catch (error) {
                console.error('Error converting default image to Base64:', error);
            }
        }


        const postData = {
            title,
            author: parseInt(profile.id, 10),
            publication_date: new Date(publishDate).toISOString().split('T')[0],
            genres: selectedGenres || [],
            categories: ["default"],
            synopsis: synopsis || "No synopsis available.",
            image_url: null,
            publisher: publisher || "Unknown",
            ISBN: isbn || "Unknown",
            edition: edition && edition.length >= 1 && edition.length <= 50 ? edition : "Unknown",
            language: language || "Unknown",
            num_pages: 100,
            externalRating: 4,

        };

        

        try {
            // Realizar la solicitud POST usando la instancia de axios
            const response = await api.post('/books', postData);
        
            // Mostrar un popup de éxito si todo funciona bien
            setSuccessMessage('Book registered successfully!');
            setOpenSuccessPopup(true);
        
            // Resetear el formulario
            setTitle('');
            setPublishDate('');
            setSelectedGenres([]);
            setSynopsis('');
            setCoverImage(null);
            setPublisher('');
            setIsbn('');
            setEdition('');
            setLanguage('');
            
        } catch (error) {
            // Manejo de errores
            if (error.response) {
                // Error de respuesta del servidor
                console.error('Error en la respuesta del backend:', error.response.data);
                setConnectionErrorMessage('There was an issue. The book could not be registered.');
            } else if (error.request) {
                // Error de la solicitud (no hubo respuesta)
                console.error('Error en la solicitud:', error.request);
                setConnectionErrorMessage('There was a connection issue. The book could not be registered.');
            } else {
                // Otros errores
                console.error('Error:', error.message);
                setConnectionErrorMessage('An unexpected error occurred.');
            }
        
            setOpenConnectionErrorPopup(true);
        } finally {
            setIsSubmitting(false); // Rehabilitar el botón de envío
        }
        

        
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

                    {/* Language Field */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialTextField
                            label="Language"
                            value={language}
                            onChange={handleLanguageChange}
                            required={true}
                            status={languageError ? 'error' : 'default'}
                            errorMessage={languageError}
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
                            required={true}
                            errorMessage={isbnError}
                            status={isbnError ? 'error' : 'default'}
                        />
                    </div>
                    {/* Edition Field*/}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialTextField
                            label="Edition"
                            value={edition}
                            onChange={handleEditionChange}
                            errorMessage={editionError}
                            status={editionError ? 'error' : 'default'}
                        />
                    </div>

                    {/* Publisher Field*/}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px'}}>
                        <BookSocialTextField
                            label="Publisher"
                            value={publisher}
                            onChange={handlePublisherChange}
                            errorMessage={publisherError}
                            status={publisherError ? 'error' : 'default'}
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
