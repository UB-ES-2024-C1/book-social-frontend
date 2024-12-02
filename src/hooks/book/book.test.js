import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useBook from './book';
import api from '../../services/api';

// Mock del módulo API
jest.mock('../../services/api', () => ({
    get: jest.fn(),
}));

// Componente de prueba para consumir el hook
const TestComponent = ({ id }) => {
    const { book, loading, error } = useBook(id);

    if (loading) return <div data-testid="loading">Loading...</div>;
    if (error) return <div data-testid="error">{error}</div>;
    return <div data-testid="book-title">{book?.title}</div>;
};

describe('useBook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading state initially', () => {
        render(<TestComponent id="1" />);
        expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');
    });

    it('should fetch book details successfully', async () => {
        const mockBook = { title: 'Mock Book Title' };
        api.get.mockResolvedValueOnce({ status: 200, data: mockBook });

        render(<TestComponent id="1" />);

        // Esperamos a que el componente se re-renderice después de la llamada a la API
        await act(async () => {
            await Promise.resolve(); // Procesar el ciclo de eventos
        });

        expect(screen.getByTestId('book-title')).toHaveTextContent('Mock Book Title');
        expect(api.get).toHaveBeenCalledWith('/books/book-detail/1');
    });

    it('should handle fetch error', async () => {
        api.get.mockRejectedValueOnce(new Error('Error fetching book details'));

        render(<TestComponent id="1" />);

        // Esperamos a que el componente se re-renderice después de la llamada a la API
        await act(async () => {
            await Promise.resolve(); // Procesar el ciclo de eventos
        });

        expect(screen.getByTestId('error')).toHaveTextContent('Error fetching book details');
    });

    it('should handle non-200 response', async () => {
        api.get.mockResolvedValueOnce({ status: 400, data: { message: 'Bad Request' } });

        render(<TestComponent id="1" />);

        // Esperamos a que el componente se re-renderice después de la llamada a la API
        await act(async () => {
            await Promise.resolve(); // Procesar el ciclo de eventos
        });

        expect(screen.getByTestId('error')).toHaveTextContent('Error fetching book details');
    });
});
