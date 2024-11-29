import React, {useRef, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Snackbar,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import paletteColors from "../resources/palette";
import CardvisualizeBook from "../components/CardVisualizeBook";
import errorImage from "../assets/no_image_available.png";
import BookSocialTextField from "../components/BookSocialTextField";
import BookSocialPrimaryButton from "../components/BookSocialPrimaryButton";

const Profile = () => {
    const [profileImage, setProfileImage] = useState(
        "https://via.placeholder.com/150" // Imagen de perfil por defecto
    );
    const [coverImage, setCoverImage] = useState(
        "https://via.placeholder.com/800x200" // Imagen de portada por defecto
    );
    const [description, setDescription] = useState(
        "Book lover and avid reader."
    );
    const [name, setName] = useState("Núria Pallejà");
    const [username, setUsername] = useState("nuriapalleja");
    const [openModal, setOpenModal] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const containerRef = useRef(null);
    const savedBooks = [
        {
            image: errorImage,
            title: "Book 1",
            author: "Author 1",
            summary: "This is a summary of Book 1.",
            rating: 4.5,
        },
        {
            image: errorImage,
            title: "Book 2",
            author: "Author 2",
            summary: "This is a summary of Book 2.",
            rating: 4.0,
        },
        {
            image: errorImage,
            title: "Book 3",
            author: "Author 3",
            summary: "This is a summary of Book 3.",
            rating: 3.5,
        },
    ];

    const handleImageChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (type === "profile") {
                    setProfileImage(reader.result);
                } else if (type === "cover") {
                    setCoverImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    };

    const handleSaveChanges = () => {
        setSnackbarOpen(true);
        toggleModal();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                overflow: "hidden",
                flexGrow: 1,

            }}
        >
            {/* Imagen de portada */}
            <Box
                sx={{
                    width: "100%",
                    height: 200,
                    backgroundImage: `url(${coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,

                }}
            >
                <Button
                    component="label"
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        backgroundColor: paletteColors.color_primary,
                        color: "#fff",
                        borderRadius: "20px",
                        padding: "6px 12px",
                        fontSize: "12px",
                        "&:hover": {
                            backgroundColor: "rgba(120,58,236,0.7)",
                        },
                    }}
                >
                    Change Cover
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) => handleImageChange(event, "cover")}
                    />
                </Button>
            </Box>

            {/* Imagen de perfil */}
            <Box sx={{position: "relative"}}>
                <Avatar
                    src={profileImage}
                    alt="Profile"
                    sx={{
                        width: 150,
                        height: 150,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                />
                <Button
                    component="label"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: paletteColors.color_primary,
                        color: "#fff",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        minWidth: 0,
                        "&:hover": {
                            backgroundColor: "rgba(120,58,236,0.7)",
                        },
                    }}
                >
                    <EditIcon/>
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(event) => handleImageChange(event, "profile")}
                    />
                </Button>
            </Box>

            {/* Nombre y Username */}
            <Typography
                variant="h4"
                sx={{
                    marginTop: "20px",
                    fontWeight: "bold",
                    color: paletteColors.color_primary,
                }}
            >
                {name}
            </Typography>
            <Typography
                sx={{
                    color: "white",
                    marginTop: "10px",
                }}
            >
                @{username}
            </Typography>
            <Typography
                sx={{
                    color: "white",
                    marginTop: "10px",
                }}
            >
                {description}
            </Typography>

            {/* Botón de editar perfil */}
            <Button
                variant="contained"
                onClick={toggleModal}
                sx={{
                    marginTop: "20px",
                    backgroundColor: paletteColors.color_primary,
                    "&:hover": {
                        backgroundColor: "rgba(120,58,236,0.7)",
                    },
                    borderRadius: "20px"
                }}
            >
                Edit Profile
            </Button>

            {/* Modal para editar perfil */}
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: paletteColors.color_primary_weak,
                        color: paletteColors.textColor,
                    },
                }}
            >
                <DialogContent>
                    <BookSocialTextField
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{marginBottom: '16px'}}
                    />
                    <BookSocialTextField
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{marginBottom: '16px'}}
                    /> <BookSocialTextField
                    label="Description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                    <BookSocialPrimaryButton onClick={toggleModal} buttonText={"Cancel"}/>
                    <BookSocialPrimaryButton onClick={handleSaveChanges} buttonText={"Save"}/>
                </DialogActions>
            </Dialog>

            {/* Snackbar de notificación */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Profile updated successfully!"
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            />

            {/* Lista de libros guardados */}
            <Box sx={{width: "100%", marginTop: "40px"}}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: paletteColors.color_primary,
                        marginBottom: "10px",
                        textAlign: "left",
                    }}
                >
                    Saved Books
                </Typography>
                <Box
                    sx={{
                        width: "98%",
                        height: "1px",
                        backgroundColor: "#ddd",
                        marginBottom: "20px",
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
                        {savedBooks.map((book, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: "0 0 auto",
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <CardvisualizeBook
                                    title={book.title}
                                    author={book.author}
                                    image={book.image}
                                    rating={book.rating}
                                    summary={book.summary}
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
            </Box>
        </Box>
    );
};

export default Profile;
