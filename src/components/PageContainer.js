import React from 'react';
import PropTypes from 'prop-types';
import paletteColors from "../resources/palette";
import NavAppBar from "./NavAppBar";
import {Spacer} from "../resources/spacer";

const PageContainer = ({children}) => {
    return (
        <div style={{
            background: paletteColors.background_color,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <NavAppBar/>
            <Spacer size={50}/>
            {children}
        </div>
    );
};

// Validación de las propiedades
PageContainer.propTypes = {
    children: PropTypes.node.isRequired,  // 'children' es obligatorio
};

export default PageContainer;
