import {render, screen} from '@testing-library/react';
import {act} from "react";
import useBook from './book';
import api from '../../services/api';
import BookDetails from "../../dto/BookDetails";

// Mock del módulo API y de BookDetails
jest.mock('../../services/api', () => ({
    get: jest.fn(),
}));

jest.mock('../../dto/BookDetails', () => ({
    fromJSON: jest.fn(),
}));

const TestComponent = ({id}) => {
    const {book, loading, error} = useBook(id);

    if (loading) return <div data-testid="loading-spinner"></div>;
    if (error) return <div data-testid="error">{error}</div>;
    return <div data-testid="book-title">{book?.title}</div>;
};

describe('useBook Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        render(<TestComponent id="1"/>);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('fetches and displays book details successfully', async () => {
        const mockBook = {title: 'Mock Book Title'};
        BookDetails.fromJSON.mockReturnValueOnce(mockBook); // Mock de BookDetails
        api.get.mockResolvedValueOnce({status: 200, data: mockBook}); // Mock de la API

        render(<TestComponent id="1"/>);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        await act(async () => {
            await Promise.resolve();
        });

        expect(screen.getByTestId('book-title')).toHaveTextContent('Mock Book Title');
        expect(api.get).toHaveBeenCalledWith('/books/book-detail/1');
    });

    it('displays error when fetch fails', async () => {
        api.get.mockRejectedValueOnce(new Error('Error fetching book details'));

        render(<TestComponent id="1"/>);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        await act(async () => {
            await Promise.resolve();
        });

        expect(screen.getByTestId('error')).toHaveTextContent('Error fetching book details');
        expect(api.get).toHaveBeenCalledWith('/books/book-detail/1');
    });
    
});
