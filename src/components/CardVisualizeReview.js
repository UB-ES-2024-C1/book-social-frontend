import React, {useState} from 'react';
import {Avatar, Box, Card, CardContent, Tooltip, Typography} from '@mui/material';
import paletteColors from "../resources/palette";
import BookSocialRating from "./Rating";
import BookSocialText from "./BookSocialText";
import {Spacer} from "../resources/spacer";

const CardVisualizeReview = ({review}) => {
    const [isLoading, setIsLoading] = useState(true);

    const {rating, comment, authorName, authorImage, authorUsername, creationDate} = review;

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <Card sx={{
            fontFamily: 'Roboto, Arial, sans-serif',
            borderRadius: 10,
            boxShadow: 3,
            backgroundColor: paletteColors.background_header,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 2, // Agrega padding alrededor de toda la tarjeta
        }}>
            <CardContent sx={{display: 'flex', alignItems: 'flex-start', padding: 0}}>
                <Box sx={{display: 'flex', alignItems: 'center', marginRight: 2}}>
                    <Avatar alt={authorName} src={authorImage} sx={{width: 40, height: 40, marginRight: 1}}/>
                    <Tooltip title={authorName} placement="top" arrow>
                        <Typography variant="subtitle1" component="div" sx={{color: 'white', fontWeight: 'bold'}}>
                            {authorName}
                        </Typography>
                    </Tooltip>
                    <Typography variant="body2" sx={{color: 'gray', marginLeft: 1}}>
                        @{authorUsername}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', padding: '10px'}}>
                <BookSocialRating value={rating} size={"md"} date={creationDate} showLabel={false}/>
                <Spacer size={4}/>
                <BookSocialText level={"large"} text={comment ? comment : "No opinion provided."}
                                color={paletteColors.textColorWeakest}/>

            </Box>
        </Card>
    );
};

export default CardVisualizeReview;
