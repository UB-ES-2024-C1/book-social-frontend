import {useEffect, useState} from 'react';
import api from "../../services/api";
import profileData from '../../mocks/profileWriter.json';
import Profile from '../../dto/Profile';

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
            const data = profileData;
            const fetchedProfile = Profile.fromJSON(data);
            setProfile(fetchedProfile);
            setLoading(false);
            /*            if (response.status === 200) {
                            setProfile(response.data);
                            setLoading(false);
                        } else {
                            setError("Error fetching profile data");
                            setLoading(false);
                        }*/
        } catch (err) {
            setError("Error fetching profile data");
            setLoading(false);
        }
    };

    const updateProfile = async (newProfileData) => {
        if (!loading) {
            setLoading(true);
        }
        setUpdateStatus(Status.EMPTY);
        try {
            const response = await api.put('/profile', newProfileData);
            if (response.status === 200) {
                setProfile(response.data);
                setUpdateStatus(Status.SUCCESS);
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