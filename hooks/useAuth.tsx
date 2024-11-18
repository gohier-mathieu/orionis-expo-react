import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { loginUser, logoutUser, registerUser } from '@/app/api/auth';

export interface FormFields {
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
}

interface AuthState {
  form: FormFields;
  isAuthenticated: boolean;
  setForm: (newForm: FormFields | ((prev: FormFields) => FormFields)) => void;
  setAuthenticated: (status: boolean) => void; // Add this line
  handleLogin: () => Promise<void>;
  handleRegister: (registerForm: FormFields) => Promise<void>;
  handleLogout: () => void;
  checkAuthStatus: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  form: {},
  isAuthenticated: false,

  setForm: (newForm) =>
    set((state) => ({
      form: typeof newForm === 'function' ? newForm(state.form) : { ...state.form, ...newForm },
    })),

  setAuthenticated: (status) => set({ isAuthenticated: status }), 

  handleLogin: async () => {
    const { form } = useAuth.getState();

    if (!form.username || !form.password) {
      alert("Please enter both username and password.");
      return Promise.reject();
    }

    try {
      console.log('Attempting login...');
      const data = await loginUser(form.username, form.password);
      await AsyncStorage.setItem('token', data.token);
      set({ isAuthenticated: true });
      return Promise.resolve();
    } catch (error) {
      console.error('Login Error:', error);
      alert('Invalid username or password.');
      return Promise.reject();
    }
  },

  handleRegister: async (registerForm) => {
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match.");
      return Promise.reject();
    }
    try {
      console.log('Registering with', registerForm);
      const data = await registerUser(
        registerForm.username ?? '',
        registerForm.firstname ?? '',
        registerForm.lastname ?? '',
        registerForm.email ?? '',
        registerForm.country ?? '',
        registerForm.password ?? '',
        registerForm.confirmPassword ?? ''
      );
      await AsyncStorage.setItem('token', data.token);
      set({ isAuthenticated: true });
      return Promise.resolve();
    } catch (error) {
      console.error('Registration Error:', error);
      const errorMessage = (error instanceof Error) ? error.message : "Registration failed";
      alert(`Registration failed: ${errorMessage}`);
      return Promise.reject();
    }
  },

  handleLogout: async () => {
    await logoutUser();
    await AsyncStorage.removeItem('token');
    set({ isAuthenticated: false, form: {} });
    console.log('Logged out');
  },

  checkAuthStatus: async () => {
    const token = await AsyncStorage.getItem('token');
    set({ isAuthenticated: !!token });
    if (token) {
      console.log('User is authenticated');
    } else {
      console.log('User is not authenticated');
    }
  },
}));


