import { useEffect, useState } from 'react';
import api from '../../services/api';

const usePosts = (bookId, userId = null) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all posts for a specific book
    const fetchPosts = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const endpoint = userId
                ? `/posts/user/${userId}`
                : `/posts`; // Get posts for a user or all posts

            const response = await api.get(endpoint, {
                params: bookId ? { bookId } : {},
            });

            if (response.status === 200) {
                setPosts(response.data);
                setLoading(false);
            } else {
                setError(`Error fetching posts: ${response.data.message}`);
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching posts');
        } finally {
            setLoading(false);
        }
    };

    // Create a new post
    const createPost = async ({ title, content, imageUrls }) => {
        setError(null);
        try {
            const response = await api.post('/posts/create', {
                title,
                content,
                imageUrls,
                bookId,
            });

            if (response.status === 201) {
                setPosts((prevPosts) => [response.data, ...prevPosts]);
            } else {
                setError(`Error creating post: ${response.data.message}`);
            }
        } catch (err) {
            setError('Error creating post');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [bookId, userId]);

    return { posts, loading, error, fetchPosts, createPost };
};

export default usePosts;
