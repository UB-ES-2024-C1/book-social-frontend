import {useEffect, useState} from "react";
import api from "../../services/api";
import Review from "../../dto/Review";
import reviews from "../../mocks/reviews.json"

const useReviews = ({userId = null, bookId = null}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userReviews, setUserReviews] = useState([]);
    const [bookReviews, setBookReviews] = useState([]);
    const [addResponse, setAddResponse] = useState("");

    const addReview = async (rating, comment) => {
        if (!loading) {
            setLoading(true);
        }
        setAddResponse("");
        setError(null);
        try {
            const userId = localStorage.getItem('profileId');
            const payload = {
                user: userId,
                book: bookId,
                rating: rating,
                comment: comment,
            };
            const response = await api.post(`/reviews`, payload);
            if (response.status === 201) {
                setAddResponse("Your review have been added successfully");
                setLoading(false);
            } else {
                setAddResponse(`Error on try add your review`);
                setLoading(false);
            }
        } catch (err) {
            setAddResponse(`Error on try add your review`);
            setError('Error adding rewiew');
            setLoading(false);
        }
    };
    const fetchUserReviews = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const response = await api.get(`/reviews/user/${userId}`);
            if (response.status === 200) {
                // const fetchedReviews = response.data.map((bookData) => Review.fromJSON(bookData));
                const fetchedReviews = reviews.map((bookData) => Review.fromJSON(bookData));
                setUserReviews(fetchedReviews);
                setLoading(false);
            } else {
                setError(`Error on try to get user reviews: ${response.data.message}`);
                setLoading(false);

            }
        } catch (err) {
            setError('Error fetching user reviews');
            setLoading(false);
        }
    };
    const fetchBookReviews = async () => {
        if (!loading) {
            setLoading(true);
        }
        setError(null);
        try {
            const response = await api.get(`/reviews/book/${bookId}`);
            const fetchedReviews = reviews.map((bookData) => Review.fromJSON(bookData));
            setBookReviews(fetchedReviews);
            setLoading(false);
            // if (response.status === 200) {
            //     const fetchedReviews = response.data.map((bookData) => Review.fromJSON(bookData));
            //     setBookReviews(fetchedReviews);
            //     setLoading(false);
            // } else {
            //     setError(`Error on try to get user reviews: ${response.data.message}`);
            //     setLoading(false);
            // }
        } catch (err) {
            setError('Error fetching user reviews');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            console.log("fetchUserReviews");
            fetchUserReviews();
        }
        if (bookId) {
            console.log("fetchBookReviews");
            fetchBookReviews();
        }
    }, [userId, bookId]);

    return {userReviews, bookReviews, loading, error, addResponse, fetchBookReviews, fetchUserReviews, addReview};
}
export default useReviews;
