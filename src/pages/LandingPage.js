import React, {useEffect, useState} from 'react';
import book1 from '../assets/books/book1.jpg';
import book2 from '../assets/books/book2.jpg';
import book3 from '../assets/books/book3.jpg';
import book4 from '../assets/books/book4.jpg';
import book5 from '../assets/books/book5.jpg';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import paletteColors from "../resources/palette";
import BookSocialPrimaryButton from "../components/BookSocialPrimaryButton";
import * as routes from "../resources/routes_name";
import {useNavigate} from "react-router-dom";
import BookSocialTitle from "../components/BookSocialTitle";
import {Spacer} from "../resources/spacer";
import AppBar from "@mui/material/AppBar";
import NavAppBar from "../components/NavAppBar";
import {FaBook} from "react-icons/fa";
import CardvisualizeBook from "../components/CardVisualizeBook";
import CardVisualizePost from "../components/CardVisualizePost";


const LandingPage = ({isLogged}) => {
    const [fadeIn, setFadeIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const goToDiscovery = () => {
        navigate(routes.DISCOVERY);
    };
    const goToHome = () => {
        navigate(routes.HOME);
    };

    const bookIcons = [
        {top: '5%', left: '10%', size: '45px', opacity: 0.15, rotation: '10deg'},
        {top: '15%', left: '25%', size: '50px', opacity: 0.2, rotation: '25deg'},
        {top: '25%', left: '50%', size: '55px', opacity: 0.1, rotation: '40deg'},
        {top: '35%', left: '70%', size: '60px', opacity: 0.25, rotation: '50deg'},
        {top: '45%', left: '15%', size: '40px', opacity: 0.3, rotation: '60deg'},
        {top: '55%', left: '80%', size: '50px', opacity: 0.2, rotation: '70deg'},
        {top: '65%', left: '35%', size: '45px', opacity: 0.1, rotation: '80deg'},
        {top: '75%', left: '60%', size: '50px', opacity: 0.15, rotation: '90deg'},
        {top: '85%', left: '20%', size: '55px', opacity: 0.25, rotation: '100deg'},
        {top: '95%', left: '40%', size: '60px', opacity: 0.2, rotation: '110deg'},
        {top: '10%', left: '80%', size: '50px', opacity: 0.15, rotation: '15deg'},
        {top: '30%', left: '10%', size: '55px', opacity: 0.2, rotation: '20deg'},
        {top: '40%', left: '50%', size: '60px', opacity: 0.1, rotation: '35deg'},
        {top: '80%', left: '70%', size: '50px', opacity: 0.3, rotation: '75deg'},
        {top: '90%', left: '80%', size: '55px', opacity: 0.2, rotation: '85deg'},
    ];

    const posts = [
        {
            author: "John Doe",
            authorImage: "https://example.com/profile.jpg",
            title: "My Favorite Sci-Fi Books",
            content:
                "Exploring the vast universe of science fiction. Here are some of my top recommendations...",
            hashtags: ["#SciFi", "#Books", "#Favorites"],
            image: "",
        },
        {
            author: "Jane Smith",
            authorImage: "https://example.com/profile.jpg",
            title: "Why Reading Matters",
            content:
                "In a fast-paced world, reading offers a chance to slow down, reflect, and grow...",
            hashtags: ["#Reading", "#Motivation"],
            image: "",
        },
        {
            author: "Alex Johnson",
            authorImage: "https://example.com/profile.jpg",
            title: "Top 5 Thriller Novels of 2024",
            content:
                "This year has been fantastic for thrillers! Here are my top picks for edge-of-your-seat stories...",
            hashtags: ["#Thriller", "#Books", "#Reviews"],
            image: "",
        },
    ];

    const bookCovers = [book1, book2, book3, book4, book5];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                overflowY: 'auto',
                background: paletteColors.background_color,
            }}
        >
            <AppBar position="fixed">
                <NavAppBar/>
            </AppBar>
            <Box
                sx={{
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                    textAlign: 'center',
                    background: paletteColors.background_color,
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    {bookIcons.map((icon, index) => (
                        <FaBook key={index} style={{
                            position: 'absolute',
                            top: icon.top,
                            left: icon.left,
                            fontSize: icon.size,
                            color: paletteColors.color_primary,
                            opacity: icon.opacity,
                            transform: `rotate(${icon.rotation})`,
                            filter: 'blur(3px)',
                            pointerEvents: 'none',
                        }}/>
                    ))}

                    {isLogged ? null : (
                        <>
                            <div style={{width: '80%', margin: '10%', cursor: 'pointer'}} onClick={goToHome}>
                                <BookSocialTitle level={1}
                                                 text={"Welcome to **bookSocial**, the social network for books!"}/>
                                <Spacer size={16}/>
                                <BookSocialTitle level={3}
                                                 text={'Feel free to publish all your thoughts and fantasies about the literary world.'}
                                                 color={paletteColors.textColorStrong}/>
                            </div>
                            <BookSocialPrimaryButton buttonText="Explore" onClick={goToDiscovery} isExpanded={true}/>
                        </>
                    )}
                </div>
            </Box>
            <Box sx={{padding: '32px', backgroundColor: paletteColors.background_color}}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12}>
                        <BookSocialTitle level={2} text={'Discover New Books'} textAlign={"center"}/>
                        <BookSocialTitle level={3} color={paletteColors.textColorStrong} textAlign={"center"}
                                         text={'Discover the latest new releases, find books by your favourite author, find books in your favourite genres. Immerse yourself in a world of fantasy and wisdom.'}/>
                        <Spacer size={16}/>
                        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            {bookCovers.map((cover, index) => (
                                <Box key={index} sx={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
                                    margin: '16px',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    }
                                }}>
                                    <img
                                        src={cover}
                                        alt={`Book cover ${index + 1}`}
                                        style={{
                                            width: '200px',
                                            height: '300px',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Spacer size={24} />
                        <BookSocialTitle level={2} text={"Explore New Posts"} textAlign={"center"} />
                        <BookSocialTitle
                            level={3}
                            color={paletteColors.textColorStrong}
                            textAlign={"center"}
                            text={"Dive into thoughts, reviews, and recommendations from our community!"}
                        />
                        <Spacer size={16} />
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            {posts.map((post, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        margin: "16px",
                                        transition: "transform 0.2s",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                        },
                                        cursor: "pointer",
                                    }}
                                >
                                    <CardVisualizePost
                                        author={post.author}
                                        authorImage={post.authorImage}
                                        title={post.title}
                                        content={post.content}
                                        hashtags={post.hashtags}
                                        image={post.image}
                                    />
                                </Box>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default LandingPage;
