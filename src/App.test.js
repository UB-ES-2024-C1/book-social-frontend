import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {AuthProvider} from './hooks/authentication';

// Mocks de componentes y páginas
jest.mock('./pages/HomePage', () => () => <div>Home Page</div>);
jest.mock('./pages/DiscoveryPage', () => () => <div>Discovery Page</div>);
jest.mock('./pages/SavedPage', () => () => <div>Saved Page</div>);
jest.mock('./pages/Profile', () => () => <div>Profile Page</div>);
jest.mock('./pages/LandingPage', () => () => <div>Landing Page</div>);
jest.mock('./pages/NewBook', () => () => <div>New Book Page</div>);
jest.mock('./pages/BookDetailsPage', () => () => <div>Book Details Page</div>);
jest.mock('./components/NavAppBar', () => () => <div>Nav App Bar</div>);
jest.mock('./components/Drawer', () => () => <div>Drawer</div>);
jest.mock('./components/ProtectedRoute', () => ({children}) => <>{children}</>);

describe('App Component', () => {
    test('renders Landing Page at root path', () => {
        render(
            <AuthProvider>
                <App/>
            </AuthProvider>
        );
        expect(screen.getByText(/Landing Page/i)).toBeInTheDocument();
    });

});
