import React from 'react';
import PageContainer from "../components/PageContainer";
import paletteColors from "../resources/palette";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

const LoadingPage = () => {

    return <PageContainer children={
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 50px)',
            }}
        >
            <CircularProgress sx={{color: paletteColors.color_primary}}/>
        </Box>
    }/>


};

export default LoadingPage;
