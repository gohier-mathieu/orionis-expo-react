/*import { Ionicons } from '@expo/vector-icons';


import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadProfilePhoto } from '../api/auth';

const Settings = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const goBackToProfile = () => {
    router.push('/(tabs)/profile');
  };

  const handleSelectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  

  const handleUploadPhoto = async () => {
    if (selectedImage) {
      try {
        const data = await uploadProfilePhoto(selectedImage); 
        console.log('Profile photo uploaded:', data);
        alert('Profile photo uploaded successfully!');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Upload error:', error.message);
          alert('Failed to upload profile photo: ' + error.message);
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
          console.error('Upload error:', (error as any).response ? (error as any).response.data : 'Unknown error');
          alert('Failed to upload profile photo: ' + (error as any).response?.data || 'Unknown error');
        } else {
          console.error('Upload error:', error);
          alert('Failed to upload profile photo: ' + error);
        }
      }
    } else {
      alert('Please select a photo first.');
    }
  };
  
  
  
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBackToProfile}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.username}>Username</Text>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.profileImage} />
      )}

      <TouchableOpacity onPress={handleSelectPhoto} style={styles.button}>
        <Text style={styles.buttonText}>Select Photo</Text>
      </TouchableOpacity>

      {selectedImage && (
        <TouchableOpacity onPress={handleUploadPhoto} style={styles.button}>
          <Text style={styles.buttonText}>Upload Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 24, marginTop: 10, marginBottom: 20 },
  button: {
    backgroundColor: '#2521f3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Settings;*/


import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
/* @tutinfo Import <CODE>useState</CODE> hook from React.*/
import React, { useState } from 'react';


import Button from '../components/Button';
import ImageViewer from '../components/ImageViewer';
import { uploadProfilePhoto } from '../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceholderImage = require('../../assets/images/orion.png');

export default function Index() {
  /* @tutinfo Create a state variable that will hold the value of selected image. */
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      /* @tutinfo Pick the first uri from the <CODE>assets</CODE> array. Also, there is only one image selected at a time so you don't have to change this. */
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const handleUploadPhoto = async () => {
    if (selectedImage) {
      console.log("Uploading photo with URI:", selectedImage);  // Vérification de l'URI de l'image
      try {
        const token = await AsyncStorage.getItem('Token');

        // Vérification si token est valide (non null)
        if (!token) {
          alert('No valid token found');
          return;
        }

        const data = await uploadProfilePhoto(selectedImage, token);
        console.log('Profile photo uploaded:', data);
        alert('Profile photo uploaded successfully!');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Upload error:', error.message);
          alert('Failed to upload profile photo: ' + error.message);
        } else {
          console.error('Upload error:', error);
          alert('Failed to upload profile photo: ' + error);
        }
      }
    } else {
      alert('Please select a photo first.');
    }
};


  
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button theme="primary" label="Use this photo" onPress={handleUploadPhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});

function setUser(arg0: (prevUser: any) => any) {
  throw new Error('Function not implemented.');
}

