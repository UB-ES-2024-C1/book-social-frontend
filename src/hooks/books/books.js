import {useEffect, useState} from 'react';
import api from "../../services/api";
import BookSummary from "../../dto/bookSummary";

const useBooks = (searchQuery = '') => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const response = await api.get('/books/book-list');
            if (response.status === 200) {
                const fetchedBooks = response.data.map((bookData) => BookSummary.fromJSON(bookData));
                setBooks(fetchedBooks);
                setLoading(false);
            } else {
                setError(`Error fetching books: ${response.data.message}`);
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching book list');
            setLoading(false);
        }
    };

    const fetchBooksByTitle = async (title) => {

        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const response = await api.get(`/books/search?title=${encodeURIComponent(title)}`);
            if (response.status === 200) {
                const fetchedBooks = response.data.books.map((bookData) => BookSummary.fromJSON(bookData));
                setBooks(fetchedBooks);
                setLoading(false);
            } else {
                setError(`Error fetching books by title: ${response.data.message}`);
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching books by title');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.trim()) {
            fetchBooksByTitle(searchQuery);
        } else {
            fetchBooks();
        }
    }, [searchQuery]);

    return {books, loading, error, fetchBooks, fetchBooksByTitle};
};

export default useBooks;
