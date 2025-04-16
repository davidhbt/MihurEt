import { View, Text, StatusBar, SafeAreaView, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../../firebase';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { ToastAndroid } from 'react-native';

const Index = () => {
  const [searchInput, setSearchInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [books, setBooks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const BooksRef = collection(db, "Schools", "Mission", "Books");
  const PostsRef = collection(db, "Schools", "Mission", "Posts");
  const EventsRef = collection(db, "Schools", "Mission", "Events");

  const loadData = async () => {
    try {
      const booksSnapshot = await getDocs(BooksRef);
      const postsSnapshot = await getDocs(PostsRef);
      const eventsSnapshot = await getDocs(EventsRef);

      setBooks(booksSnapshot.docs.map(doc => doc.data()));
      setPosts(
        postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setEvents(eventsSnapshot.docs.map(doc => doc.data()));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData().finally(() => setRefreshing(false));
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
      <StatusBar style='light' backgroundColor={'#F39C12'} />
        <ActivityIndicator size="large" color="#F39C12" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar style='light' backgroundColor={'#F39C12'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.homeContent}
      >
        <View style={styles.search}>
          <TextInput
            onChangeText={setSearchInput}
            style={styles.searchInput}
            placeholder="Search Posts"
          />
          <Ionicons style={styles.searchIcon} name="search" onPress={handleSignout} />
        </View>

        {/* EVENTS */}
        <View style={styles.eventContainer}>
          <View style={styles.TopTexts}>
            <Text style={styles.eventsTitle}>Upcoming Events</Text>
            <Text style={styles.eventMore}>See All &gt;</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.Event}>
                <View style={styles.EventImage}>
                  <Image style={{ width: '100%', height: "100%" }} source={{ uri: item.Banner_URL }} />
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.EventTitle}>{item.Title.length > 20 ? `${item.Title.slice(0, 40)}...` : item.Title}</Text>
                  <Text style={styles.EventPrice}>{item.is_paid ? "Paid" : "Free"}</Text>
                  <Text style={styles.EventDescription} numberOfLines={2} ellipsizeMode='tail'>{item.Description}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* BOOKS */}
        <View style={styles.bookContainer}>
          <View style={styles.TopTexts}>
            <Text style={styles.eventsTitle}>Books</Text>
            <Text onPress={() => router.push({ pathname: "(app)/(drawer)/Home/MoreBooks", state: { books: books } })} style={styles.eventMore}>See All &gt;</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={books}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View o style={styles.book}>
                <Text style={styles.bookTitle}>{item.Title}</Text>
                <Text style={styles.bookDescription} numberOfLines={2} ellipsizeMode='tail'>{item.Description}</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  nPress={() => ToastAndroid.show(("Downloading"), ToastAndroid.SHORT)}
                  style={styles.openBookButton}
                >
                  <Text style={styles.openBookText}>Open Book</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* POSTS */}
        <View style={styles.PostsContainer}>
          <View style={styles.TopTexts}>
            <Text style={styles.eventsTitle}>Posts</Text>
            <Text onPress={() => router.push("(app)/(drawer)/Home/MorePosts")} style={styles.eventMore}>See All &gt;</Text>
          </View>
          <FlatList
            data={posts}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push({ pathname: "(app)/(drawer)/Home/[Post]", params: { posts: posts ,id: item.id } })}
                activeOpacity={0.7}
                style={styles.post}
              >
                <View style={styles.topContent}>
                  <Text style={styles.authurname}>{item.Author || "Unknown"}</Text>
                  <Text style={styles.postDate}>Date: --/--/----</Text>
                </View>
                <View style={styles.content}>
                  <View style={styles.writing}>
                    <Text  numberOfLines={1} ellipsizeMode='tail' style={styles.WritingTitle}>{item.Title}</Text>
                    <Text style={styles.WritingDescription}>{item.Description}</Text>
                  </View>
                  <View style={styles.posticoncontainer}>
                    <Ionicons style={styles.postIcon} size={30} name="attach-outline" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  homeContent: {
    flex: 1,
  },
  search: {
    marginHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
    fontSize: 20,
  },
  TopTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventMore: {
    color: '#2C3E50',
    fontSize: 13,
    display: 'none'
  },

  eventContainer: {
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  Event: {
    backgroundColor: 'white',
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    width: 250,
    elevation: 3,
  },
  EventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: 10,
  },
  EventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F39C12',
    marginBottom: 5,
  },
  EventPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  EventDescription: {
    fontSize: 13,
    color: '#6A6A6A',
  },

  bookContainer: {
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  book: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 250,
    padding: 15,
    marginRight: 15,
    elevation: 3,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 10,
  },
  openBookButton: {
    backgroundColor: '#F39C12',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  openBookText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },

  PostsContainer: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  post: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  authurname: {
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  writing: {
    flex: 1,
    paddingRight: 10,
  },
  WritingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  WritingDescription: {
    fontSize: 13,
    opacity: 0.6,
  },
  posticoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  postIcon: {
    transform: [{ rotate: '30deg' }],
    fontSize: 22,
    color: '#555',
  },

  // Loading screen styles
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


export default Index;
