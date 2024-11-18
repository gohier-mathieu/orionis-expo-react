//constant.tsx
import { Platform } from 'react-native';

export const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      /*return 'http://10.0.2.2:8000/api/';*/
      return 'http://192.168.1.14:8000/api/';
    } else {
      return 'http://localhost:8000/api/';
    } 
  } else {
    return 'https://127.0.0.1:8000/api/'; 
  }
};

