import React from 'react';
import {useParams} from 'react-router-dom';

const BookDetailsPage = () => {
    const {id} = useParams(); // Obtén el parámetro dinámico de la URL

    return (
        <div>
            <h1>Book Details</h1>
            <p>Viewing details for book with ID: {id}</p>
        </div>
    );
};

export default BookDetailsPage;
