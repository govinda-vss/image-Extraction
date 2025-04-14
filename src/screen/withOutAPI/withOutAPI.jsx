
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

 
  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else {
          setPhoto(response.assets[0]);
          recognizeTextFromImage(response.assets[0]);
        }
      }
    );
  };

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
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          setPhoto(response.assets[0]);
          recognizeTextFromImage(response.assets[0]);
        }
      }
    );
  };

  const recognizeTextFromImage = async (image) => {
    try {
      const result = await TextRecognition.recognize(image.uri);
      setRecognizedText(result.text);
      let converJson = JSON.parse(result.text)
      console.log(converJson," converted in Json")
    } catch (error) {
      console.log('Error recognizing text:', error);
      Alert.alert( 'Failed to recognize full text from image.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Text Recognition from Image</Text>

      <View style={styles.imageContainer}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.image} />
        ) : (
          <Text>No photo selected</Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.buttonText}>Choose Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {recognizedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Recognized Text:</Text>
          <Text>{recognizedText}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
