import { View, Text, StatusBar, Button, SafeAreaView, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { Ionicons } from '@expo/vector-icons';


const Index = () => {
  const [searchInput, setSearchInput] = useState("")
    const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = () => {
      setRefreshing(true);
      // Simulate reloading data
      setTimeout(() => {
        setRefreshing(false);
      }, 1500);
    };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.Container}  >
      <StatusBar backgroundColor={'#F39C12'} />
      <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} 
            />}  style={styles.homeContent}>
        <View style={styles.search} >
          <TextInput onChangeText={setSearchInput} style={styles.searchInput} placeholder='Search Posts' />
          <Ionicons style={styles.searchIcon} name='search' onPress={handleSignout}/>
        </View>
        <View style={styles.eventContainer}>
          <View style={styles.TopTexts}>
            <Text style={styles.eventsTitle}>Upcoming Events</Text>
            <Text style={styles.eventMore}>See All &gt;</Text>
          </View>
          <View style={styles.Events}>
            <View style={styles.Event}>
              <View style={styles.EventImage}>
                <Image
                  style={{ width: '100%', height: "100%" }}
                  source={{ uri: 'https://cdnsm5-ss15.sharpschool.com/UserFiles/Servers/Server_84463/Image/AP-Logo.jpg' }}
                />
              </View>
              <View style={styles.eventContent}>
                <Text style={styles.EventTitle}>Title</Text>
                <Text style={styles.EventPrice}>Free</Text>
                <Text style={styles.EventDescription}>
                  Get our next and upcoming Tickets for Free
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bookContainer}>
          <View style={styles.TopTexts}>
            <Text style={styles.eventsTitle}>Books</Text>
            <Text style={styles.eventMore}>See All &gt;</Text>
          </View>
          <View style={styles.Books}>
            <View style={styles.book}>
              <Text style={styles.bookTitle}>Grade 9 Chemistry Book</Text>
              <Text style={styles.bookDescription}>This is the official grade 9 chemistry book</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.openBookButton}
              >
                <Text style={styles.openBookText}>Open Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.PostsContainer} >
        <View style={styles.TopTexts}>
            <Text style={styles.eventsTitle}>Posts</Text>
            <Text style={styles.eventMore}>See All &gt;</Text>
          </View>
          <View style={styles.posts}>
            <View style={styles.post}>
              <View style={styles.topContent}>
                <Text style={styles.authurname}>David Habte</Text>
                <Text style={styles.postDate}> Date: 2025/2/34</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.writing}>
                  <Text style={styles.WritingTitle}>Computer Networking</Text>
                  <Text style={styles.WritingDescription}>Computer Networking Fundmentals by Gemechu aschalew</Text>
                </View>
                <View style={styles.posticoncontainer}>

                <Ionicons style={styles.postIcon} size={30} name='attach-outline'/>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F2F2F2'
  },
  homeContent: {
    flex: 1,
    // paddingTop: 
  },
  eventContainer: {
    paddingTop: 15,
    width: "100%",
    paddingHorizontal: 15,
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
  },
  Events: {
    marginVertical: 10,
  },
  Event: {
    backgroundColor: 'white',
    minHeight: 300,
    maxHeight: 350,
    width: 250,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  EventImage: {
    height: "60%",
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  eventContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  EventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff9e02'
  },
  EventPrice: {
    fontSize: 15,
    // color: '#'
    // fontWeight: 500,
    fontWeight: 'bold'
  },
  EventDescription: {
    fontSize: 14,
    color: '#6A6A6A',
  },
  book: {
    width: 250,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    gap: 10,
  },
  bookContainer: {
    width: "100%",
    paddingHorizontal: 15,
    minHeight: 200,
  },
  Books: {},
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  bookDescription: {
    fontSize: 13,
    opacity: 0.7
  },
  openBookButton: {
    width: 150,
    height: 43,
    backgroundColor: '#F39C12',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  openBookText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  search:{
    margin: 'auto',
    width: '90%',
    height: 50,
    flexDirection: 'row',
    paddingInline: 15,
    backgroundColor: 'white',
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10
  },
  searchInput:{
    flex: 1
  },
  PostsContainer: {
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 30
  },
  post:{
    backgroundColor: 'white',
    padding: 20,
    gap: 10,
    borderRadius: 10,
  }
  ,
  topContent:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }
  ,
  authurname:{
    fontWeight: 'bold'
  }
  ,
  postDate:{
    fontWeight: '500',
    opacity: 0.6,
    fontSize: 13
  }
  ,
  content:{
    width: '100%',
    // backgroundColor: 'red',
    flexDirection: 'row'
  }
  ,
  writing:{
    // backgroundColor: 'green',
    width: '80%'
  }
  ,
  WritingTitle:{
fontSize: 18,
fontWeight: 'bold'
  }
  ,
  WritingDescription:{
    opacity: 0.5
  }
  ,
  posticoncontainer:{
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  postIcon:{
    transform: "rotate(30deg)"
  }


});

export default Index;

