import { View, Text, StatusBar, Button, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'

const Home = () => {
  const handleSignout = async() =>{
    await signOut(auth)
  }

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={'#F39C12'}/>
      <View style={styles.eventContainer} >
        <View style={styles.TopTexts} >
          <Text style={styles.eventsTitle}>Upcoming Events</Text>
          <Text style={styles.eventMore}>See All &gt;</Text>
        </View>
        <View style={styles.Events}>
          <View style={styles.Event}>
            <View style={styles.EventImage}>
              <Image source={{url: 'https://cdnsm5-ss15.sharpschool.com/UserFiles/Servers/Server_84463/Image/AP-Logo.jpg'}}/>
            </View>
            <View style={styles.eventContent}>
              <Text style={styles.EventTitle}>Title</Text>
              <Text style={styles.EventPrice} >Free</Text>
              <Text style={styles.EventDescription}>
                Get our next and upencoming Tickets for Free
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    width: '100%',
  },
  eventContainer:{
    width: "100%",
    paddingInline: 15,
    backgroundColor: 'red'
  }
})

export default Home