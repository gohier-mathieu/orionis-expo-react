// Home/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../../types';  // Assurez-vous que le chemin d'importation est correct
import { fetchUserProfile } from '../../api/user'; // Assurez-vous que le chemin d'importation est correct
import { getApiUrl } from '@/constants/constants';

const Profile = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); // Ajout de l'état d'erreur

  useEffect(() => {
    fetchUserProfile(setUser, setError); // Passez setError en paramètre
  }, []);

  const logoutAndRedirect = () => {
    handleLogout();
    router.push('/(auth)/login');
  };

  const goToSettings = () => {
    router.push('/settings');
  };

  if (error) {
    return <Text>Error loading user data: {error}</Text>; // Afficher l'erreur
  }

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      {user && user.profile_photo ? (
          <Image
          source={{
            uri: `${getApiUrl().replace('/api', '')}${user.profile_photo}`, // Ajoutez l'URL de base et la photo
            headers: {
              Pragma: 'no-cache',
            },
          }}
          style={styles.profileImage}
        />
        
  ) : (
    <View style={styles.profileImagePlaceholder}>
      <Text style={styles.placeholderText}>Loading...</Text>
    </View>
  )}
        <Text style={styles.username}>{user.username}</Text>
        <TouchableOpacity onPress={() => setSettingsOpen(!settingsOpen)}>
          <Ionicons name="settings-outline" size={34} color="red" />
        </TouchableOpacity>
      </View>

      {/* Barre de paramètres */}
      {settingsOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={goToSettings} style={styles.Button}>
            <Text style={styles.Text}>Settings</Text>
          </TouchableOpacity>
          {isAuthenticated && (
            <TouchableOpacity onPress={logoutAndRedirect} style={styles.Button}>
              <Text style={styles.Text}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Text style={styles.welcomeText}>Welcome to the Profile Page</Text>
      <View>
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
        <Text>{user.country}</Text>
        {user && user.profile_photo ? (
          <Image
          source={{
            uri: `${getApiUrl().replace('/api', '')}${user.profile_photo}`, // Ajoutez l'URL de base et la photo
            headers: {
              Pragma: 'no-cache',
            },
          }}
          style={{ width: 400, height: 400 }}
        />
        
  ) : (
    <View style={styles.profileImagePlaceholder}>
      <Text style={styles.placeholderText}>Loading...</Text>
    </View>
  )}




      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9c8a8a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 100,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 24,
    margin: 20,
    textAlign: 'center',
  },
  sidebar: {
    position: 'absolute',
    top: 100, 
    right: 0,
    width: 100,
    height: '100%',
    backgroundColor: '#464444',
    padding: 10,
    zIndex: 1,
  },
  settingsButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  Button: { 
    paddingVertical: 10, 
    paddingHorizontal: 10, 
    backgroundColor: 'red', 
    borderRadius: 5, 
    marginTop: 10,
    alignItems: 'center' 
  },
  Text: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold', 
  },
  profileImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Profile;
