import React from "react";
import BookSocialTitle from "../components/BookSocialTitle";
import book1 from "../assets/books/book1.jpg";
import book2 from "../assets/books/book2.jpg";
import book3 from "../assets/books/book3.jpg";
import book4 from "../assets/books/book4.jpg";
import book5 from "../assets/books/book5.jpg";
import userImage from "../assets/no_image_available.png";
import BookList from "../components/BookList";
import useProfile from "../hooks/profile/profile";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const HomePage = () => {
    const {profile, loading, error, fetchProfile} = useProfile();
    console.log(profile);

    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage errorMessage={error} onClick={() => fetchProfile()}/>;
    }

    const books = [
        {
            image: book1,
            title: "Animals in Translation",
            author: "Temple Grandin",
            summary: "HACE VARIOS AÑOS… Julen e Ibai eran inseparables. Amigos que compartían clase...",
            rating: 4.5,
        },
        {
            image: book2,
            title: "Muertes perfectamente evitables",
            author: "Deirdre Sullivan",
            summary: "Las gemelas Maddy y Catlin acaban de mudarse a Ballyfrann, un pueblo...",
            rating: 3.0,
        },
        {
            image: book3,
            title: "La sombra del viento",
            author: "Carlos Ruiz Zafón",
            summary: "En la Barcelona de la postguerra, un joven llamado Daniel descubre un libro...",
            rating: 5.0,
        },
        {
            image: book4,
            title: "Cien años de soledad",
            author: "Gabriel García Márquez",
            summary: "La historia de la familia Buendía, que vive en el pueblo ficticio de Macondo...",
            rating: 4.8,
        },
        {
            image: book5,
            title: "1984",
            author: "George Orwell",
            summary: "En una sociedad totalitaria gobernada por el Gran Hermano, Winston Smith lucha por mantener su libertad...",
            rating: 4.7,
        },
    ];

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
                    src={userImage}
                    alt="User Avatar"
                    style={{
                        width: "70px",
                        height: "70px",
                        marginRight: "15px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        borderRadius: "50%",

                    }}
                />
                <BookSocialTitle level={1} text={`Welcome ${profile.name}`}/>
            </div>
            <BookList title="Books of your favourite genre" books={books}/>
            <BookList title="Books recently added" books={books}/>
            <BookList title="Most popular books" books={books}/>
        </div>
    );

};

export default HomePage;
