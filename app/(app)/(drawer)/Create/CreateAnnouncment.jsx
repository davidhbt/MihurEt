import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { router } from "expo-router";

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("David Habte");
  const AnnouncmetRef = collection(db, "Schools", "Mission", "Announcments");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title | !description | !author) {
      return;
    }
    setLoading(true);
    try {
      const currDate = new Date();
      await addDoc(AnnouncmetRef, {
        Title: title,
        Description: description,
        Posted_By: author,
      });
      setLoading(false);
      console.log("uploaded");
      router.replace("/(app)/(drawer)/Home");

    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  const handlePress = () => {
    console.log("Post Button Pressed");
    // Add logic for submitting post if needed
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Create an Announcement</Text>

        <Text style={styles.label}>Author Name</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Enter author name"
          placeholderTextColor="#999"
          value={author}
          onChangeText={setAuthor}
        />

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={4}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handlePost}
          disabled={loading}
        >
          <Text style={styles.buttonText} >{loading ? 'Uploading' : "Post"}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#F39C12",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});

export default CreateAnnouncement;
