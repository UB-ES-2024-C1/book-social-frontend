import React, {useRef, useState} from "react";
import {Avatar, Box, Button, Dialog, DialogActions, DialogContent, Snackbar, Typography,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import paletteColors from "../resources/palette";
import BookSocialTextField from "../components/BookSocialTextField";
import BookSocialPrimaryButton from "../components/BookSocialPrimaryButton";
import BookList from "../components/BookList";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import useProfile from "../hooks/profile/profile";

const Profile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const containerRef = useRef(null);

    const [description, setDescription] = useState(
        "Book lover and avid reader."
    );
    const [name, setName] = useState("Núria Pallejà");
    const [username, setUsername] = useState("nuriapalleja");
    const {profile, loading, error, fetchProfile} = useProfile();

    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage errorMessage={error} onClick={() => fetchProfile()}/>;
    }

    const handleImageChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (type === "profile") {
                    //setProfileImage(reader.result);
                } else if (type === "cover") {
                    //setCoverImage(reader.result);
                }
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    };

    const handleSaveChanges = () => {
        //cridar upadte back i mostrar dialog de error
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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                width: "100%",
                height: "100%",
                flexGrow: 1,
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: 200,
                    backgroundImage: `url(${profile.coverImage})`,
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
            <Box sx={{position: "relative"}}>
                <Avatar
                    src={profile.image}
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
            <Typography
                variant="h4"
                sx={{
                    marginTop: "20px",
                    fontWeight: "bold",
                    color: paletteColors.color_primary,
                }}
            >
                {profile.name}
            </Typography>
            <Typography
                sx={{
                    color: "white",
                    marginTop: "10px",
                }}
            >
                @{profile.username}
            </Typography>
            <Typography
                sx={{
                    color: "white",
                    marginTop: "10px",
                }}
            >
                {profile.description}
            </Typography>
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
                        value={profile.name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{marginBottom: '16px'}}
                    />
                    <BookSocialTextField
                        label="Username"
                        type="text"
                        fullWidth
                        value={profile.username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{marginBottom: '16px'}}
                    /> <BookSocialTextField
                    label="Description"
                    type="text"
                    fullWidth
                    value={profile.description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                    <BookSocialPrimaryButton onClick={toggleModal} buttonText={"Cancel"}/>
                    <BookSocialPrimaryButton onClick={handleSaveChanges} buttonText={"Save"}/>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Profile updated successfully!"
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            />
            <BookList title="Posts published" books={profile.books}/>
        </div>
    );
};

export default Profile;
