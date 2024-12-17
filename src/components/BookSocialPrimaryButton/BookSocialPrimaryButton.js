import React from 'react';
import {Button, CircularProgress, Typography} from '@mui/material';
import paletteColors from "../../resources/palette";
import PropTypes from 'prop-types';

const BookSocialPrimaryButton = ({
                                     buttonText,
                                     onClick,
                                     textColor = paletteColors.textColorWeakest,
                                     bgColor = paletteColors.color_primary,
                                     isExpanded = false,
                                     dataTestId,
                                     isLoading = false,
                                 }) => {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            sx={{
                backgroundColor: bgColor,
                '&:hover': {backgroundColor: bgColor},
                borderRadius: isExpanded ? '24px' : '16px',
                padding: '16px',
                width: isExpanded ? '33.33%' : 'auto',
                display: 'flex',
                justifyContent: 'center', // Centrado del contenido (puede que se necesite ajustar)
                alignItems: 'center',
                position: 'relative', // Importante para posicionar el spinner
            }}
            data-testid={dataTestId}
            disabled={isLoading} // Deshabilitar el botón cuando isLoading es true
        >
            {/* Mostrar el spinner cuando isLoading es true */}
            {isLoading ? (
                <CircularProgress
                    size={24} // Tamaño del spinner
                    sx={{
                        color: 'white', // Spinner blanco
                        position: 'absolute', // Centrado dentro del botón
                    }}
                />
            ) : (
                <Typography
                    variant={isExpanded ? "h6" : "button"} // Ajustar el tamaño de la tipografía
                    sx={{color: textColor, fontFamily: 'Roboto'}}
                >
                    {buttonText}
                </Typography>
            )}
        </Button>
    );
};

BookSocialPrimaryButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    textColor: PropTypes.string,
    bgColor: PropTypes.string,
    isExpanded: PropTypes.bool,
    dataTestId: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default BookSocialPrimaryButton;
