// Home/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'expo-router';

const Home = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  const router = useRouter();

  const logoutAndRedirect = () => {
    handleLogout();
    router.push('/(auth)/login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Home</Text>
      {isAuthenticated && (
        <Button title="Logout" onPress={logoutAndRedirect} color="#ff6347" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9c8a8a',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Home;
