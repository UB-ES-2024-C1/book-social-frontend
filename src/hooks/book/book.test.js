import {renderHook} from '@testing-library/react-hooks';
import useBook from './useBook';
import bookData from '../../mocks/book_1.json';
import BookDetails from '../../dto/BookDetails';
import {expect} from "@storybook/test";

// Mock del módulo BookDetails
jest.mock('../../dto/BookDetails', () => ({
    fromJSON: jest.fn(),
}));

describe('useBook', () => {
    const bookId = '1'; // ID de libro de prueba

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should start with loading state', () => {
        const {result} = renderHook(() => useBook(bookId));
        expect(result.current.loading).toBe(true);
        expect(result.current.book).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('should fetch book details successfully', async () => {
        BookDetails.fromJSON.mockReturnValue(bookData); // Mock del método fromJSON

        const {result, waitForNextUpdate} = renderHook(() => useBook(bookId));

        // Espera a que se complete la actualización
        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.book).toEqual(bookData);
        expect(result.current.error).toBeNull();
    });

    it('should handle errors when fetching book details', async () => {
        BookDetails.fromJSON.mockImplementation(() => {
            throw new Error('Error fetching book details');
        });

        const {result, waitForNextUpdate} = renderHook(() => useBook(bookId));

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.book).toBeNull();
        expect(result.current.error).toBe('Error fetching book details');
    });
});
