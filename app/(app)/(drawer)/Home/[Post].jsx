import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../../../firebase'

const Post = () => {
  const { id } = useLocalSearchParams()
  const PostsRef = doc(db, "Schools", "Mission", "Posts", id)
  const [post, setPost] = useState(null)

  const FetchPosts = async () => {
    try {
      const snapshot = await getDoc(PostsRef)
      if (snapshot.exists()) {
        const postData = { id: snapshot.id, ...snapshot.data() }
        setPost(postData)
        console.log(postData, 'Fetched Post')
      }
    } catch (err) {
      console.log('Error fetching post:', err)
    }
  }

  useEffect(() => {
    FetchPosts()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>
          {post ? post.Title : 'Loading...'}
        </Text>
        <Text style={styles.postDate}>
          {post?.CreatedAt ? new Date(post.CreatedAt.seconds * 1000).toDateString() : ''}
        </Text>
      </View>

      <Text style={styles.postDescription}>
        {post ? post.Description : 'Fetching post description...'}
      </Text>

      {post?.AttachmentURL && (
        <Pressable style={styles.downloadAttachment} onPress={() => {
          // You could implement FileSystem.downloadAsync if needed here
          console.log('Download URL:', post.AttachmentURL)
        }}>
          <Text style={styles.downloadAttachmentText}>Download Attachment</Text>
        </Pressable>
      )}

      <View style={styles.recommendedPostTab}>
        <Text style={styles.recommendedPostTabText}>Recommended Posts</Text>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.PostsContainer}>
            <View style={styles.posts}>
              <View style={styles.post}>
                <View style={styles.topContent}>
                  <Text style={styles.authurname}>David Habte</Text>
                  <Text style={styles.postDate}>Date: 2025/2/34</Text>
                </View>
                <View style={styles.content}>
                  <View style={styles.writing}>
                    <Text style={styles.WritingTitle}>Computer Networking</Text>
                    <Text style={styles.WritingDescription}>
                      Computer Networking Fundamentals by Gemechu Aschalew
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
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  postDate: {
    fontSize: 12,
    color: '#666',
  },
  postDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  downloadAttachment: {
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F39C12',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  downloadAttachmentText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recommendedPostTab: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    overflow: 'hidden',
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
})

export default Post
