import React, {useEffect, useRef, useState} from "react";
import BookSocialTitle from "../components/BookSocialTitle";
import Box from '@mui/material/Box';
import CardvisualizeBook from "../components/CardVisualizeBook";
import book1 from '../assets/books/book1.jpg';
import book2 from '../assets/books/book2.jpg';
import book3 from '../assets/books/book3.jpg';
import book4 from '../assets/books/book4.jpg';
import book5 from '../assets/books/book5.jpg';
import {Card, Typography} from '@mui/material';
import paletteColors from "../resources/palette";

const HomePage = ({isLogged}) => {
    const containerRef = useRef(null);
    const [scrollX, setScrollX] = useState(0);

    const handleMouseMove = (event) => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const contentWidth = containerRef.current.scrollWidth;
            const maxScroll = contentWidth - containerWidth;

            const cursorPosition = event.clientX;
            const scrollPercentage = cursorPosition / window.innerWidth;

            setScrollX(scrollPercentage * maxScroll);
        }
    };

    useEffect(() => {
        const container = containerRef.current;

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo(scrollX, 0);
        }
    }, [scrollX]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                marginTop: "68px",
                marginLeft: "240px",
            }}
        >
            <Card
                sx={{
                    fontFamily: 'Roboto, Arial, sans-serif',
                    padding: "20px",
                    marginBottom: "40px",
                    borderRadius: 10,
                    backgroundColor: paletteColors.color_primary_weak,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" color="white">
                    Welcome Joshua to bookSocial!!
                </Typography>
            </Card>

            <div style={{width: "100%", marginTop: "40px", alignItems: 'flex-start'}}>
                <BookSocialTitle level={4} text={<>Books of your favourite genre</>}/>

                <div
                    ref={containerRef}
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        overflowX: 'hidden',
                        gap: '16px',
                        padding: '16px 30px',
                        scrollBehavior: 'smooth',
                    }}
                >
                    {[{
                        image: book1,
                        title: "Cuando reescribamos la historia",
                        author: "Belén Martínez",
                        summary: "HACE VARIOS AÑOS… Julen e Ibai eran inseparables. Amigos que compartían clase...",
                        rating: 4.5
                    }, {
                        image: book2,
                        title: "Muertes perfectamente evitables",
                        author: "Deirdre Sullivan",
                        summary: "Las gemelas Maddy y Catlin acaban de mudarse a Ballyfrann, un pueblo...",
                        rating: 3.0
                    }, {
                        image: book3,
                        title: "La sombra del viento",
                        author: "Carlos Ruiz Zafón",
                        summary: "En la Barcelona de la postguerra, un joven llamado Daniel descubre un libro...",
                        rating: 5.0
                    }, {
                        image: book4,
                        title: "Cien años de soledad",
                        author: "Gabriel García Márquez",
                        summary: "La historia de la familia Buendía, que vive en el pueblo ficticio de Macondo...",
                        rating: 4.8
                    }, {
                        image: book5,
                        title: "1984",
                        author: "George Orwell",
                        summary: "En una sociedad totalitaria gobernada por el Gran Hermano, Winston Smith lucha por mantener su libertad...",
                        rating: 4.7
                    }].map((book, index) => (
                        <Box
                            key={index}
                            sx={{
                                margin: '16px',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                                cursor: 'pointer',
                            }}
                        >
                            <CardvisualizeBook
                                image={book.image}
                                title={book.title}
                                author={book.author}
                                summary={book.summary}
                                rating={book.rating}
                            />
                        </Box>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
