import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useRouter } from 'expo-router';
import { useAuth, FormFields } from '../../hooks/useAuth';

export default function Login() {
  const { handleLogin, form, setForm } = useAuth();
  const router = useRouter();

  const handleLoginSubmit = async () => {
    try {
      await handleLogin(); // Attendre que la connexion soit réussie
      router.push('/(tabs)/home'); // Redirection vers la page d'onglets
    } catch {
      // Gestion des erreurs ici si nécessaire
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={form.username || ''}
        onChangeText={(username) => setForm((prev: FormFields) => ({ ...prev, username }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password || ''}
        onChangeText={(password) => setForm((prev: FormFields) => ({ ...prev, password }))}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.push('/register')}>
        Don't have an account? Register here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 15,
  },
});
