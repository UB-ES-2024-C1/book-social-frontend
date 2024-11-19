import {useEffect, useState} from 'react';
import bookData from '../mocks/book_1.json';
import BookDetails from '../dto/BookDetails';

const useBook = (id) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBook = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const data = bookData;
            const fetchedBook = BookDetails.fromJSON(data);
            setBook(fetchedBook);
            setLoading(false);
        } catch (err) {
            setError('Error fetching book details');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [id]);

    return {book, loading, error, fetchBook};
};

export default useBook;
