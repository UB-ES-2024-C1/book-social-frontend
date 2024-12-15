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
import CardVisualizePost from "../components/CardVisualizePost";
import defaultImage from "../assets/books/book2.jpg";
import WelcomeSection from "../components/WelcomeSection";

const HomePage = () => {
    const {profile, loading: loadingProfile, error: errorProfile} = useProfile();
    const {
        booksRecent,
        booksGenre,
        booksTopRated,
        loading,
        error,
    } = useBooks('', true);
    const navigate = useNavigate();

    // Array de ejemplo de posts
    const posts = [
        {
            authorName: 'John Doe',
            authorImage: 'https://example.com/profile.jpg',
            title: 'Cómo aprender React en 10 días',
            content: 'React es una biblioteca de JavaScript para construir interfaces de usuario...',
            hashtags: ['#React', '#JavaScript', '#WebDevelopment'],
            image: '',
        },
        {
            authorName: 'Jane Smith',
            authorImage: 'https://example.com/profile2.jpg',
            title: 'Consejos para mejorar tu código en JavaScript',
            content: 'El código limpio es esencial para un desarrollo eficiente y colaborativo...',
            hashtags: ['#CleanCode', '#JavaScript'],
            image: '',
        },
        {
            authorName: 'Carlos López',
            authorImage: '',
            title: 'Introducción a Python',
            content: 'Python es uno de los lenguajes más versátiles y populares...',
            hashtags: ['#Python', '#Programming'],
            image: '',
        },
        {
            authorName: 'Carlos López',
            authorImage: '',
            title: 'Introducción a Python',
            content: 'Python es uno de los lenguajes más versátiles y populares...',
            hashtags: ['#Python', '#Programming'],
            image: '',
        },        {
            authorName: 'Carlos López',
            authorImage: '',
            title: 'Introducción a Python',
            content: 'Python es uno de los lenguajes más versátiles y populares...',
            hashtags: ['#Python', '#Programming'],
            image: '',
        },
        // Más posts si es necesario
    ];

    if (loadingProfile || loading) {
        return <LoadingPage />;
    }

    if (errorProfile || error) {
        return (
            <ErrorPage
                insideMainPage={true}
                errorMessage={errorProfile || error}
                onClick={() => navigate(routes.HOME)}
            />
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: "16px",
                boxSizing: "border-box",
            }}
        >
            {/* Bienvenida */}
            <WelcomeSection profile={profile} />

            {/* Grid de Posts */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                    width: "100%",
                }}
            >
                {posts.map((post, index) => (
                    <CardVisualizePost
                        key={index}
                        authorName={post.authorName}
                        authorImage={post.authorImage}
                        title={post.title}
                        content={post.content}
                        hashtags={post.hashtags}
                        image={post.image}
                    />
                ))}
            </div>

            {/* Secciones de libros */}
            {booksGenre.length > 0 && (
                <BookList title="Books of your favourite genre" books={booksGenre} />
            )}
            <Spacer size={16} />
            {booksRecent.length > 0 && (
                <BookList title="Books recently added" books={booksRecent} />
            )}
            <Spacer size={16} />
            {booksTopRated.length > 0 && (
                <BookList title="Most popular books" books={booksTopRated} />
            )}
        </div>
    );
};

export default HomePage;
