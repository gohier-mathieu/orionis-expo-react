import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { initAuth } from './api/auth'; // Importez initAuth depuis votre service d'authentification

const Index = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth.getState();
  const [isReady, setIsReady] = useState(false); // État pour contrôler le chargement

  useEffect(() => {
    const initializeAuth = async () => {
      await initAuth(); // Appel à initAuth pour configurer le token
      setIsReady(true); // Indique que le composant est prêt après l'initialisation
    };
    
    initializeAuth();
  }, []);

  useEffect(() => {
    if (isReady) {
      if (isAuthenticated) {
        router.replace('/(tabs)'); // Redirection vers la page d'accueil
      } else {
        router.replace('/login'); // Redirection vers la page de connexion
      }
    }
  }, [isReady, isAuthenticated, router]);

  return null; // Vous pouvez ajouter un écran de chargement ici si nécessaire
};

export default Index;
