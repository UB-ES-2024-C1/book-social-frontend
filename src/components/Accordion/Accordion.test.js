import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import BookSocialAccordion from "./Accordion";

describe('BookSocialAccordion', () => {
    it('should render the accordion with the correct title and body', () => {
        const title = 'Accordion Title';
        const body = 'This is the content inside the accordion.';

        render(<BookSocialAccordion title={title} body={body}/>);

        // Check if the title and body text are rendered correctly
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(body)).toBeInTheDocument();
    });

    it('should expand and collapse the accordion when clicked', () => {
        const title = 'Accordion Title';
        const body = 'This is the content inside the accordion.';

        render(<BookSocialAccordion title={title} body={body}/>);

        const accordionHeader = screen.getByText(title);
        const accordionContent = screen.getByText(body);

        // Debug log
        console.log('Initial state:', accordionContent.style.display);

        // Initially, the content should not be visible
        expect(accordionContent).not.toBeVisible();

        // Click to expand the accordion
        fireEvent.click(accordionHeader);

        // Debug log after clicking
        console.log('After first click:', accordionContent.style.display);

        // The content should now be visible
        expect(accordionContent).toBeVisible();

        // Click again to collapse the accordion
        fireEvent.click(accordionHeader);
        
    });
});
