import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Snackbar,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import paletteColors from "../resources/palette";
import BookSocialTextField from "../components/BookSocialTextField";
import BookSocialPrimaryButton from "../components/BookSocialPrimaryButton";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import useProfile from "../hooks/profile/profile";
import BookList from "../components/BookList";
import defaultCoverImage from '../assets/portada.jpeg';
import usePosts from "../hooks/posts/posts";
import CardVisualizePost from "../components/CardVisualizePost";
import {Spacer} from "../resources/spacer";
import useReviews from "../hooks/reviews";
import CardVisualizeReview from "../components/CardVisualizeReview";
import BookSocialText from "../components/BookSocialText";
import useBooks from "../hooks/books";

const Profile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const {booksAuthor, loading: loadingBooks, error: errorBooks} = useBooks("", false, true);

    const {
        loading: loadingReview,
        userReviews,
    } = useReviews({userId: localStorage.getItem('profileId')});

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const [localProfile, setLocalProfile] = useState({
        name: "",
        username: "",
        description: "",
        favGenre: "",
        books: []
    });

    const {profile, loading, error, fetchProfile, updateProfile, updateStatus} = useProfile();
    const {posts, loading: loadingPosts, error: errorPosts} = usePosts(null, profile?.id);

    useEffect(() => {
        if (profile) {
            setLocalProfile({
                name: profile.name || "",
                username: profile.username || "",
                description: profile.description || "",
                favGenre: profile.favGenre || "",
                image: profile.image || localStorage.getItem("profileImage") || "",
                coverImage: profile.coverImage || localStorage.getItem("coverImage") || defaultCoverImage,
                books: profile.books
            });
        }
    }, [profile]);

    if (loading) {
        return <LoadingPage/>;
    }

    if (error || errorPosts) {
        return <ErrorPage insideMainPage={true} errorMessage={error || errorPosts} onClick={() => fetchProfile()}/>;
    }

    const handleImageChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                if (type === "profile") {
                    localStorage.setItem("profileImage", imageData);
                    setLocalProfile((prev) => ({...prev, image: imageData}));
                } else if (type === "cover") {
                    localStorage.setItem("coverImage", imageData);
                    setLocalProfile((prev) => ({...prev, coverImage: imageData}));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    };

    const handleSaveChanges = async () => {
        await updateProfile(localProfile);
        setSnackbarMessage(updateStatus === "SUCCESS" ? "Profile updated successfully!" : "Failed to update profile.");
        setSnackbarOpen(true);
        toggleModal();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleInputChange = (field, value) => {
        setLocalProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            width: "100%",
            height: "100%",
            flexGrow: 1,
            boxSizing: "border-box"
        }}>
            {/* Cover image */}
            <Box sx={{
                width: "100%",
                height: 200,
                backgroundImage: `url(${localProfile.coverImage || defaultCoverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                top: 0,
                left: 0
            }}>
                <Button component="label" sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    backgroundColor: paletteColors.color_primary,
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    "&:hover": {backgroundColor: "rgba(120,58,236,0.7)",},
                }}>
                    Change Cover
                    <input type="file" hidden accept="image/*" onChange={(event) => handleImageChange(event, "cover")}/>
                </Button>
            </Box>

            {/* Profile image */}
            <Box sx={{position: "relative"}}>
                <Avatar src={localProfile.image} alt="Profile"
                        sx={{width: 150, height: 150, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}/>
                <Button component="label" sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: paletteColors.color_primary,
                    color: "#fff",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    minWidth: 0,
                    "&:hover": {backgroundColor: "rgba(120,58,236,0.7)",},
                }}>
                    <EditIcon/>
                    <input type="file" hidden accept="image/*"
                           onChange={(event) => handleImageChange(event, "profile")}/>
                </Button>
            </Box>

            {/* Profile details */}
            <Typography variant="h4" sx={{marginTop: "20px", fontWeight: "bold", color: paletteColors.color_primary}}>
                {profile.name}
            </Typography>
            <Typography sx={{color: "white", marginTop: "10px"}}>@{profile.username}</Typography>
            <Typography sx={{color: "white", marginTop: "10px"}}>Favourite Genre: {profile.favGenre}</Typography>
            <Typography sx={{color: "white", marginTop: "10px"}}>
                Description: <span
                style={{color: profile.description ? "white" : "gray"}}>{profile.description || "(Add your description)"}</span>
            </Typography>

            {/* Edit Profile button */}
            <Button variant="contained" onClick={toggleModal} sx={{
                marginTop: "20px",
                backgroundColor: paletteColors.color_primary,
                "&:hover": {backgroundColor: "rgba(120,58,236,0.7)",},
                borderRadius: "20px"
            }}>
                Edit Profile
            </Button>

            {/* Modal for editing profile */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth PaperProps={{
                sx: {
                    backgroundColor: paletteColors.color_primary_weak,
                    color: paletteColors.textColor,
                },
            }}>
                <DialogContent>
                    <BookSocialTextField label="Name" type="text" fullWidth value={localProfile.name}
                                         onChange={(e) => handleInputChange("name", e.target.value)}
                                         sx={{marginBottom: "16px"}}/>
                    <BookSocialTextField label="Username" type="text" fullWidth value={localProfile.username}
                                         onChange={(e) => handleInputChange("username", e.target.value)}
                                         sx={{marginBottom: "16px"}}/>
                    <BookSocialTextField label="Description" type="text" fullWidth value={localProfile.description}
                                         onChange={(e) => handleInputChange("description", e.target.value)}
                                         sx={{marginBottom: "16px"}}/>
                    <BookSocialTextField label="Favourite Genre" type="text" fullWidth value={localProfile.favGenre}
                                         onChange={(e) => handleInputChange("favGenre", e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <BookSocialPrimaryButton onClick={() => setOpenModal(false)} buttonText={"Cancel"}/>
                    <BookSocialPrimaryButton onClick={handleSaveChanges} buttonText={"Save"}/>
                </DialogActions>
            </Dialog>

            {/* Snackbar for success or failure message */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}
                      message={snackbarMessage} anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>

            <Spacer size={24}/>
            {/* Tabs for Books and Posts */}
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                    width: "100%",
                    marginBottom: "20px",
                    "& .MuiTab-root": {
                        fontWeight: "bold",
                    },
                    // Personalizar color del indicador
                    "& .MuiTabs-indicator": {
                        backgroundColor: paletteColors.color_primary,  // Usa tu color personalizado para el indicador
                    },
                    // Personalizar color del texto cuando la pestaña no está seleccionada
                    "& .MuiTab-textColorPrimary": {
                        color: paletteColors.textColor_weakest,  // Color cuando no está seleccionado
                    },
                    // Personalizar color del texto cuando la pestaña está seleccionada
                    "& .Mui-selected": {
                        color: paletteColors.color_primary,  // Color cuando está seleccionada
                    },
                }}
            >
                <Tab label={profile.role === "reader" ? "Your reviews" : "Books Published"}/>
                <Tab label="Your Posts"/>
            </Tabs>


            {/* Tab content */}


            {activeTab === 0 && (
                profile?.role === "reader" ? (
                    <Box sx={{marginTop: "20px"}}>
                        {userReviews.length > 0 ? (
                            userReviews.map((review, index) => (
                                <div key={index} style={{marginBottom: '16px'}}>
                                    <CardVisualizeReview review={review}/>
                                </div>
                            ))
                        ) : (
                            <BookSocialText level={"p"} text={"No reviews yet"} color={paletteColors.textColorStrong}/>
                        )}
                    </Box>
                ) : (
                    booksAuthor?.length > 0 ? (
                        <BookList title="" books={booksAuthor}/>
                    ) : (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "20px"
                        }}>
                            <Typography
                                sx={{color: paletteColors.textColor_weakest, fontSize: "16px", textAlign: "center"}}>
                                There is nothing available yet
                            </Typography>
                        </Box>
                    )
                )
            )}


            {activeTab === 1 && (
                posts.length > 0 ? (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px"
                    }}>
                        {posts.map((post) => (
                            <CardVisualizePost
                                key={post.id}
                                authorName={profile.name}
                                authorImage={profile.image}
                                title={post.title}
                                content={post.content}
                                hashtags={post.hashtags}
                                image={post.image}
                            />
                        ))}
                    </Box>
                ) : (
                    <Typography
                        sx={{color: paletteColors.textColor_weakest, fontSize: "16px", textAlign: "center"}}>
                        There is nothing available yet
                    </Typography>
                )
            )}

        </div>
    );
};

export default Profile;
