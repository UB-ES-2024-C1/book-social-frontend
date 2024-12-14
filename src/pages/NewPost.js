import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import BookSocialTextField from '../components/BookSocialTextField';
import BookSocialLargeTextField from '../components/BookSocialLargeTextField';
import BookSocialPrimaryButton from '../components/BookSocialPrimaryButton';
import paletteColors from '../resources/palette';
import api from '../services/api';
import { Close } from '@mui/icons-material';
import Button from "@mui/material/Button";

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [tagsError, setTagsError] = useState('');

    const [fileError, setFileError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleTagsChange = (e) => {
        const value = e.target.value;
        setTags(value);
        if (value.split(',').length > 5) {
            setTagsError('You can add up to 5 tags only.');
        } else {
            setTagsError('');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');

        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 25 * 1024 * 1024; // 25MB

        if (!validTypes.includes(file.type)) {
            setFileError('Els fitxers adjunts han de ser JPG, PNG o GIF.');
        } else if (file.size > maxSize) {
            setFileError('Els fitxers adjunts no han de superar els 25MB.');
        } else {
            setAttachedFiles((prevFiles) => [...prevFiles, file]);
        }
    };

    const handleRemoveFile = (index) => {
        setAttachedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        let hasErrors = false;

        if (!title.trim()) {
            setTitleError('Title is required.');
            hasErrors = true;
        }

        if (!content.trim()) {
            setContentError('Content is required.');
            hasErrors = true;
        }

        if (tags.split(',').length > 5) {
            setTagsError('You can add up to 5 tags only.');
            hasErrors = true;
        }

        if (hasErrors) {
            setIsSubmitting(false);
            return;
        }

        const postData = {
            title,
            content,
            tags: tags.split(',').map((tag) => tag.trim()),
        };

        try {
            await api.post('/posts', postData);
            setSuccessMessage('Post created successfully!');
            setTitle('');
            setContent('');
            setTags('');
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
        setTags('');
        setAttachedFiles([]);
        setTitleError('');
        setContentError('');
        setTagsError('');
        setFileError('');
        setSuccessMessage('');
        setErrorMessage('');
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
            <Typography variant="h4" sx={{marginBottom: '20px', color: 'white'}}>
                New Post
            </Typography>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ width: '100%' }}>
                {/* Title Field */}
                <Box sx={{ marginBottom: '20px' }}>
                    <BookSocialTextField
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        required={true}
                        maxLength={100}
                        status={titleError ? 'error' : 'default'}
                        errorMessage={titleError}
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
                    />
                </Box>

                {/* Tags Field */}
                <Box sx={{ marginBottom: '20px' }}>
                    <BookSocialTextField
                        label="Tags (comma-separated)"
                        value={tags}
                        onChange={handleTagsChange}
                        status={tagsError ? 'error' : 'default'}
                        errorMessage={tagsError}
                    />
                </Box>

                {/* File Upload */}
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="body1" sx={{ color: 'white', marginBottom: '10px' }}>
                        Attach Files (JPG, PNG, GIF, max 25MB):
                    </Typography>
                    {/* Hidden File Input */}
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    {/* Styled Button */}
                    <label htmlFor="file-upload">
                        <Button
                            variant="contained"
                            component="span"
                            sx={{
                                backgroundColor: paletteColors.color_primary,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: paletteColors.color_primary_weak,
                                },
                                padding: '10px 20px',
                                borderRadius: '8px',
                            }}
                        >
                            Select File
                        </Button>
                    </label>
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
                    />
                    <BookSocialPrimaryButton
                        buttonText="Cancel"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        isExpanded={true}
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
