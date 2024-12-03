import React from 'react';
import BookSocialTitle from "../components/BookSocialTitle";
import {Spacer} from "../resources/spacer";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import useBooks from "../hooks/books";
import CardvisualizeBook from "../components/CardVisualizeBook";
import {useLocation, useNavigate} from "react-router-dom";
import BookSocialPrimaryButton from "../components/BookSocialPrimaryButton";
import * as routes from "../resources/routes_name";
import paletteColors from "../resources/palette";
import Button from "@mui/material/Button";

const DiscoveryPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search') || '';
    const {books, loading, error, fetchBooks, fetchBooksByTitle} = useBooks(searchQuery);
    const navigate = useNavigate();

    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage insideMainPage={true} errorMessage={error} onClick={() =>
            searchQuery ? fetchBooksByTitle() : fetchBooks()
        }/>;
    }

    if (searchQuery && books.length === 0) {
        return <div style={{
            height: '100vh', // Asegúrate de usar height para toda la pantalla
            maxWidth: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
            textAlign: 'center',
        }}>

            <BookSocialTitle
                level={3}
                text={`Sorry, there is no book corresponding to your search: ${searchQuery}. Check that it is spelled correctly and try again.`}
                textAlign={'center'}
                color={paletteColors.textColorStrong}
            />
            <Spacer size={24}/>
            <BookSocialPrimaryButton
                isExpanded={true}
                buttonText={"See all books"}
                onClick={() => navigate(routes.DISCOVERY)
                }
            />
        </div>
    }

    return (
        <div style={{
            minHeight: '100vh',
            maxWidth: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'flex-start',
            marginLeft: "50px",
        }}>
            <Spacer size={24}/>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                gap: '65%',
            }}>
                <BookSocialTitle
                    level={3}
                    text={searchQuery ? `Results of your search: **${searchQuery}**` : "Welcome to our book library where you can discover a new literary world!"}
                    textAlign={'left'}
                />
                {searchQuery && (
                    <Button
                        variant="text"
                        onClick={() => navigate(routes.DISCOVERY)}
                        style={{textTransform: 'none', color: paletteColors.textColorStrong, fontSize: '2rem'}}>
                        {"clear search"}
                    </Button>
                )}
            </div>

            <Spacer size={24}/>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                {books.map((item) => (
                    <CardvisualizeBook
                        key={item.id} // Añade una clave única para cada elemento de la lista
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        author={item.authorName}
                        rating={item.googleAverageRating}
                        summary={item.synopsis}
                    />
                ))}
            </div>


            <Spacer size={24}/>
        </div>
    );
};

export default DiscoveryPage;
