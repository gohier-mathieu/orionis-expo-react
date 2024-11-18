import { getApiUrl } from "@/constants/constants";
import axios from "axios";
import { User } from '../../types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


const API = axios.create({
    baseURL: getApiUrl(),
    timeout: 10000,
  });

  
  export const fetchUserProfile = async (
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      const token = await AsyncStorage.getItem('Token'); // Récupérez le token stocké après l'authentification
      if (!token) {
        setError("No token found, please log in.");
        return;
      }
  
      const response = await API.get('/auth/user_profile/', {
        headers: { Authorization: `Token ${token}` }, // Ajoutez le token ici avec le préfixe `Bearer`
      });
      setUser(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Unable to fetch user data');
      
    }
  };
  
  export const uploadProfilePhoto = async (imageUri: string, token: string) => {
    const formData = new FormData();

    try {
        // Utiliser fetch pour obtenir un Blob depuis l’URI file://
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Ajouter le Blob au FormData
        formData.append('photo', blob, 'profile_photo.jpg');

        const apiResponse = await fetch('http://192.168.1.14:8000/api/auth/upload_profile_photo/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                //'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        if (!apiResponse.ok) {
            throw new Error(`HTTP error! status: ${apiResponse.status}`);
        }

        return await apiResponse.json();
    } catch (error) {
        console.error("Erreur de téléchargement :", error);
        throw error;
    }
};


  