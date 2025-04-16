import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { namedQuery } from 'firebase/firestore'
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db, auth } from '../../../firebase';

const Popout = () => {
  const { id } = useLocalSearchParams(); 
    const PostsRef = doc(db, "Schools", "Mission", "Announcments", id);
    const [announcment, setAnnouncment] = useState(null)

  const FetchPosts = async () => {
      try {
        const snapshot = await getDoc(PostsRef);
        if (snapshot.exists()) {
          const postData = { id: snapshot.id, ...snapshot.data() };
          setAnnouncment(postData);
        }
  
        setLoading(false);
      } catch (err) {
        console.log("Error fetching post:", err);
        setLoading(false);
      }
    };

    useEffect(() =>{
      FetchPosts()
    }, [])

  console.log(announcment)
  return (
    <View style={s.container}>
      <View style={s.content}>
        <View style={s.topPart}>
          <View style={s.iconHolder}>
            <Text style={s.initial}>C</Text>
          </View>
          <View style={s.details}>
            <Text style={s.name}>
              {announcment?.Posted_By}
            </Text>
            <Text style={s.date}>
              2025/5/33
            </Text>
          </View>
        </View>
        <View style={s.writing}>
          {/* <Text style={s.contentTitle}>Exam Notice</Text> */}
          <Text style={s.contentDescription}>
            {announcment?.Description}
          </Text>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  topPart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10
  },
  iconHolder: {
    borderRadius: 25,
    backgroundColor: '#d7d7d7',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  initial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  writing: {
    paddingTop: 15,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  contentDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
})

export default Popout
