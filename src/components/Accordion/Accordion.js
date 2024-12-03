import React from 'react';
import PropTypes from 'prop-types';
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookSocialTitle from "../BookSocialTitle";
import BookSocialText from "../BookSocialText";
import paletteColors from "../../resources/palette";

const BookSocialAccordion = ({title, open = false, body}) => {
    const [expanded, setExpanded] = React.useState(open);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <Accordion style={{backgroundColor: paletteColors.background_header}}
                   expanded={expanded}
                   onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: paletteColors.textColor}}/>}
                aria-controls="panel-content"
                id="panel-header"
            >
                <BookSocialTitle level={4} text={title}/>
            </AccordionSummary>
            <AccordionDetails>
                <BookSocialText level={"p"} text={body}/>
            </AccordionDetails>
        </Accordion>
    );
};

BookSocialAccordion.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool,
    body: PropTypes.string.isRequired,
};

export default BookSocialAccordion;
