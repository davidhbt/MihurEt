import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  ToastAndroid,

} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { db } from "../../../../firebase";

const Post = () => {
  const { id } = useLocalSearchParams();
  const PostsRef = doc(db, "Schools", "Mission", "Posts", id);
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchPosts = async () => {
    try {
      const snapshot = await getDoc(PostsRef);
      if (snapshot.exists()) {
        const postData = { id: snapshot.id, ...snapshot.data() };
        setPost(postData);
      }

      const postsSnapshot = await getDocs(
        collection(db, "Schools", "Mission", "Posts")
      );

      const allPosts = postsSnapshot.docs
        .filter((doc) => doc.id !== id)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setPosts(allPosts);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching post:", err);
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    // console.log('downloading')
    ToastAndroid.show(("Downloading"), ToastAndroid.SHORT)

    try {
      if (!post?.Attachmet_URL) {
        Alert.alert("No attachment found.");
    ToastAndroid.show(("No Attachment Found"), ToastAndroid.SHORT)

        return;
      }

      const fileUri = FileSystem.documentDirectory + "attachment.pdf"; // Adjust extension if needed

      const downloadResumable = FileSystem.createDownloadResumable(
        post.Attachmet_URL,
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();
      // console.log("Downloaded to:", uri);
    ToastAndroid.show(("Downloaded to:" ,uri), ToastAndroid.SHORT)



      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Download complete", "But sharing is not available.");
      }
    } catch (error) {
      console.error("Download error:", error);
    ToastAndroid.show(("Download Error", error), ToastAndroid.SHORT)

      // Alert.alert("Download Failed", "Unable to download the file.");
    }
  };

  useEffect(() => {
    FetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F39C12" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{post ? post.Title : "Loading..."}</Text>
        <Text style={styles.postDate}>
          {post?.CreatedAt
            ? new Date(post.CreatedAt.seconds * 1000).toDateString()
            : ""}
        </Text>
      </View>

      <Text style={styles.postDescription}>
        {post ? post.Description : "Fetching post description..."}
      </Text>

      {post?.Attachmet_URL && (
        <Pressable style={styles.downloadAttachment} onPress={handleDownload}>
          <Text style={styles.downloadAttachmentText}>Download Attachment</Text>
        </Pressable>
      )}

      <View style={styles.recommendedPostTab}>
        <Text style={styles.recommendedPostTabText}>Recommended Posts</Text>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.PostsContainer}>
            {posts?.map((item) => (
              <View style={styles.post} key={item.id}>
                <View style={styles.topContent}>
                  <Text style={styles.authurname}>
                    {item.Author || "Unknown Author"}
                  </Text>
                  <Text style={styles.postDate}>
                    Date:{" "}
                    {item.CreatedAt
                      ? new Date(
                          item.CreatedAt.seconds * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </View>
                <View style={styles.content}>
                  <View style={styles.writing}>
                    <Text style={styles.WritingTitle}>{item.Title}</Text>
                    <Text style={styles.WritingDescription}>
                      {item.Description?.slice(0, 80) + "..."}
                    </Text>
                  </View>
                  <View style={styles.posticoncontainer}>
                    <Ionicons
                      style={styles.postIcon}
                      size={30}
                      name="attach-outline"
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 23,
  },
  postDate: {
    fontSize: 12,
    color: "#666",
  },
  postDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  downloadAttachment: {
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F39C12",
    borderRadius: 8,
    alignItems: "center",
    marginBlock: 10,
  },
  downloadAttachmentText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  recommendedPostTab: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    overflow: "hidden",
  },
  recommendedPostTabText: {
    fontSize: 20,
  },
  PostsContainer: {
    flex: 1,
    marginBlock: 15,
  },
  post: {
    backgroundColor: "white",
    padding: 15,
    gap: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: 10,
  },
  topContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  authurname: {
    fontWeight: "bold",
  },
  content: {
    width: "100%",
    flexDirection: "row",
  },
  writing: {
    width: "80%",
  },
  WritingTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  WritingDescription: {
    opacity: 0.5,
  },
  posticoncontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  postIcon: {
    transform: [{ rotate: "30deg" }],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
});

export default Post;
