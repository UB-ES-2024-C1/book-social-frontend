import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Spacer} from "../resources/spacer";
import Grid from "@mui/material/Grid2";
import BookSocialImage from "../components/Image";
import BookSocialRating from "../components/Rating";
import BookSocialAccordion from "../components/Accordion";
import BookSocialTitle from "../components/BookSocialTitle";
import BookSocialText from "../components/BookSocialText";
import paletteColors from "../resources/palette";
import BookSocialChip from "../components/Chip";
import BookSocialLinealRating from "../components/LinealRating";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import useBook from "../hooks/book/book";
import {Box, Rating, Snackbar, TextField} from "@mui/material";
import {AiOutlineArrowLeft} from "react-icons/ai";
import NavAppBar from "../components/NavAppBar";
import BookSocialPrimaryButton from "../components/BookSocialPrimaryButton";
import StarIcon from "@mui/icons-material/StarBorder";
import Divider from "@mui/material/Divider";
import useReviews from "../hooks/reviews";
import CardVisualizeReview from "../components/CardVisualizeReview";
import BookSocialSaveButton from "../components/SaveButton";

const BookDetailsPage = () => {
    const {id} = useParams();
    const {book, loading, error, fetchBook} = useBook(id);
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const {loading: loadingReview, addResponse, bookReviews, addReview} = useReviews({bookId: id});

    console.log("localStorage.getItem('role')", localStorage.getItem('role'));

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handlePublishReview = async () => {
        // Aquí puedes agregar lógica para enviar la reseña a la API o base de datos.
        console.log('Review published', {rating, comment});
        // Resetear valores después de publicar la reseña
        await addReview(rating, comment);
        setSnackbarOpen(true);
        setRating(0);
        setComment('');
    };


    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage errorMessage={error} onClick={() => fetchBook()}/>;
    }

    const defaultBookImage = "https://terracehospice.org/wp-content/uploads/2024/05/default_book_cover_2015.jpg"

    // Aquí aplicamos la lógica para manejar las imágenes
    const imageUrl = book.image
        ? (book.image.startsWith('http') || book.image.startsWith('https')) // Si es URL
            ? book.image
            : `data:image/jpeg;base64,${book.image}` // Si es Base64
        : defaultBookImage; // Si no tiene imagen, usamos la predeterminada

    return (
        <div style={{
            background: paletteColors.background_color,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: '68px',
        }}>
            <NavAppBar/>
            <Spacer size={24}/>
            <button
                onClick={() => navigate('/home')}
                style={{
                    marginLeft: '24px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: paletteColors.textColorStrong,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    fontSize: '25px',
                }}
            >
                <AiOutlineArrowLeft size={24} style={{marginRight: '8px'}}/>
                Back
            </button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={addResponse}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            />
            <Grid container spacing={6} justifyContent="center" alignItems="flex-start">
                <Grid item size={2} style={{
                    justifyContent: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}>
                    <BookSocialImage size="lg" url={imageUrl}/>
                    <Spacer size={24}/>
                    <BookSocialRating value={book.goodReadsMeanRating || 0}/>
                    <Spacer size={24}/>
                    <div style={{alignSelf: 'flex-start'}}>
                        <BookSocialTitle level={4} text="Additional Info" textAlign="left"
                                         color={paletteColors.textColorWeakest}/>
                        <Spacer size={16}/>
                        <BookSocialText level="medium" text={`**ISBN**: ${book.ISBN}`} style={{textAlign: 'left'}}
                                        color={paletteColors.textColorStrong}/>
                        <Spacer size={8}/>
                        <BookSocialText level="medium" text={`**Language**: ${book.language}`}
                                        style={{textAlign: 'left'}} color={paletteColors.textColorStrong}/>
                        <Spacer size={8}/>
                        <BookSocialText level="medium" text={`**Published**: ${book.published}`}
                                        style={{textAlign: 'left'}} color={paletteColors.textColorStrong}/>
                        <Spacer size={8}/>
                        <BookSocialText level="medium" text={`**Edition**: ${book.edition}`} style={{textAlign: 'left'}}
                                        color={paletteColors.textColorStrong}/>
                        <Spacer size={8}/>
                    </div>
                </Grid>
                <Grid item size={8}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <BookSocialTitle level={2} text={book.title} textAlign="left"/>
                        <BookSocialSaveButton id={id}/>
                    </Box>
                    <Spacer size={16}/>

                    <BookSocialTitle level={4} text={
                        book.authorName && book.coauthorName
                            ? `${book.authorName}, ${book.coauthorName}`
                            : book.authorName || book.coauthorName
                    } textAlign="left" color={paletteColors.textColor_weakest}/>
                    <Spacer size={24}/>
                    <BookSocialText level="large" text={book.synopsis} style={{textAlign: 'justify'}}/>
                    <Spacer size={24}/>
                    {book.authorDescription && (
                        <BookSocialAccordion title="About the author" body={book.authorDescription}/>
                    )}
                    <Spacer size={24}/>
                    <BookSocialTitle level={4} text="Genres" textAlign="left"/>
                    <Spacer size={16}/>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-start'}}>
                        {book.genres.map((genre, index) => (
                            <BookSocialChip key={index} size="md" text={genre}/>
                        ))}
                    </div>
                    <Spacer size={24}/>
                    <BookSocialTitle level={4} text="Summary of ratings" textAlign="left"/>
                    <Spacer size={16}/>
                    <BookSocialRating value={book.goodReadsMeanRating} showLabel={false}
                                      numberRatings={book.goodReadsNumberRating}/>
                    <Spacer size={16}/>
                    <BookSocialLinealRating value={book.goodReadsSummaryRatings.fiveStars}
                                            total={book.goodReadsNumberRating} title="5 stars"/>
                    <Spacer size={8}/>
                    <BookSocialLinealRating value={book.goodReadsSummaryRatings.fourStars}
                                            total={book.goodReadsNumberRating} title="4 stars"/>
                    <Spacer size={8}/>
                    <BookSocialLinealRating value={book.goodReadsSummaryRatings.threeStars}
                                            total={book.goodReadsNumberRating} title="3 stars"/>
                    <Spacer size={8}/>
                    <BookSocialLinealRating value={book.goodReadsSummaryRatings.twoStars}
                                            total={book.goodReadsNumberRating} title="2 stars"/>
                    <Spacer size={8}/>
                    <BookSocialLinealRating value={book.goodReadsSummaryRatings.oneStars}
                                            total={book.goodReadsNumberRating} title="1 star"/>

                    {/* New Section: Add Your Review */}
                    {
                        localStorage.getItem('role') === "reader" && (<div>
                            <Spacer size={24}/>
                            <BookSocialTitle level={4} text="Add Your Review" textAlign="left"/>
                            <Spacer size={16}/>
                            <Rating
                                name="selectable-rating"
                                value={rating}
                                onChange={handleRatingChange}
                                precision={0.25}
                                size={"large"}
                                emptyIcon={<StarIcon sx={{
                                    color: paletteColors.textColor_weakest,
                                    opacity: 0.55,
                                    fontSize: 'inherit'
                                }}/>}
                            />
                            <Spacer size={16}/>
                            <TextField
                                label={"Left here your opinion"}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={comment}
                                data-testid={'opinion-input'}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: paletteColors.textColorStrong,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: paletteColors.color_primary,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: paletteColors.color_primary,
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: paletteColors.textColorStrong,
                                        fontFamily: 'Roboto',
                                        fontSize: '1.5rem',
                                        '&.Mui-focused': {
                                            color: paletteColors.textColorStrong,
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: paletteColors.textColorWeakest,
                                        fontFamily: 'Roboto',
                                        fontSize: '1rem',
                                    },
                                }}
                                onChange={handleCommentChange}
                            />
                            <Spacer size={16}/>
                            <BookSocialPrimaryButton
                                onClick={handlePublishReview}
                                isLoading={loadingReview}
                                buttonText={"Publish My Review"}
                                dataTestId={'publish-button'}
                            />
                        </div>)
                    }
                    <Spacer size={24}/>
                    <BookSocialTitle
                        level={4}
                        text={"Community Reviews"}
                        textAlign={"left"}
                        sx={{margin: "20px"}}
                    />
                    <Divider color={"#ddd"} style={{margin: '10px 0'}}/>
                    <Spacer size={6}/>
                    {bookReviews.length > 0 && bookReviews.map((review, index) => (
                        <div key={index} style={{marginBottom: '16px'}}>
                            <CardVisualizeReview review={review}/>
                        </div>
                    ))}

                    {bookReviews.length === 0 && (
                        <BookSocialText level={"p"} text={"No community reviews available yet"}
                                        color={paletteColors.textColorStrong}/>
                    )}


                </Grid>
            </Grid>
            <Spacer size={64}/>
        </div>
    );
};

export default BookDetailsPage;
