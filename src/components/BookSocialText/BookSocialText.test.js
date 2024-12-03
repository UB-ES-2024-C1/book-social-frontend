import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import BookSocialText from './BookSocialText';

describe('BookSocialText', () => {
    it('should render plain text correctly', () => {
        render(<BookSocialText level="p" text="This is a plain text"/>);

        // Verifica que el texto se muestra en el documento
        expect(screen.getByText('This is a plain text')).toBeInTheDocument();
    });

    it('should render bold text correctly', () => {
        render(<BookSocialText level="p" text="This is **bold** text"/>);

        // Verifica que el texto en negrita esté presente y sea renderizado correctamente
        expect(screen.getByText('bold')).toHaveStyle('font-weight: bold');
    });

    it('should render italic text correctly', () => {
        render(<BookSocialText level="p" text="This is *italic* text"/>);

        // Verifica que el texto en cursiva esté presente y sea renderizado correctamente
        expect(screen.getByText('italic')).toHaveStyle('font-style: italic');
    });
    
    it('should render text with multiple formats', () => {
        render(<BookSocialText level="p" text="This is **bold** and *italic* text"/>);

        // Verifica que el texto tenga tanto negrita como cursiva
        expect(screen.getByText('bold')).toHaveStyle('font-weight: bold');
        expect(screen.getByText('italic')).toHaveStyle('font-style: italic');
    });

    it('should render large and small text levels correctly', () => {
        render(<BookSocialText level="large" text="Large text"/>);
        const largeText = screen.getByText('Large text');
        expect(largeText).toHaveStyle('font-size: 1.25rem');

        render(<BookSocialText level="small" text="Small text"/>);
        const smallText = screen.getByText('Small text');
        expect(smallText).toHaveStyle('font-size: 0.875rem');
    });
});
