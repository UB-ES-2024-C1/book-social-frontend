import React from 'react';
import BookSocialTitle from "../components/BookSocialTitle";
import {Spacer} from "../resources/spacer";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import CardvisualizeBook from "../components/CardVisualizeBook";
import paletteColors from "../resources/palette";
import BookSocialText from "../components/BookSocialText";
import useSavedBooks from "../hooks/saved_books";

const SavedListPage = () => {
    const {savedBooks, loading, error, fetchSavedBooks} = useSavedBooks();

    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage insideMainPage={true} errorMessage={error} onClick={() =>
            fetchSavedBooks()
        }/>;
    }

    if (savedBooks.length === 0) {
        return <div style={{
            height: '100vh', // Asegúrate de usar height para toda la pantalla
            maxWidth: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            textAlign: 'center',
        }}>
            <Spacer size={24}/>
            <BookSocialTitle
                level={3}
                text={`You do not have any books in your saved list yet`}
                textAlign={'center'}
            />
            <Spacer size={24}/>
            <BookSocialText
                level={"large"}
                text={'Click on the save button on any book you are interested in. This way you will be able to find your favourite books more quickly.'}
                textAlign={'center'}
                color={paletteColors.textColorStrong}
            />
        </div>
    }

    return (
        <div style={{
            minHeight: '100vh',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'flex-start',
            marginLeft: "130px",
        }}>
            <Spacer size={24}/>
            <BookSocialTitle
                level={3}
                text={"Welcome to your saved books"}
                textAlign={'left'}
            />
            <Spacer size={24}/>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                {savedBooks.map((item) => (
                    <CardvisualizeBook
                        key={item.id}
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

export default SavedListPage;
