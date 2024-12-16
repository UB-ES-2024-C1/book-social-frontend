import {useEffect, useState} from 'react';
import api from "../../services/api";
import BookSummary from "../../dto/bookSummary";

const useSavedBooks = () => {
    const [savedBooks, setSavedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSavedBooks = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const response = await api.get('/books/saved-list');
            if (response.status === 200) {
                const fetchedBooks = response.data.map((bookData) => BookSummary.fromJSON(bookData));
                setSavedBooks(fetchedBooks);
                setLoading(false);
            } else {
                setError(`Error fetching saved books: ${response.data.message}`);
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching saved book list');
            setLoading(false);
        }
    };

    const saveBook = async (id) => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const response = await api.post(`/books/saved-list/${id}`);
            if (response.status === 200) {
                await fetchSavedBooks();
            } else {
                setLoading(false);
            }
        } catch (err) {
            setError('Error saving book list');
            setLoading(false);
        }
    };

    const isBookSaved = (id) => {
        return savedBooks.some((book) => book.id === id);
    }


    useEffect(() => {
        fetchSavedBooks();
    }, []);

    return {
        savedBooks,
        loading,
        error,
        fetchSavedBooks,
        isBookSaved,
        saveBook
    };
};

export default useSavedBooks;
