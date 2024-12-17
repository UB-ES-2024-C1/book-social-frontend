import React, {useRef} from "react";
import BookSocialTitle from "./BookSocialTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import paletteColors from "../resources/palette";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardvisualizeBook from "./CardVisualizeBook";

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
            {title && title.trim() !== "" && (
                <div>
                    <BookSocialTitle
                        level={4}
                        text={title}
                        textAlign={"left"}
                        sx={{margin: "20px"}}
                    /> <Box
                    sx={{
                        width: "98%",
                        height: "1px",
                        backgroundColor: "#ddd",
                    }}
                /></div>

            )}
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
                    {books.map((book, index) => {
                        //console.log(`book ${index}`); // Imprime el contenido de cada libro en la consola
                        // console.log(book); // Imprime el contenido de cada libro en la consola
                        return (
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
                                    id={book.id}
                                    image={book.image}
                                    title={book.title}
                                    author={book.author || book.authorName}
                                    summary={book.summary || book.synopsis}
                                    rating={book.rating || book.googleAverageRating}
                                />
                            </Box>
                        );
                    })}
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

export default BookList;