import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import api from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import useProfile from "./profile";

// Configura el mock de Axios
const mock = new MockAdapter(api);

// Componente de prueba para el Profile
const TestComponent = () => {
    const {profile, loading, error} = useProfile();

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
            <button onClick={() => {/* Lógica para abrir el modal */
            }}>Edit Profile
            </button>
        </div>
    );
};

describe('Profile component', () => {
    afterEach(() => {
        mock.reset(); // Resetear mocks después de cada prueba
    });

    it('renders loading page while fetching data', async () => {
        mock.onGet('/auth/me').reply(200, new Promise(() => {
        })); // Simular carga eterna

        render(<TestComponent/>);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders error page on fetch failure', async () => {
        mock.onGet('/auth/me').reply(500); // Simular error en la petición

        render(<TestComponent/>);

        await waitFor(() => {
            expect(screen.getByText(/error fetching profile data/i)).toBeInTheDocument();
        });
    });

});
