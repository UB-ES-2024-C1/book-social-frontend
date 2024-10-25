import React, {useEffect, useState} from 'react';
import paletteColors from "../resources/palette";
import {FaBook} from 'react-icons/fa';
import book1 from '../assets/books/book1.jpg';
import book2 from '../assets/books/book2.jpg';
import book3 from '../assets/books/book3.jpg';
import book4 from '../assets/books/book4.jpg';
import book5 from '../assets/books/book5.jpg';
import post1 from '../assets/posts/post1.png';

const HomePage = ({isLogged}) => {
    const [fadeIn, setFadeIn] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
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

    const postImage = [post1];

    return (
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

            {isLogged ? null : (
                <>
                    <h1 style={{
                        fontSize: '2.5em',
                        maxWidth: '600px',
                        lineHeight: '1.4',
                        background: `linear-gradient(135deg, ${paletteColors.primary}, ${paletteColors.secondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '3px 3px 10px rgba(0, 0, 0, 0.3)',
                        opacity: fadeIn ? 1 : 0,
                        transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease',
                    }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Welcome everyone to bookSocial, the social network for books!
                    </h1>

                    <button onClick={openPopup} style={{
                        marginTop: '20px',
                        padding: '12px 24px',
                        fontSize: 'medium',
                        color: paletteColors.textColor,
                        background: `linear-gradient(135deg, ${paletteColors.primary}, ${paletteColors.secondary})`,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        transition: 'background 0.3s ease, transform 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        Explore
                    </button>

                    {isPopupOpen && (
                        <div style={{
                            position: 'fixed',
                            top: '50%',
                            left: '60%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #e0e0e0, #c0c0c0)',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                width: '100%',
                                position: 'relative',
                            }}>
                                <button onClick={closePopup} style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '30px',
                                    cursor: 'pointer',
                                    color: paletteColors.background_color,
                                    transition: 'color 0.3s ease',
                                }} onMouseEnter={(e) => e.target.style.color = paletteColors.background_color}
                                        onMouseLeave={(e) => e.target.style.color = paletteColors.background_color}>
                                    &times;
                                </button>

                                <h2 style={{
                                    marginBottom: '10px', fontSize: 'medium', color: 'black'
                                }}>Discover New Books</h2>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '10px'
                                }}>
                                    {bookCovers.map((cover, index) => (
                                        <img key={index} src={cover} alt={`Book cover ${index + 1}`} style={{
                                            width: '100px',
                                            height: '150px',
                                            margin: '5px',
                                            borderRadius: '5px',
                                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                                        }}/>
                                    ))}
                                </div>
                                <h2 style={{
                                    marginBottom: '10px', fontSize: 'medium', color: 'black'
                                }}>Create New Posts</h2>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '10px',
                                    width: '100%',
                                    height: '200px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}>
                                    <img src={postImage[0]} alt="Post cover" style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '5px',
                                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    }}/>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;
