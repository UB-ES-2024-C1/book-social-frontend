import React from 'react';
import {render, waitFor} from '@testing-library/react';
import api from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import useBooks from './books';

const TestComponent = ({searchQuery, fromHome}) => {
    const {
        books,
        booksRecent,
        booksGenre,
        booksTopRated,
        loading,
        error,
    } = useBooks(searchQuery, fromHome);

    return (
        <div>
            {loading && <span>Loading...</span>}
            {error && <span>{error}</span>}
            <div data-testid="books">
                {books.map(book => (
                    <div key={book.id}>{book.title}</div>
                ))}
            </div>
            <div data-testid="booksRecent">
                {booksRecent.map(book => (
                    <div key={book.id}>{book.title}</div>
                ))}
            </div>
            <div data-testid="booksGenre">
                {booksGenre.map(book => (
                    <div key={book.id}>{book.title}</div>
                ))}
            </div>
            <div data-testid="booksTopRated">
                {booksTopRated.map(book => (
                    <div key={book.id}>{book.title}</div>
                ))}
            </div>
        </div>
    );
};

const mock = new MockAdapter(api);

describe('useBooks', () => {
    afterEach(() => {
        mock.reset();
    });

    it('should fetch books on initial load', async () => {
        const mockBooks = [
            {id: 1, title: 'Book 1', author: 'Author 1'},
            {id: 2, title: 'Book 2', author: 'Author 2'},
        ];

        mock.onGet('/books/book-list').reply(200, mockBooks);

        const {getByTestId} = render(<TestComponent/>);

        await waitFor(() => expect(getByTestId('books')).toHaveTextContent('Book 1'));
        expect(getByTestId('books')).toHaveTextContent('Book 2');
    });

    it('should handle errors when fetching books', async () => {
        mock.onGet('/books/book-list').reply(500);

        const {getByText} = render(<TestComponent/>);

        await waitFor(() => expect(getByText('Error fetching book list')).toBeInTheDocument());
    });

    it('should fetch books by title', async () => {
        const mockBooks = [
            {id: 1, title: 'Book 1', author: 'Author 1'},
            {id: 2, title: 'Book 2', author: 'Author 2'},
        ];

        mock.onGet('/books/search?title=Book').reply(200, {books: mockBooks});

        const {getByTestId} = render(<TestComponent searchQuery="Book"/>);

        await waitFor(() => expect(getByTestId('books')).toHaveTextContent('Book 1'));
        expect(getByTestId('books')).toHaveTextContent('Book 2');
    });

    it('should fetch top-rated books', async () => {
        const mockBooks = [
            {id: 1, title: 'Top Rated Book 1'},
            {id: 2, title: 'Top Rated Book 2'},
        ];

        mock.onGet('/books/top-rated').reply(200, mockBooks);

        const {getByTestId} = render(<TestComponent fromHome={true}/>);

        await waitFor(() => expect(getByTestId('booksTopRated')).toHaveTextContent('Top Rated Book 1'));
        expect(getByTestId('booksTopRated')).toHaveTextContent('Top Rated Book 2');
    });
    
    it('should fetch recent books', async () => {
        const mockBooks = [
            {id: 1, title: 'Recent Book 1', author: 'Author 1'},
            {id: 2, title: 'Recent Book 2', author: 'Author 2'},
        ];

        mock.onGet('/books/recent').reply(200, mockBooks);

        const {getByTestId} = render(<TestComponent fromHome={true}/>);

        await waitFor(() => expect(getByTestId('booksRecent')).toHaveTextContent('Recent Book 1'));
        expect(getByTestId('booksRecent')).toHaveTextContent('Recent Book 2');
    });


});
