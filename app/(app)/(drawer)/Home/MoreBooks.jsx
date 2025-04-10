import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const MoreBooks = ({route}) => {
  const {books} = router.params;
  console.log(books)
 
  return (
    <ScrollView style={{padding: 15}}>
          <Text style={styles.eventsTitle}>Books</Text>
      <View style={styles.bookContainer}>
        <View style={styles.TopTexts}>
        </View>
        <View style={styles.Books}>
          <View style={styles.book}>
            <Text style={styles.bookTitle}>Grade 9 Chemistry Book</Text>
            <Text style={styles.bookDescription}>This is the official grade 9 chemistry book</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.openBookButton}>
              <Text style={styles.openBookText}>Open Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
eventsTitle: {
    fontSize: 25,
    fontWeight: 700
},
  book: {
    width: "100%",
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    padding: 15,
    justifyContent: 'space-evenly'
    // gap: 10,
  },
  bookContainer: {
    width: '100%',
    // paddingHorizontal: 15,
    minHeight: 200,
  },
  Books: {},
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookDescription: {
    fontSize: 15,
    opacity: 0.7,
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
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  Books:{
    marginBlock: 10
  }
});

export default MoreBooks;
