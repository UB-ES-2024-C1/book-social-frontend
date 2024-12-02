import React from 'react';
import PageContainer from "../components/PageContainer";
import Box from "@mui/material/Box";
import BookSocialTitle from "../components/BookSocialTitle";
import PropTypes from "prop-types";
import BookSocialText from "../components/BookSocialText";
import paletteColors from "../resources/palette";
import {Spacer} from "../resources/spacer";
import BookSocialPrimaryButton from "../components/BookSocialPrimaryButton";

const ErrorPage = ({errorMessage, onClick}) => {
    return (
        <PageContainer>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 'calc(100vh - 50px)',
                    textAlign: 'center',
                }}
            >
                <BookSocialTitle
                    text={"Ops, we are experiencing errors, try again in a few minutes"}
                    level={3}
                />
                <Spacer size={16}/>
                <BookSocialText
                    text={errorMessage}
                    level={"large"}
                    color={paletteColors.textColorStrong}
                />
                <Spacer size={24}/>
                <BookSocialPrimaryButton
                    isExpanded={true}
                    buttonText={"Try again"}
                    onClick={onClick}
                />
            </Box>
        </PageContainer>
    );
};

ErrorPage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ErrorPage;
