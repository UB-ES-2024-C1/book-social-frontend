import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import defaultbook from '../assets/books/DefaultBook.jpg';
import BookSocialTextField from '../components/BookSocialTextField';

const NewBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
    });

    const [fieldStatus, setFieldStatus] = useState({
        title: 'default',
        author: 'default',
        description: 'default',
        genre: 'default',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Ejemplo de validación simple
        if (value.trim() === '') {
            setFieldStatus({ ...fieldStatus, [name]: 'error' });
        } else {
            setFieldStatus({ ...fieldStatus, [name]: 'default' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New book data:', formData);
        // Aquí puedes enviar los datos al backend
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
                    src={defaultbook}
                    alt="Default Book"
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
                    <BookSocialTextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        status={fieldStatus.title}
                        errorMessage="Title is required"
                    />
                    <BookSocialTextField
                        label="Author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        status={fieldStatus.author}
                        errorMessage="Author is required"
                    />
                    <BookSocialTextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        status={fieldStatus.description}
                        errorMessage="Description is required"
                        sx={{ marginTop: '16px' }}
                    />
                    <BookSocialTextField
                        label="Genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        status={fieldStatus.genre}
                        errorMessage="Genre is required"
                        sx={{ marginTop: '16px' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: '20px' }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default NewBook;
