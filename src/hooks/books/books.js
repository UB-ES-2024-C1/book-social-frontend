import {useEffect, useState} from 'react';
import api from "../../services/api";
import BookSummary from "../../dto/bookSummary";

const useBooks = (searchQuery = '', fromHome = false) => {
    const [books, setBooks] = useState([]);
    const [booksRecent, setBooksRecent] = useState([]);
    const [booksGenre, setBooksGenre] = useState([]);
    const [booksTopRated, setBooksTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            let endpoint = '/books/book-list';
            if (fromHome) {
                endpoint = `${endpoint}?limit=10`;
            }
            const response = await api.get(endpoint);
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

    const fetchRecentBooks = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const response = await api.get('/books/recent');
            if (response.status === 200) {
                const fetchedBooks = response.data.map((bookData) => BookSummary.fromJSON(bookData));
                setBooksRecent(fetchedBooks);
                setLoading(false);
            } else {
                setError(`Error fetching recent books: ${response.data.message}`);
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching recent books');
            setLoading(false);
        }
    };

    const fetchBooksByGenre = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const genre = localStorage.getItem('genre') ?? 'Fiction';
            const genreWithCapital = genre.charAt(0).toUpperCase() + genre.slice(1);
            const response = await api.get(`/books/search?genre=${genreWithCapital}`);
            if (response.status === 200) {
                const fetchedBooks = response.data.books.map((bookData) => BookSummary.fromJSON(bookData));
                setBooksGenre(fetchedBooks);
                setLoading(false);
            } else {
                setError(`Error fetching books by genre: ${response.data.message}`);
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching books by genre');
            setLoading(false);
        }
    };

    const fetchTopRatedBooks = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const response = await api.get('/books/top-rated');
            if (response.status === 200) {
                const fetchedBooks = response.data.map((bookData) => BookSummary.fromJSON(bookData));
                setBooksTopRated(fetchedBooks);
                setLoading(false);
            } else {
                setError(`Error fetching top-rated books: ${response.data.message}`);
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching top-rated books');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.trim()) {
            fetchBooksByTitle(searchQuery);
        } else if (fromHome) {
            fetchRecentBooks();
            fetchBooksByGenre();
            fetchTopRatedBooks();
        } else {
            fetchBooks();
        }
    }, [searchQuery]);

    return {
        books,
        booksRecent,
        booksGenre,
        booksTopRated,
        loading,
        error,
        fetchBooks,
        fetchBooksByTitle,
        fetchRecentBooks,
        fetchBooksByGenre,
        fetchTopRatedBooks
    };
};

export default useBooks;
