import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const CreatePage = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(app)/(drawer)/Create/CreatePost")}>
        <Text style={styles.buttonText}>Create a post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(app)/(drawer)/Create/CreateBook")}>
        <Text style={styles.buttonText}>Create a Book</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(app)/(drawer)/Create/CreateEvent")}>
        <Text style={styles.buttonText}>Create an Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(app)/(drawer)/Create/CreateAnnouncment")}>
        <Text style={styles.buttonText}>Create an Announcment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CreatePage;

