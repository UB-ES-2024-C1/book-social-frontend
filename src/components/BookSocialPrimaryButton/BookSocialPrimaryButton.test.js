import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import BookSocialPrimaryButton from './BookSocialPrimaryButton';

describe('BookSocialPrimaryButton', () => {
    it('should render the button with the correct text', () => {
        render(<BookSocialPrimaryButton buttonText="Click Me" onClick={() => {
        }}/>);

        // Verifica que el texto del botón esté en el documento
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should call the onClick function when clicked', () => {
        const onClickMock = jest.fn();
        render(<BookSocialPrimaryButton buttonText="Click Me" onClick={onClickMock}/>);

        // Simula un clic en el botón
        fireEvent.click(screen.getByText('Click Me'));

        // Verifica que la función onClick haya sido llamada
        expect(onClickMock).toHaveBeenCalled();
    });

    it('should apply the correct text color', () => {
        render(<BookSocialPrimaryButton buttonText="Click Me" onClick={() => {
        }} textColor="red"/>);

        // Verifica que el color del texto sea el esperado
        expect(screen.getByText('Click Me')).toHaveStyle('color: red');
    });

    it('should apply the correct background color', () => {
        render(<BookSocialPrimaryButton buttonText="Click Me" onClick={() => {
        }} bgColor="blue"/>);

        // Verifica que el color de fondo del botón sea el esperado
        expect(screen.getByText('Click Me').closest('button')).toHaveStyle('background-color: blue');
    });

    it('should have the correct border radius and width when isExpanded is true', () => {
        render(<BookSocialPrimaryButton buttonText="Click Me" onClick={() => {
        }} isExpanded={true}/>);

        // Verifica que el botón tenga un border-radius de 24px y un ancho de 33.33%
        const button = screen.getByText('Click Me').closest('button');
        expect(button).toHaveStyle('border-radius: 24px');
        expect(button).toHaveStyle('width: 33.33%');
    });

    it('should have the correct border radius and width when isExpanded is false', () => {
        render(<BookSocialPrimaryButton buttonText="Click Me" onClick={() => {
        }} isExpanded={false}/>);

        // Verifica que el botón tenga un border-radius de 16px y un ancho automático
        const button = screen.getByText('Click Me').closest('button');
        expect(button).toHaveStyle('border-radius: 16px');
        expect(button).toHaveStyle('width: auto');
    });
});
