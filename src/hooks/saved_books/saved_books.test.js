import {fireEvent, render, waitFor} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';
import useSavedBooks from './saved_books'; // Adjust the path accordingly

const TestComponent = () => {
    const {
        savedBooks,
        loading,
        error,
        saveBook,
        isBookSaved,
    } = useSavedBooks();

    return (
        <div>
            {loading && <span>Loading...</span>}
            {error && <span>{error}</span>}
            <div data-testid="savedBooks">
                {savedBooks.map(book => (
                    <div key={book.id}>{book.title}</div>
                ))}
            </div>
            <button onClick={() => saveBook(1)}>Save Book</button>
            <div data-testid="isBookSaved">
                {isBookSaved(1) ? 'Book is saved' : 'Book is not saved'}
            </div>
        </div>
    );
};

const mock = new MockAdapter(api);

describe('useSavedBooks', () => {
    afterEach(() => {
        mock.reset();
    });

    it('should fetch saved books on initial load', async () => {
        const mockBooks = [
            {id: 1, title: 'Saved Book 1'},
            {id: 2, title: 'Saved Book 2'},
        ];

        mock.onGet('/books/saved-list').reply(200, mockBooks);

        const {getByTestId} = render(<TestComponent/>);

        await waitFor(() => expect(getByTestId('savedBooks')).toHaveTextContent('Saved Book 1'));
        expect(getByTestId('savedBooks')).toHaveTextContent('Saved Book 2');
    });

    it('should handle errors when fetching saved books', async () => {
        mock.onGet('/books/saved-list').reply(500);

        const {getByText} = render(<TestComponent/>);

        await waitFor(() => expect(getByText('Error fetching saved book list')).toBeInTheDocument());
    });

    it('should handle saving a book', async () => {
        const mockSavedBooks = [
            {id: 1, title: 'Saved Book 1'},
        ];

        mock.onGet('/books/saved-list').reply(200, mockSavedBooks);
        mock.onPost('/books/saved-list/1').reply(200);

        const {getByTestId, getByText} = render(<TestComponent/>);

        // Wait for the saved books to load
        await waitFor(() => expect(getByTestId('savedBooks')).toHaveTextContent('Saved Book 1'));

        // Click the Save Book button
        fireEvent.click(getByText('Save Book'));

        // After saving, the saved books should include the new one
        await waitFor(() => expect(getByTestId('savedBooks')).toHaveTextContent('Saved Book 1'));
    });

    it('should handle errors when saving a book', async () => {
        mock.onPost('/books/saved-list/1').reply(500);

        const {getByText} = render(<TestComponent/>);

        fireEvent.click(getByText('Save Book'));

        await waitFor(() => expect(getByText('Error saving book list')).toBeInTheDocument());
    });

    it('should check if a book is saved', async () => {
        const mockSavedBooks = [
            {id: 1, title: 'Saved Book 1'},
        ];

        mock.onGet('/books/saved-list').reply(200, mockSavedBooks);

        const {getByTestId} = render(<TestComponent/>);

        await waitFor(() => expect(getByTestId('savedBooks')).toHaveTextContent('Saved Book 1'));

        // Test if the book with id 1 is saved
        expect(getByTestId('isBookSaved')).toHaveTextContent('Book is saved');
    });

});
