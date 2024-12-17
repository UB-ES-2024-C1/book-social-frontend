import {useEffect, useState} from 'react';
import api from "../../services/api";
import BookSummary from "../../dto/bookSummary";

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const Status = Object.freeze({
        SUCCESS: Symbol("Success"),
        ERROR: Symbol("Error"),
        EMPTY: Symbol("Empty"),
    });

    const fetchProfile = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const profileImage = localStorage.getItem('profileImage');
            const coverImage = localStorage.getItem('coverImage');
            console.log('cover image',coverImage);
            const response = await api.get('auth/me')
            var fetchedBooks = [];
            try {
                const responseBooks = await api.get('/books/recent');
                if (responseBooks.status === 200) {
                    fetchedBooks = responseBooks.data.map((bookData) => BookSummary.fromJSON(bookData));
                }
            } catch (e) {
                console.log('Error on get recents books on profile');
            }
            console.log(response);
            setLoading(false);
            if (response.status === 200) {
                localStorage.setItem('profileId', response.data.id);
                localStorage.setItem('genre', response.data.favGenre);
                setProfile({
                    ...response.data,
                    books: fetchedBooks,
                    image: profileImage,
                    coverImage: coverImage,
                });
                setLoading(false);
            } else {
                setError("Error fetching profile data");
                setLoading(false);
            }
        } catch (err) {
            setError("Error fetching profile data");
            setLoading(false);
        }
    };

    const updateProfile = async (newProfileData) => {
        console.log('Update', newProfileData);

        if (!loading) {
            setLoading(true);
        }
        setUpdateStatus(Status.EMPTY);
        try {
            localStorage.setItem('image', newProfileData.image);
            localStorage.setItem('cover', newProfileData.coverImage);
            const payload = {
                firstName: newProfileData.name,
                lastName: newProfileData.lastName,
                username: newProfileData.username,
                genre: newProfileData.favGenre,
                description: newProfileData.description
            };
            const response = await api.post('/auth/update', payload);
            console.log(response.data);
            var fetchedBooks = [];
            try {
                const responseBooks = await api.get('/books/recent');
                if (responseBooks.status === 200) {
                    fetchedBooks = responseBooks.data.map((bookData) => BookSummary.fromJSON(bookData));
                }
            } catch (e) {
                console.log('Error on get recents books on profile');
            }
            if (response.status === 200) {
                const result = {
                    name: response.data.user.firstName,
                    favGenre: response.data.user.genre,
                    username: response.data.user.username,
                    description: response.data.user.description,
                    lastName: response.data.user.lastName,
                    books: fetchedBooks,
                };
                console.log('result');
                console.log(result);
                setProfile(result);
                setUpdateStatus(Status.SUCCESS);
                setLoading(false);
            } else {
                setUpdateStatus(Status.ERROR);
                setLoading(false);
            }
        } catch (err) {
            setUpdateStatus(Status.ERROR);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {profile, loading, error, updateStatus, fetchProfile, updateProfile};
};

export default useProfile;