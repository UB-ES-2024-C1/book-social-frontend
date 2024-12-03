import React from "react";
import BookSocialTitle from "../components/BookSocialTitle";
import userImage from "../assets/no_image_available.png";
import BookList from "../components/BookList";
import useProfile from "../hooks/profile/profile";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import useBooks from "../hooks/books";
import {useNavigate} from "react-router-dom";
import * as routes from "../resources/routes_name";
import {Spacer} from "../resources/spacer";
import defaultCoverImage from "../assets/portada.jpeg";


const HomePage = () => {
    const {profile, loadingProfile, errorProfile} = useProfile();
    const {
        booksRecent,
        booksGenre,
        booksTopRated,
        loading,
        error,
    } = useBooks('', true);
    const navigate = useNavigate();

    if (loadingProfile || loading) {
        return <LoadingPage/>;
    }

    if (errorProfile || error) {
        return <ErrorPage errorMessage={errorProfile || error} onClick={() => navigate(routes.HOME)}/>;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%", // Aseguramos que ocupe todo el ancho disponible
                height: "100%", // Ajustamos a la altura del contenedor
                padding: "16px", // Añadimos un poco de espacio alrededor
                boxSizing: "border-box", // Evitamos que el padding afecte dimensiones
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    padding: "5px",
                }}
            >
                <img
                    src={localStorage.getItem("profileImage") || userImage}
                    alt="User Avatar"
                    style={{
                        width: "70px",
                        height: "70px",
                        marginRight: "15px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        borderRadius: "10%",

                    }}
                />
                <BookSocialTitle level={1} text={`Welcome ${profile.name}`}/>
            </div>
            {booksGenre.length > 0 && (
                <BookList title="Books of your favourite genre" books={booksGenre}/>
            )}
            <Spacer size={24}/>
            {booksRecent.length > 0 && (
                <BookList title="Books recently added" books={booksRecent}/>
            )}
            <Spacer size={24}/>
            {booksTopRated.length > 0 && (
                <BookList title="Most popular books" books={booksTopRated}/>
            )}

        </div>
    );

};

export default HomePage;
