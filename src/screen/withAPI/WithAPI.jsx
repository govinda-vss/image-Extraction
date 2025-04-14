import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Button } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const App = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getValue, setGetValue] = useState([])
 
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        includeBase64: true,
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User canceled camera picker');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          setPhoto(response.assets[0]);
        }
      }
    );
  };
  
  const sendPhotoToApi = async () => {
    if (!photo) {
      Alert.alert('No photo', 'Please take a photo first');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri: photo.uri,
      type: photo.type,
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post('https://api-ai-search-voice-edukaan-dev.tatamotors.com/image_entity/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Photo uploaded successfully');
      console.log(response,"Check response")
      setGetValue(response?.data)
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

console.log(getValue,"check value")

  console.log(getValue,"check useState value")
  return (
    <ScrollView contentContainerStyle={styles.container}>

    {/* <View style={styles.container}> */}
      <Text style={styles.header}>Take a Photo and Send to API</Text>

      <View style={styles.cameraContainer}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.photo} />
        ) : (
          <Text style={styles.placeholderText}>No photo taken yet</Text>
        )}
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      {photo && (
        <TouchableOpacity
        style={styles.sendButton}
        onPress={sendPhotoToApi}
        disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Photo'}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.apiResponse}>
        <Text style={styles.response}>KD_Case_Ref : {getValue?.KD_Case_Ref}</Text>
        <Text style={styles.response}>Batch : {getValue?.Batch}</Text>
        <Text style={styles.response}>GO : {getValue?.GO}</Text>
        <Text style={styles.response}>KSpec : {getValue?.KSpec}</Text>

      </View>


      <TouchableOpacity  style={styles.sendButton}
           onPress={() => navigation.navigate('WithOutAPI')} 
           >
        <Text style={styles.buttonText}>Navigate To WithOut API</Text>
      </TouchableOpacity>
    {/* </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    marginBottom: 20,
    backgroundColor: '#e8e8e8',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  apiResponse:{
    marginVertical:5
  },
  response:{
    fontWeight:"bold"
  },
  navigetButton:{
    marginVertical:29
  },
});

export default App;




