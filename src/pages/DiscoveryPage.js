import React from 'react';
import BookSocialTitle from "../components/BookSocialTitle";
import {Spacer} from "../resources/spacer";
import {useParams} from "react-router-dom";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import useBooks from "../hooks/books";
import CardvisualizeBook from "../components/CardVisualizeBook";

const DiscoveryPage = () => {
    const {id} = useParams();
    const {books, loading, error, fetchBooks} = useBooks(id);

    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage errorMessage={error} onClick={() => fetchBooks()}/>;
    }

    return (
        <div style={{
            minHeight: '100vh',
            maxWidth: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'flex-start',
        }}>
            <Spacer size={24}/>

            <BookSocialTitle level={3}
                             text={"Welcome to our book library where you can discover a new literary world!"}
                             textAlign={'center'}
            />
            <Spacer size={24}/>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}>
                {books.map((item) => (
                    <CardvisualizeBook id={item.id} title={item.title} image={item.image} author={item.authorName}
                                       rating={item.googleAverageRating} summary={item.synopsis}/>
                ))}
            </div>
            <Spacer size={24}/>
        </div>
    );
};

export default DiscoveryPage;
