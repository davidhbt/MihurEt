import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const MorePosts = () => {
  return (
    <ScrollView style={{padding: 15}}> 
          <Text style={styles.eventsTitle}>Posts</Text>
<View style={styles.PostsContainer} >
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
  );
};

const styles = StyleSheet.create({
eventsTitle: {
    fontSize: 25,
    fontWeight: 700
},

  PostsContainer: {
    width: "100%",
    // paddingHorizontal: 15,
    // marginBottom: 30
    marginBlock: 10
  },
  post:{
    backgroundColor: 'white',
    padding: 15,
    gap: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:3,
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

export default MorePosts;
