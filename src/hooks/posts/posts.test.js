import { render, screen } from '@testing-library/react';
import { act } from 'react';
import usePosts from './posts';
import api from '../../services/api';

// Mock del módulo API
jest.mock('../../services/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

const TestComponent = ({ bookId, userId }) => {
    const { posts, loading, error, createPost } = usePosts(bookId, userId);

    if (loading) return <div data-testid="loading-spinner"></div>;
    if (error) return <div data-testid="error">{error}</div>;

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} data-testid="post">
                    {post.title}
                </div>
            ))}
            <button onClick={() => createPost({ title: 'New Post', content: 'Content', imageUrls: [] })} data-testid="create-post">
                Create Post
            </button>
        </div>
    );
};

describe('usePosts Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        render(<TestComponent bookId="1" />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('fetches and displays posts successfully', async () => {
        const mockPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];
        api.get.mockResolvedValueOnce({ status: 200, data: mockPosts });

        render(<TestComponent bookId="1" />);

        // Espera a que se carguen los posts
        await act(async () => {
            await new Promise((r) => setTimeout(r, 0)); // Permitir que el useEffect se ejecute
        });

        expect(screen.getAllByTestId('post')).toHaveLength(2);
        expect(screen.getAllByTestId('post')[0]).toHaveTextContent('Post 1');
        expect(api.get).toHaveBeenCalledWith('/posts', { params: { bookId: '1' } });
    });

    it('displays error when fetch fails', async () => {
        api.get.mockRejectedValueOnce(new Error('Error fetching posts'));

        render(<TestComponent bookId="1" />);

        await act(async () => {
            await new Promise((r) => setTimeout(r, 0)); // Esperar a que se complete la carga
        });

        expect(screen.getByTestId('error')).toHaveTextContent('Error fetching posts');
        expect(api.get).toHaveBeenCalledWith('/posts', { params: { bookId: '1' } });
    });

    it('creates a new post successfully', async () => {
        const mockPost = { title: 'New Post' };
        const mockPosts = [{ title: 'Post 1' }];

        // Mock de los datos iniciales de posts
        api.get.mockResolvedValueOnce({ status: 200, data: mockPosts });
        // Mock de la creación de un nuevo post
        api.post.mockResolvedValueOnce({ status: 201, data: mockPost });

        render(<TestComponent bookId="1" />);

        // Esperar a que se carguen los posts iniciales
        await act(async () => {
            await new Promise((r) => setTimeout(r, 0)); // Esperar a que se complete la carga
        });

        expect(screen.getAllByTestId('post')).toHaveLength(1);

        const createPostButton = screen.getByTestId('create-post');
        await act(async () => {
            createPostButton.click();
            await new Promise((r) => setTimeout(r, 0)); // Esperar a que se complete la creación
        });

        expect(screen.getAllByTestId('post')).toHaveLength(2);
        expect(screen.getAllByTestId('post')[0]).toHaveTextContent('New Post');
        expect(api.post).toHaveBeenCalledWith('/posts/create', {
            title: 'New Post',
            content: 'Content',
            imageUrls: [],
            bookId: '1',
        });
    });

    it('displays error when post creation fails', async () => {
        api.post.mockRejectedValueOnce(new Error('Error creating post'));
        const mockPosts = [{ title: 'Post 1' }];

        api.get.mockResolvedValueOnce({ status: 200, data: mockPosts });
        render(<TestComponent bookId="1" />);

        await act(async () => {
            await new Promise((r) => setTimeout(r, 0)); // Esperar a que se carguen los posts
        });

        const createPostButton = screen.getByTestId('create-post');
        await act(async () => {
            createPostButton.click();
            await new Promise((r) => setTimeout(r, 0)); // Esperar a que se complete la creación
        });

        expect(screen.getByTestId('error')).toHaveTextContent('Error creating post');
    });
});
