import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import api from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import useProfile from "./profile";

// Configura el mock de Axios
const mock = new MockAdapter(api);

// Componente de prueba para el Profile
const TestComponent = () => {
    const { profile, loading, error } = useProfile();

    return (
        <div>
            {loading && <span>Loading...</span>}
            {error && <span>{error}</span>}
            {profile && (
                <div>
                    <h1>{profile.name}</h1>
                    <h2>@{profile.username}</h2>
                    <p>Favourite genre: {profile.favGenre}</p>
                </div>
            )}
            <button onClick={() => {/* Lógica para abrir el modal */}}>Edit Profile</button>
        </div>
    );
};

describe('Profile component', () => {
    afterEach(() => {
        mock.reset(); // Resetear mocks después de cada prueba
    });

    it('renders loading page while fetching data', async () => {
        mock.onGet('/auth/me').reply(200, new Promise(() => {})); // Simular carga eterna

        render(<TestComponent />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders error page on fetch failure', async () => {
        mock.onGet('/auth/me').reply(500); // Simular error en la petición

        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.getByText(/error fetching profile data/i)).toBeInTheDocument();
        });
    });

    it('renders profile data successfully', async () => {
        const mockProfile = {
            name: 'John Doe',
            username: 'johndoe',
            description: 'A book enthusiast',
            favGenre: 'Fiction',
        };

        mock.onGet('/auth/me').reply(200, mockProfile); // Mock de respuesta exitosa

        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.getByText(/john doe/i)).toBeInTheDocument();
            expect(screen.getByText(/@johndoe/i)).toBeInTheDocument();
            expect(screen.getByText(/favourite genre: fiction/i)).toBeInTheDocument();
        });
    });

    it('opens edit profile modal on button click', async () => {
        const mockProfile = {
            name: 'John Doe',
            username: 'johndoe',
            description: 'A book enthusiast',
            favGenre: 'Fiction',
        };

        mock.onGet('/auth/me').reply(200, mockProfile);

        render(<TestComponent />);
        await waitFor(() => {
            expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        });

        const editButton = screen.getByText(/edit profile/i);
        fireEvent.click(editButton);

        // Aquí deberías verificar que se abra el modal
        // Asegúrate de que el modal tenga texto o elemento identificable
        // expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });
});
