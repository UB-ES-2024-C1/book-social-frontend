import React, {useRef} from "react";
import BookSocialTitle from "../components/BookSocialTitle";
import Box from "@mui/material/Box";
import CardvisualizeBook from "../components/CardVisualizeBook";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import book1 from "../assets/books/book1.jpg";
import book2 from "../assets/books/book2.jpg";
import book3 from "../assets/books/book3.jpg";
import book4 from "../assets/books/book4.jpg";
import book5 from "../assets/books/book5.jpg";
import userImage from "../assets/books/book.svg";
import paletteColors from "../resources/palette";


// Reusable component for book list
const BookList = ({title, books}) => {
    const containerRef = useRef(null);

    const scrollContainer = (direction) => {
        if (containerRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            containerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div style={{width: "100%", marginTop: "40px", alignItems: "flex-start"}}>
            <BookSocialTitle
                level={4}
                text={title}
                textAlign={"left"}
                sx={{margin: "20px"}}
            />
            <Box
                sx={{
                    width: "98%",
                    height: "1px",
                    backgroundColor: "#ddd",
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    width: "100%",
                }}
            >
                <IconButton
                    onClick={() => scrollContainer("left")}
                    sx={{
                        position: "absolute",
                        left: 10,
                        zIndex: 1,
                        backgroundColor: paletteColors.color_primary,
                        color: "white",
                        "&:hover": {backgroundColor: "rgba(120,58,236,0.35)"},
                    }}
                >
                    <ArrowBackIosIcon/>
                </IconButton>
                <div
                    ref={containerRef}
                    style={{
                        display: "flex",
                        overflowX: "hidden",
                        scrollBehavior: "smooth",
                        gap: "16px",
                        padding: "16px 30px",
                    }}
                >
                    {books.map((book, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: "0 0 auto",
                                transition: "transform 0.2s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                                cursor: "pointer",
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
                <IconButton
                    onClick={() => scrollContainer("right")}
                    sx={{
                        position: "absolute",
                        right: 10,
                        zIndex: 1,
                        backgroundColor: paletteColors.color_primary,
                        color: "white",
                        "&:hover": {backgroundColor: "rgba(120,58,236,0.35)"},
                    }}
                >
                    <ArrowForwardIosIcon/>
                </IconButton>
            </Box>
        </div>
    );
};

const HomePage = () => {
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
                    }}
                />
                <BookSocialTitle level={1} text={"Welcome Núria!"}/>
            </div>
            <BookList title="Books of your favourite genre" books={books}/>
            <BookList title="Books recently added" books={books}/>
            <BookList title="Most popular books" books={books}/>
        </div>
    );

};

export default HomePage;
