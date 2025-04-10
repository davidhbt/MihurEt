import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import * as DocumentPicker from 'expo-document-picker';
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [document, setDocument] = useState(null);
  
    const handlePress = () => {
      console.log('Post Button Pressed');
      // Add logic for submitting post if needed
    };
  
    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/bmp', 'image/tiff'],
          copyToCacheDirectory: true,
          multiple: false
        });
  
        if (!result.canceled && result.assets && result.assets.length > 0) {
          setDocument(result.assets[0]);
        }
      } catch (error) {
        console.error('Error picking document:', error);
      }
    };
  
    useEffect(() => {
      if (document) {
        console.log('Selected document:', document);
      }
    }, [document]);
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Create an Event</Text>
  
          {/* Title */}
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
  
          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={4}
          />
  
          {/* Document Picker */}
          <Text style={styles.label}>Image</Text>
          <Pressable style={styles.documentPicker} onPress={pickDocument}>
            {document ? (
              <Image
                source={{ uri: document.uri }}
                style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 8 }}
              />
            ) : (
              <View style={styles.documentContent}>
                <Text style={styles.documentIcon}>📄</Text>
                <Text style={styles.documentText}>Pick an Image</Text>
              </View>
            )}
          </Pressable>
  
          {/* Post Button */}
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={handlePress}
          >
            <Text style={styles.buttonText}>🚀 Post</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    scrollContainer: {
      padding: 24,
      backgroundColor: '#F9F9F9',
      flexGrow: 1,
      justifyContent: 'flex-start'
    },
    title: {
      fontSize: 28,
      fontWeight: '600',
      color: '#333',
      marginBottom: 24
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
      marginBottom: 8
    },
    input: {
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2
    },
    textArea: {
      height: 120,
      textAlignVertical: 'top'
    },
    documentPicker: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 12,
      padding: 14,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
      minHeight: 100
    },
    documentContent: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    documentIcon: {
      fontSize: 22,
      marginRight: 10
    },
    documentText: {
      fontSize: 16,
      color: '#444'
    },
    button: {
      marginTop: 20,
      backgroundColor: '#F39C12',
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3
    },
    buttonPressed: {
      opacity: 0.7
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '600'
    }
  });
  
  export default CreateEvent;
  