import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../constants/constants';
import { Alert } from 'react-native';

const API = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
});

// Helper pour récupérer et configurer l'en-tête Authorization
const setAuthToken = async () => {
  const token = await AsyncStorage.getItem('Token');
  if (token) {
    API.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

// Vérification de l'authentification actuelle
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('Token');
  return !!token; // Retourne `true` si un token est trouvé, sinon `false`
};

// Login utilisateur et stockage du token
export const loginUser = async (username: string, password: string): Promise<{ token: string }> => {
  try {
    console.log('Attempting login with', { username, password });
    const response = await API.post('/auth/login/', { username, password });
    const { token } = response.data;
    console.log('Token:', token);
    await AsyncStorage.setItem('Token', token);
    await setAuthToken(); // Met à jour l'en-tête avec le nouveau token

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data);
      alert(error.response?.data?.error || 'Login failed');
    } else {
      console.error('Unexpected error:', error);
      alert('An unknown error occurred');
    }
    throw new Error('Login failed');
  }
};

// Enregistrement d'un nouvel utilisateur
export const registerUser = async (
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  country: string,
  password: string,
  confirmPassword: string
): Promise<{ token: string }> => {
  try {
    const response = await API.post('/auth/register/', {
      username,
      first_name: firstname,
      last_name: lastname,
      email,
      country,
      password,
      confirm_password: confirmPassword
    });

    console.log("Registration response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Registration error response:', error.response?.data);
      const errorMessage = error.response?.data?.error ||
                           error.response?.data?.detail ||
                           'Unknown error';
      throw new Error(`Registration error: ${errorMessage}`);
    }
    throw error;
  }
};

// Déconnexion utilisateur et suppression du token
export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('Token');
    await setAuthToken(); // Supprime l'en-tête Authorization
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed');
  }
};

// Initialisation de l'authentification lors du lancement de l'application
export const initAuth = async (): Promise<void> => {
  await setAuthToken();
};


  
  



