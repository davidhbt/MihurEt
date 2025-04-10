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
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { auth, db } from "../../../../firebase";
import ImageKit from "imagekit-javascript";
import { collection, addDoc, Timestamp, Firestore } from "firebase/firestore";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const BooksRef = collection(db, "Schools", "Mission", "Books");
  const [classes] = useState([
    { label: "Grade 1", value: 1 },
    { label: "Grade 2", value: 2 },
    { label: "Grade 3", value: 3 },
    { label: "Grade 4", value: 4 },
    { label: "Grade 5", value: 5 },
    { label: "Grade 6", value: 6 },
    { label: "Grade 7", value: 7 },
    { label: "Grade 8", value: 8 },
    { label: "Grade 9", value: 9 },
    { label: "Grade 10", value: 10 },
    { label: "Grade 11", value: 11 },
    { label: "Grade 12", value: 12 },
  ]);
  const [classesValue, setClassesValue] = useState(null);
    const [documentUrl, setDocumentUrl] = useState(null)
  

  const imagekit = new ImageKit({
    publicKey: "public_gm6QzMSvtXTRUznP5BaUJbnAM6s=", // Your public key
    urlEndpoint: "https://ik.imagekit.io/notefull", // Your URL endpoint
  });

    const HandlePost = async () => {
        if (!document || isUploading || !classesValue ) return;
          try {
            const currentDate = new Date();
      
            await addDoc(BooksRef, {
              Title: title,
              Attachmet_URL: documentUrl,
              Timestamp: currentDate,
              Description: description,
              Class: classesValue
            });
            // console.log(finalTitle)/
            // toast.success("Post Uploaded!");
            console.log('Uploaded')
          } catch (err) {
            // alert("Post error");
      
            console.log(err);
          }
        };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDocument(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const GetAuth = async () => {
    try {
      const response = await fetch("https://imagekit-la4g.onrender.com/auth");
      const data = await response.json();
      return data;
    } catch (err) {
      toast.error("ImageKit Server Error.");

      return null;
    }
  };

  useEffect(() => {
    const uploadFile = async () => {
      setIsUploading(true);
      const authData = await GetAuth();
      if (!authData || !document?.uri) return;

      const fileToUpload = {
        file: {
          uri: document.uri,
          name: document.name,
          type: document.mimeType || "application/octet-stream",
        },
        fileName: document.name,
        tags: ["post_upload"],
      };

      imagekit.upload(
        {
          file: fileToUpload.file,
          fileName: fileToUpload.fileName,
          token: authData.token,
          expire: authData.expire,
          signature: authData.signature,
        },
        (err, result) => {
          if (err) {
            console.error("Upload error:", err);
            setIsUploading(false);
          } else {
            console.log("Upload successs:", result);
            setDocumentUrl(result.url);
            setIsUploading(false);

            // Optionally set uploaded URL to state for use elsewhere
          }
        }
      );
    };

    if (document) {
      uploadFile();
    }
  }, [document]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Create a Book</Text>

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
        <Text style={styles.label}>Document</Text>
        <Pressable style={styles.documentPicker} onPress={pickDocument}>
          <View style={styles.documentContent}>
            <Text style={styles.documentIcon}>📄</Text>
            <Text style={styles.documentText}>
              {document ? `Document: ${document.name}` : "Pick a document"}
            </Text>
          </View>
        </Pressable>

        {/* Dropdown */}
        <Text style={styles.label}>Grade</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={classes}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Grade"
          value={classesValue}
          onChange={(item) => {
            setClassesValue(item.value);
          }}
          renderLeftIcon={() => (
            <Ionicons
              style={{ marginInline: 5 }}
              color="black"
              name="star"
              size={20}
            />
          )}
        />

        {/* Post Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={HandlePost}
          disabled={isUploading}
        >
          <Text style={styles.buttonText}>{ isUploading ? "Uploading..." : " 🚀 Post"}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30, // To make sure the content is not cut off
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
    color: "#333",
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
  documentPicker: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  documentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  documentIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  documentText: {
    fontSize: 16,
    color: "#444",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  inputSearchStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
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

export default CreateBook;
