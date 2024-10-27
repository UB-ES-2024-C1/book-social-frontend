import React, {useEffect, useState} from 'react';
import book1 from '../assets/books/book1.jpg';
import book2 from '../assets/books/book2.jpg';
import book3 from '../assets/books/book3.jpg';
import book4 from '../assets/books/book4.jpg';
import book5 from '../assets/books/book5.jpg';
import post from '../assets/posts/post.png';
import Box from "@mui/material/Box";
import paletteColors from "../resources/palette";
import {FaBook} from "react-icons/fa";
import BookSocialPrimaryButton from "../components/BookSocialPrimaryButton";
import * as routes from "../resources/routes_name";
import {useNavigate} from "react-router-dom";
import BookSocialTitle from "../components/BookSocialTitle";
import {Spacer} from "../resources/spacer";

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

    const bookCovers = [
        book1, book2, book3, book4, book5
    ];

    const postImage = [post];

    return (
        <Box
            sx={{
                width: '100vw',
                height: '200vh',
                scrollSnapType: 'y mandatory',
                overflowY: 'scroll',
                background: paletteColors.background_color,
            }}
        >
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    scrollSnapAlign: 'start',
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
                            color: paletteColors.primary,
                            opacity: icon.opacity,
                            transform: `rotate(${icon.rotation})`,
                            filter: 'blur(3px)',
                            pointerEvents: 'none',
                        }}/>
                    ))}

                    {/*TODO add missing navbar*/}

                    {isLogged ? null : (
                        <>
                            <div style={{width: '80%', margin: '10%'}} onClick={goToHome}>
                                <BookSocialTitle
                                    level={1}
                                    text={'Welcome everyone to bookSocial, the social network for books!'}
                                />
                                <Spacer size={16}/>
                                <BookSocialTitle
                                    level={2}
                                    text={'Feel free to publish all your thoughts and fantasies about the literary world.'}
                                    color={paletteColors.textColorStrong}
                                />
                            </div>
                            <BookSocialPrimaryButton
                                buttonText="Explore"
                                onClick={goToDiscovery}
                                isExpanded={true}
                            />
                        </>
                    )}
                </div>
            </Box>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column', // Arrange children in a column
                    alignItems: 'start',
                    scrollSnapAlign: 'start',
                    padding: '5% 5%',
                }}
            >
                <>
                    <BookSocialTitle level={2} text={'Discover New Books'}/>
                    <Spacer size={16}/>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',
                        flexWrap: 'wrap', // Allow wrapping if needed
                    }}
                         onClick={goToDiscovery}
                    >
                        {bookCovers.map((cover, index) => (
                            <img key={index} src={cover} alt={`Book cover ${index + 1}`} style={{
                                width: 'auto',
                                height: '360px',
                                margin: '16px',
                                borderRadius: '5px',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                            }}/>
                        ))}
                    </div>
                    <Spacer size={24}/>
                    <BookSocialTitle level={2} text={'Create New Posts'}/>
                    <Spacer size={16}/>
                    {/*TODO add more images and fix the size to look prettier and not empty landing*/}
                    <div style={{
                        display: 'flex',
                        marginTop: '10px',
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden',
                        position: 'relative',
                    }} onClick={goToHome}>
                        <img src={postImage[0]} alt="Post cover" style={{
                            width: 'auto',
                            height: 'auto',
                            borderRadius: '5px',
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                        }}/>
                    </div>
                </>
            </Box>
        </Box>
    );
};

export default LandingPage;
