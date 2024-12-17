import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import BookSocialTextField from '../components/BookSocialTextField';
import BookSocialLargeTextField from '../components/BookSocialLargeTextField';
import BookSocialPrimaryButton from '../components/BookSocialPrimaryButton';
import api from '../services/api';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as routes from '../resources/routes_name';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    const [fileError, setFileError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [attachedFiles, setAttachedFiles] = useState([]);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        if (value.length > 100) {
            setTitleError('The title cannot exceed 100 characters.');
        } else {
            setTitleError('');
        }
    };

    const handleContentChange = (e) => {
        const value = e.target.value;
        setContent(value);
        if (!value.trim()) {
            setContentError('Content is required.');
        } else {
            setContentError('');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');

        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 25 * 1024 * 1024; // 25MB

        if (!validTypes.includes(file.type)) {
            setFileError('Files must be JPG, PNG, or GIF.');
        } else if (file.size > maxSize) {
            setFileError('Files must not exceed 25MB.');
        } else {
            setAttachedFiles([file]);
        }
    };

    const handleRemoveFile = (index) => {
        setAttachedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.url; // Assuming the API returns the file URL
        } catch (error) {
            throw new Error('Failed to upload file.');
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        let hasErrors = false;

        if (!content.trim()) {
            setContentError('Content is required.');
            hasErrors = true;
        }

        if (hasErrors) {
            setIsSubmitting(false);
            return;
        }

        try {
            let imageUrls = [];
            if (attachedFiles.length > 0) {
                imageUrls = await Promise.all(
                    attachedFiles.map((file) => uploadFile(file))
                );
            }

            const postData = {
                title,
                content,
                imageUrls,
            };

            const response = await api.post('/posts/create', postData);
            console.log('response: ', response);

            setSuccessMessage('Post created successfully!');

            setTitle('');
            setContent('');
            setAttachedFiles([]);
        } catch (error) {
            setErrorMessage('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setAttachedFiles([]);
        setTitleError('');
        setContentError('');
        setFileError('');
        setSuccessMessage('');
        setErrorMessage('');
        navigate(routes.HOME);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '50px',
                padding: '30px',
                width: { xs: '100%', sm: '90%', md: '80%' },
                overflow: 'auto', // Enable scroll if necessary
            }}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                style={{ width: '100%' }}
            >
                <Typography
                    variant="h4"
                    sx={{ marginBottom: '20px', color: 'white', textAlign: 'center' }}
                >
                    New Post
                </Typography>

                {/* Title Field */}
                <Box sx={{ marginBottom: '20px' }}>
                    <BookSocialTextField
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        maxLength={100}
                        status={titleError ? 'error' : 'default'}
                        errorMessage={titleError}
                        dataTestId={'title-input'}
                    />
                </Box>

                {/* Content Field */}
                <Box sx={{ marginBottom: '20px' }}>
                    <BookSocialLargeTextField
                        label="Content"
                        value={content}
                        onChange={handleContentChange}
                        required={true}
                        status={contentError ? 'error' : 'default'}
                        errorMessage={contentError}
                        rows={5}
                        dataTestId={'content-input'}
                    />
                </Box>
                {/* File Upload */}
                <Box sx={{ marginBottom: '20px', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ color: 'white', marginBottom: '10px' }}>
                        Attach Files (JPG, PNG, GIF, max 25MB):
                    </Typography>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <BookSocialPrimaryButton
                            buttonText="Select File"
                            onClick={() => document.getElementById('file-upload').click()}
                            isExpanded={false}
                            dataTestId={'file-button'}
                        />
                    </Box>
                    {fileError && (
                        <Typography variant="body2" sx={{ color: 'red', marginTop: '10px' }}>
                            {fileError}
                        </Typography>
                    )}
                    <Box>
                        {attachedFiles.map((file, index) => (
                            <Box
                                key={index}
                                sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', color: 'white' }}
                            >
                                <Typography variant="body2" sx={{ marginRight: '10px' }}>
                                    {file.name}
                                </Typography>
                                <IconButton
                                    onClick={() => handleRemoveFile(index)}
                                    sx={{ color: 'white' }}
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                    <BookSocialPrimaryButton
                        buttonText={isSubmitting ? 'Submitting...' : 'Submit Post'}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        isExpanded={true}
                        dataTestId={'submit-button'}
                    />
                    <BookSocialPrimaryButton
                        buttonText="Cancel"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        isExpanded={true}
                        dataTestId={'cancel-button'}
                    />
                </Box>

                {successMessage && (
                    <Typography variant="body2" sx={{ color: 'green', marginTop: '20px' }}>
                        {successMessage}
                    </Typography>
                )}

                {errorMessage && (
                    <Typography variant="body2" sx={{ color: 'red', marginTop: '20px' }}>
                        {errorMessage}
                    </Typography>
                )}
            </form>
        </Box>
    );
};

export default NewPost;
