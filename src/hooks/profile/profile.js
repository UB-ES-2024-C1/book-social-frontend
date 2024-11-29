import {createContext, useContext, useEffect, useState} from 'react';
import api from "../../services/api";

// Creamos el contexto
const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
    const [coverImage, setCoverImage] = useState("https://via.placeholder.com/800x200");
    const [description, setDescription] = useState("Book lover and avid reader.");
    const [name, setName] = useState("Núria Pallejà");
    const [username, setUsername] = useState("nuriapalleja");
    const [error, setError] = useState(null);

    const fetchProfile = async (name, email, description, image, cover) => {
        try {
            const payload = {
                name: name,
                username: username,
                description: description,
                profileImage: profileImage,
                coverImage: coverImage
            };
            const response = await api.get('/profile', {
                name: name,
                email: email,
                description: description,
                image: image,
                cover: cover
            });
            if (response.status === 200) {
                const {image, cover, desc, name, username} = response.data;
                setProfileImage(image);
                setCoverImage(cover);
                setDescription(desc);
                setName(name);
                setUsername(username);
            }
        } catch (err) {
            setError("Error fetching profile data");
        }
    };

    const updateProfile = async (newProfileData) => {
        try {
            const response = await api.put('/profile', newProfileData);
            if (response.status === 200) {
                setProfileImage(newProfileData.image);
                setCoverImage(newProfileData.cover);
                setDescription(newProfileData.description);
                setName(newProfileData.name);
                setUsername(newProfileData.username);
            }
        } catch (err) {
            setError("Error updating profile");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{profileImage, coverImage, description, name, username, updateProfile, error}}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    return useContext(ProfileContext);
};