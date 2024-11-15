import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import defaultbook from '../assets/books/DefaultBook.jpg';
import BookSocialTextField from '../components/BookSocialTextField';
import BookSocialPrimaryButton from '../components/BookSocialPrimaryButton';
import paletteColors from '../resources/palette';

const NewBook = () => {
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [genres, setGenres] = useState([]);
    const [publishDate, setPublishDate] = useState('');
    const [isbn, setIsbn] = useState('');
    const [coverImage, setCoverImage] = useState(null);

    const [error, setError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [synopsisError, setSynopsisError] = useState('');
    const [genresError, setGenresError] = useState('');
    const [publishDateError, setPublishDateError] = useState('');
    const [isbnError, setIsbnError] = useState('');
    const [imageError, setImageError] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (e.target.value.length > 200) {
            setError('The title cannot exceed 200 characters.');
        } else {
            setError('');
        }
    };

    const handleAuthorsChange = (e) => {
        setAuthors(e.target.value);
    };

    const handleSynopsisChange = (e) => {
        setSynopsis(e.target.value);
    };

    const handleGenresChange = (e) => {
        setGenres(e.target.value);
    };

    const handlePublishDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD

        setPublishDate(selectedDate);

        // Validar que la fecha no sea futura
        if (selectedDate > currentDate) {
            setPublishDateError('The publish date cannot be in the future');
        } else {
            setPublishDateError('');
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
        
        return 'El ISBN ingresado no es válido';
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
                setImageError('Solo se permiten archivos PNG o JPG');
                setCoverImage(null); // Restablecer la imagen cargada
                return;
            }

            // Validar tamaño (máximo 10MB)
            if (file.size > 10 * 1024 * 1024) {  // 10MB en bytes
                setImageError('El tamaño máximo de la imagen es 10MB');
                setCoverImage(null); // Restablecer la imagen cargada
                return;
            }

            setImageError(''); // Restablecer error si todo está bien
            const imageUrl = URL.createObjectURL(file); // Crear una URL temporal para la imagen
            setCoverImage(imageUrl); // Establecer la imagen cargada
        }
    };

    const handleSubmit = () => {
        // Validación de los campos
        if (!title) {
            setError('Title is required');
        } else if (title.length > 200) {
            setError('The title cannot exceed 200 characters.');
        } else if (!authors.trim()) {
            setAuthorError('At least one author is required');
        } else if (!synopsis.trim()) {
            setSynopsisError('Synopsis is required');
        } else if (genres.length === 0) {
            setGenresError('At least one genre is required');
        } else if (!publishDate) {
            setPublishDateError('Publish date is required');
        } else {
            // Reseteamos los errores
            setError('');
            setAuthorError('');
            setSynopsisError('');
            setGenresError('');
            setPublishDateError('');

            // Lógica para enviar los datos
            console.log('Book registered with title:', title);
            console.log('Authors:', authors);
            console.log('Synopsis:', synopsis);
            console.log('Genres:', genres);
            console.log('Publish Date:', publishDate);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px',
            }}
        >
            {/* Imagen del libro */}
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
            </Box>

            {/* Formulario */}
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '500px',
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    Register a New Book
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    {/* Title Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <BookSocialTextField
                            label="Title"
                            value={title}
                            onChange={handleTitleChange}
                            required={true}
                            maxLength={200}
                            status={error ? 'error' : 'default'}
                            errorMessage={error}
                            sx={{ marginTop: '16px' }}
                        />
                    </div>
                    {/* Authors Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <BookSocialTextField
                            label="Authors (separate by commas)"
                            value={authors}
                            onChange={handleAuthorsChange}
                            required={true}
                            status={authorError ? 'error' : 'default'}
                            errorMessage={authorError}
                            sx={{ marginTop: '16px' }}
                        />
                    </div>
                    {/* Synopsis Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <BookSocialTextField
                            label="Synopsis"
                            value={synopsis}
                            onChange={handleSynopsisChange}
                            required={true}
                            status={synopsisError ? 'error' : 'default'}
                            errorMessage={synopsisError}
                            sx={{ marginTop: '16px'}} // Estilo para hacer el campo más grande
                        />
                    </div>
                    {/* Genres Field */}
                    
                    {/* Publish Date Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <BookSocialTextField
                            label="Publish Date"
                            type="date"
                            value={publishDate}
                            onChange={handlePublishDateChange}
                            required = {true}
                            errorMessage={publishDateError ? 'error' : 'default'}
                            sx={{ marginTop: '16px'}}
                            isDate= {true}
                        />
                    </div>
                    {/* ISBN Field*/}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                        <BookSocialTextField
                            label="ISBN"
                            value={isbn}
                            onChange={handleIsbnChange}
                            errorMessage={isbnError}
                            status={isbnError ? 'error' : 'default'}
                        />

                    </div>
                    {/* Campo para cargar la imagen de portada */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                        <input 
                            type="file" 
                            accept=".png, .jpg, .jpeg" 
                            onChange={handleImageChange} 
                            style={{ marginBottom: '10px' }}
                        />
                        {imageError && <div style={{ color: 'red', marginTop: '5px' }}>{imageError}</div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                        <BookSocialPrimaryButton 
                            buttonText={'Submit'} 
                            onClick={handleSubmit} 
                            isExpanded={false}
                            bgColor={paletteColors.color_primary}
                        />
                    </div>
                </form>
            </Box>
        </Box>
    );
};

export default NewBook;
