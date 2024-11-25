import React, {act} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {AuthProvider, useAuth} from './authentication';
import api from '../../services/api';


// Mock del módulo API
jest.mock('../../services/api', () => ({
    post: jest.fn(),
    get: jest.fn(),
}));

// Componente de prueba para consumir el contexto
const TestComponent = () => {
    const {isLoggedIn, login, logout, signIn, error} = useAuth();
    return (
        <div>
            <div data-testid="login-status">{isLoggedIn ? 'Logged In' : 'Logged Out'}</div>
            <button onClick={() => login('test@example.com', 'password')}>Login</button>
            <button onClick={logout}>Logout</button>
            <button onClick={() => signIn('Test', 'testuser', 'test@example.com', 'password', 'male', 'writer')}>Sign
                In
            </button>
            <div data-testid="error-message">{error}</div>
        </div>
    );
};

describe('AuthProvider', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should render with initial state', () => {
        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        expect(screen.getByTestId('login-status')).toHaveTextContent('Logged Out');
        expect(screen.getByTestId('error-message')).toBeEmptyDOMElement();
    });

    it('should log in successfully', async () => {
        api.post.mockResolvedValue({
            status: 200,
            data: {token: 'fakeToken'}
        });

        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText('Login').click();
        });

        expect(localStorage.getItem('token')).toBe('fakeToken');
        expect(localStorage.getItem('isLoggedIn')).toBe('true');
        expect(screen.getByTestId('login-status')).toHaveTextContent('Logged In');
    });

    it('should handle login failure', async () => {
        api.post.mockRejectedValue({
            isAxiosError: true,
            response: {data: {message: 'Invalid credentials'}}
        });

        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText('Login').click();
        });

        expect(localStorage.getItem('token')).toBeNull();
        expect(screen.getByTestId('login-status')).toHaveTextContent('Logged Out');
        expect(screen.getByTestId('error-message')).toHaveTextContent('Error on try to login: Invalid credentials');
    });

    it('should log out successfully', async () => {
        localStorage.setItem('token', 'fakeToken');
        localStorage.setItem('isLoggedIn', 'true');

        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText('Logout').click();
        });

        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('isLoggedIn')).toBeNull();
        expect(screen.getByTestId('login-status')).toHaveTextContent('Logged Out');
    });

    it('should handle sign up successfully', async () => {
        api.post.mockResolvedValueOnce({status: 201}); // Mock para el registro
        api.post.mockResolvedValueOnce({ // Mock para el login después del registro
            status: 200,
            data: {token: 'fakeToken'}
        });

        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText('Sign In').click();
        });

        expect(localStorage.getItem('token')).toBe('fakeToken');
        expect(localStorage.getItem('isLoggedIn')).toBe('true');
        expect(screen.getByTestId('login-status')).toHaveTextContent('Logged In');
    });

    it('should handle sign up failure', async () => {
        api.post.mockRejectedValue({
            isAxiosError: true,
            response: {data: {message: 'Email already exists'}}
        });

        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText('Sign In').click();
        });

        expect(localStorage.getItem('token')).toBeNull();
        expect(screen.getByTestId('login-status')).toHaveTextContent('Logged Out');
        expect(screen.getByTestId('error-message')).toHaveTextContent('Error on try to register: Email already exists');
    });
});
