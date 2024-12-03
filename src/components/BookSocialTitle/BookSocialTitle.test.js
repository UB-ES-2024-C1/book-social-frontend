import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import BookSocialTitle from "./BookSocialTitle";

describe('BookSocialTitle', () => {
    it('should render a heading with the correct text and level', () => {
        render(<BookSocialTitle level={1} text="Heading 1"/>);

        // Verifica que el texto se muestre en el documento y que sea un h1
        const heading = screen.getByText('Heading 1');
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe('H1');
    });

    it('should apply the correct color', () => {
        const color = 'red';
        render(<BookSocialTitle level={2} text="Heading 2" color={color}/>);

        // Verifica que el color del texto sea el esperado
        const heading = screen.getByText('Heading 2');
        expect(heading).toHaveStyle(`color: ${color}`);
    });

    it('should align the text correctly', () => {
        render(<BookSocialTitle level={3} text="Heading 3" textAlign="right"/>);

        // Verifica que el texto esté alineado a la derecha
        const heading = screen.getByText('Heading 3');
        expect(heading).toHaveStyle('text-align: right');
    });

    it('should parse bold and italic markdown correctly', () => {
        render(<BookSocialTitle level={4} text="This is **bold** and _italic_ text"/>);

        // Verifica que el texto en negrita esté en un <strong>
        expect(screen.getByText('bold')).toHaveStyle('font-weight: bold');

        // Verifica que el texto en cursiva esté en un <em>
        expect(screen.getByText('italic')).toHaveStyle('font-style: italic');
    });

    it('should use the default font size for headings if not provided', () => {
        render(<BookSocialTitle level={6} text="Heading 6"/>);

        // Verifica que el tamaño de fuente sea el predeterminado para h6
        const heading = screen.getByText('Heading 6');
        expect(heading).toHaveStyle('font-size: 1rem');
    });

    it('should use the default font size for heading levels not specified in fontSizes', () => {
        render(<BookSocialTitle level={7} text="Heading 7"/>);

        // Verifica que se use el tamaño de fuente por defecto (h2)
        const heading = screen.getByText('Heading 7');
        expect(heading).toHaveStyle('font-size: 3rem');
    });
});
