import React from 'react';
import {useParams} from 'react-router-dom';
import PageContainer from "../components/PageContainer";
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

const BookDetailsPage = () => {
    const {id} = useParams();
    const {book, loading, error, fetchBook} = useBook(id);

    if (loading) {
        return <LoadingPage/>;
    }

    if (error) {
        return <ErrorPage errorMessage={error} onClick={() => fetchBook()}/>;
    }

    return (
        <PageContainer children={
            <div>
                <Grid container spacing={6} justifyContent="center" alignItems={"start"}>
                    <Grid item size={2} style={{
                        alignItems: "center", justifyContent: "center", display: "flex",
                        flexDirection: "column",
                    }}>
                        <BookSocialImage size={"lg"} url={book.image}/>
                        <Spacer size={24}/>
                        <BookSocialRating value={book.goodReadsMeanRating || 0}/>
                        <Spacer size={24}/>
                        <div style={{alignSelf: "flex-start"}}>
                            <BookSocialTitle level={4} text="Additional Info" textAlign="left"
                                             color={paletteColors.textColorWeakest}/>
                            <Spacer size={16}/>
                            <BookSocialText level="medium" text={`**ISBN**: ${book.ISBN}`}
                                            style={{textAlign: "left"}} color={paletteColors.textColorStrong}/>
                            <Spacer size={8}/>
                            <BookSocialText level="medium" text={`**ASIN**: ${book.ASIN}`}
                                            style={{textAlign: "left"}} color={paletteColors.textColorStrong}/>
                            <Spacer size={8}/>
                            <BookSocialText level="medium" text={`**Language**: ${book.language}`}
                                            style={{textAlign: "left"}} color={paletteColors.textColorStrong}/>
                            <Spacer size={8}/>
                            <BookSocialText level="medium" text={`**Published**: ${book.published}`}
                                            style={{textAlign: "left"}} color={paletteColors.textColorStrong}/>
                            <Spacer size={8}/>
                            <BookSocialText level="medium" text={`**Edition**: ${book.edition}`}
                                            style={{textAlign: "left"}} color={paletteColors.textColorStrong}/>
                            <Spacer size={8}/>
                        </div>
                    </Grid>
                    <Grid item size={8}>
                        <BookSocialTitle level={2} text={book.title} textAlign={"left"}/>
                        <Spacer size={16}/>
                        <BookSocialTitle
                            level={4}
                            text={
                                book.authorName && book.coauthorName
                                    ? `${book.authorName}, ${book.coauthorName}`
                                    : book.authorName || book.coauthorName
                            }
                            textAlign={"left"}
                            color={paletteColors.textColor_weakest}
                        />

                        <Spacer size={24}/>
                        <BookSocialText level={"large"} text={book.synopsis} style={{textAlign: "justify"}}/>
                        <Spacer size={24}/>
                        {book.authorDescription && (
                            <BookSocialAccordion title={"About the author"} body={book.authorDescription}/>
                        )}
                        <Spacer size={24}/>
                        <BookSocialTitle level={4} text={"Genres"}
                                         textAlign={"left"}/>
                        <Spacer size={16}/>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-start'}}>
                            {book.genres.map((genre, index) => (
                                <BookSocialChip key={index} size={"md"} text={genre}/>
                            ))}
                        </div>
                        <Spacer size={24}/>
                        <BookSocialTitle level={4} text={"Summary of ratings"}
                                         textAlign={"left"}/>
                        <Spacer size={16}/>
                        <BookSocialRating value={book.goodReadsMeanRating} showLabel={false}
                                          numberRatings={book.goodReadsNumberRating}/>
                        <Spacer size={16}/>
                        <BookSocialLinealRating value={book.goodReadsSummaryRatings.fiveStarts}
                                                total={book.goodReadsNumberRating} title={"5 starts"}/>
                        <Spacer size={8}/>
                        <BookSocialLinealRating value={book.goodReadsSummaryRatings.fourStarts}
                                                total={book.goodReadsNumberRating} title={"4 starts"}/>
                        <Spacer size={8}/>
                        <BookSocialLinealRating value={book.goodReadsSummaryRatings.threeStarts}
                                                total={book.goodReadsNumberRating} title={"3 starts"}/>
                        <Spacer size={8}/>
                        <BookSocialLinealRating value={book.goodReadsSummaryRatings.twoStarts}
                                                total={book.goodReadsNumberRating} title={"2 starts"}/>
                        <Spacer size={8}/>
                        <BookSocialLinealRating value={book.goodReadsSummaryRatings.oneStarts}
                                                total={book.goodReadsNumberRating} title={"1 start"}/>
                    </Grid>
                </Grid>
                <Spacer size={100}/>
            </div>
        }/>
    );
};

export default BookDetailsPage;
