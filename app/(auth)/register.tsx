import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useAuth, FormFields } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';

export default function Register() {
  const { handleRegister, form, setForm } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterSubmit = async () => {
    try {
      await handleRegister(form);
      Alert.alert("Inscription réussie !", "Redirection vers la page de connexion.");
      router.push('/login');
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Erreur inconnue";
      setErrorMessage("Erreur d'inscription : " + errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, username: text }))} 
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, firstname: text }))} 
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, lastname: text }))} 
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, email: text }))} 
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, country: text }))} 
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, password: text }))} 
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, confirmPassword: text }))} 
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.push('/login')}>Already have an account? Login here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  link: { color: '#007AFF', textAlign: 'center', marginTop: 15 },
});
