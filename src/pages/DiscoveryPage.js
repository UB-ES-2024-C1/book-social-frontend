import React from 'react';
import BookSocialTitle from "../components/BookSocialTitle";
import paletteColors from "../resources/palette";
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
            background: paletteColors.background_color,
            minHeight: '100vh',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'flex-start',
            paddingTop: '100px',
            paddingLeft: '350px',
            paddingRight: '50px',
            paddingBottom: '50px'
        }}>
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

        </div>
    );
};

export default DiscoveryPage;
