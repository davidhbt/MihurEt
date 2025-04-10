import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Post = () => {
  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>Post Title</Text>
        <Text style={styles.postDate}>28th February 2023</Text>
      </View>
      <Text style={styles.postDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
      <Pressable style={styles.downloadAttachment}>
        <Text style={styles.downloadAttachmentText}>Download Attachment</Text>
      </Pressable>
      <View style={styles.recommendedPostTab}>
        <Text style={styles.recommendedPostTabText}>Recommended Posts</Text>
        <ScrollView style={{flex: 1 }}>
              <View style={styles.PostsContainer}>
                <View style={styles.posts}>
                  <View style={styles.post}>
                    <View style={styles.topContent}>
                      <Text style={styles.authurname}>David Habte</Text>
                      <Text style={styles.postDate}> Date: 2025/2/34</Text>
                    </View>
                    <View style={styles.content}>
                      <View style={styles.writing}>
                        <Text style={styles.WritingTitle}>Computer Networking</Text>
                        <Text style={styles.WritingDescription}>
                          Computer Networking Fundmentals by Gemechu aschalew
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
  eventsTitle: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 10,
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
      width: 50,
      height: 50,
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
  postDate: {
    fontWeight: "500",
    opacity: 0.6,
    fontSize: 13,
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
    transform: "rotate(30deg)",
  },
})

export default Post

