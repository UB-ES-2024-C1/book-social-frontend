import {useEffect, useState} from "react";
import api from "../../services/api";
import BookSummary from "../../dto/bookSummary";

const useSavedBooks = () => {
    const [savedBooks, setSavedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSavedBooks = async () => {
        setLoading(true); // Siempre marcar como cargando al iniciar
        setError(null);
        try {
            const response = await api.get("/books/saved-list");
            if (response.status === 200) {
                const fetchedBooks = response.data.map((bookData) => BookSummary.fromJSON(bookData));
                setSavedBooks(fetchedBooks);
            } else {
                setError(`Error fetching saved books: ${response.data.message}`);
            }
        } catch (err) {
            setError("Error fetching saved book list");
        } finally {
            setLoading(false); // Asegurarnos de cambiar el estado de loading
        }
    };

    const saveBook = async (id) => {
        try {
            const response = await api.post(`/books/saved-list/${id}`);
            if (response.status === 200) {
                await fetchSavedBooks(); // Actualizamos la lista de libros guardados
                return response.data.isSaved;
            }
        } catch (err) {
            setError("Error saving book");
        }
        return false; // Retornar false en caso de error
    };

    useEffect(() => {
        fetchSavedBooks(); // Cargar los libros guardados al montar el hook
    }, []);

    return {
        savedBooks,
        loading,
        error,
        fetchSavedBooks,
        saveBook,
    };
};

export default useSavedBooks;
