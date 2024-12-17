import PropTypes from "prop-types";
import useSavedBooks from "../hooks/saved_books";
import {Button, CircularProgress} from "@mui/material";
import paletteColors from "../resources/palette";
import React, {useEffect, useState} from "react";

const BookSocialSaveButton = ({id}) => { // Asegúrate de que `id` esté desestructurado correctamente
    const {loading, saveBook, savedBooks} = useSavedBooks();
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!loading) {
            const isSaved = savedBooks.some((book) => book.id.toString() === id.toString());
            setSaved(isSaved);
        }
    }, [loading, savedBooks, id]);

    const saveForLater = async (event) => {
        event.stopPropagation();
        const result = await saveBook(id);
        console.log('saved', result)
        setSaved(result);

    };

    return (
        <Button
            variant="contained"
            color={saved ? "success" : "primary"}
            onClick={saveForLater}
            sx={{
                mt: 1,
                alignSelf: "flex-end",
                fontSize: "0.8rem",
                textTransform: "none",
                backgroundColor: saved ? "#4caf50" : paletteColors.color_primary,
                position: "relative",
                minWidth: "120px",
                height: "40px",
            }}
            disabled={loading}
        >
            {loading ? (
                <CircularProgress
                    size={24}
                    sx={{
                        color: "white",
                        position: "absolute",
                    }}
                />
            ) : (
                <>{saved ? "Saved" : "Save"}</>
            )}
        </Button>
    );
};

BookSocialSaveButton.propTypes = {
    id: PropTypes.number.isRequired, // Validación requerida para id
};

export default BookSocialSaveButton;
