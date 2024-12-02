import {useEffect, useState} from 'react';
import BookDetails from '../dto/BookDetails';
import api from "../services/api.js";

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
            const response = await api.get(`/books/book-detail/${id}`);
            if (response.status === 200) {
                console.log(response.data)
                const fetchedBook = BookDetails.fromJSON(response.data);
                setBook(fetchedBook);
                setLoading(false);
            } else {
                setError(`Error on try to login: ${response.data.message}`);
                setLoading(false);

            }
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
