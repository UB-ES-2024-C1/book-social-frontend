import React from "react";
import BookSocialTitle from "../components/BookSocialTitle";
import BookList from "../components/BookList";
import useProfile from "../hooks/profile/profile";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import useBooks from "../hooks/books/books";
import {useNavigate} from "react-router-dom";
import * as routes from "../resources/routes_name";
import {Spacer} from "../resources/spacer";
import CardVisualizePost from "../components/CardVisualizePost";
import WelcomeSection from "../components/WelcomeSection";
import usePosts from "../hooks/posts/posts";
import {Box} from "@mui/material";

const HomePage = () => {
    const {profile, loading: loadingProfile, error: errorProfile} = useProfile();
    const {booksRecent, booksGenre, booksTopRated, loading, error} = useBooks("", true, false);
    const {posts, loading: loadingPosts, error: errorPosts} = usePosts(); // Hook para los posts
    const navigate = useNavigate();

    if (loadingProfile || loading || loadingPosts) {
        return <LoadingPage/>;
    }

    if (errorProfile || error || errorPosts) {
        return (
            <ErrorPage
                insideMainPage={true}
                errorMessage={errorProfile || error || errorPosts}
                onClick={() => navigate(routes.HOME)}
            />
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                height: "100%",
                padding: "16px",
                boxSizing: "border-box",
                marginTop: "20px",
            }}
        >
            {/* Bienvenida */}
            <WelcomeSection profile={profile}/>
            {/* Secciones de libros */}
            {booksGenre.length > 0 && (
                <BookList title="Books of your favourite genre" books={booksGenre}/>
            )}
            <Spacer size={16}/>
            {booksRecent.length > 0 && (
                <BookList title="Books recently added" books={booksRecent}/>
            )}
            <Spacer size={16}/>
            {booksTopRated.length > 0 && (
                <BookList title="Most popular books" books={booksTopRated}/>
            )}
            <Spacer size={16}/>

            {/* Grid de Posts */}
            <BookSocialTitle
                level={4}
                text={"All Posts"}
                textAlign={"left"}
            />
            <Box
                sx={{
                    width: "98%",
                    height: "1px",
                    backgroundColor: "#ddd",
                    margin: '10px'
                }}
            />
            {posts.length > 0 && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                        width: "100%",
                    }}
                >
                    {posts.map((post) => (
                        <CardVisualizePost
                            key={post.author.id}
                            authorName={post.author.name}
                            authorImage={profile.image}
                            username={post.author.username}
                            title={post.title}
                            content={post.content}
                            image={post.imageUrls || ""}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
