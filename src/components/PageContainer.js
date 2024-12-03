import React from 'react';
import PropTypes from 'prop-types';
import NavAppBar from "./NavAppBar";
import paletteColors from "../resources/palette";

const PageContainer = ({children}) => {
    return (
        <div style={{
            background: paletteColors.background_color,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '100%'
        }}>
            <NavAppBar/>
            {children}
        </div>
    );
};

// Validación de las propiedades
PageContainer.propTypes = {
    children: PropTypes.node.isRequired,  // 'children' es obligatorio
};

export default PageContainer;
