import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';

const Announcments = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
    
      const onRefresh = () => {
        setRefreshing(true);
        // Simulate reloading data
        setTimeout(() => {
          setRefreshing(false);
        }, 1500); 
      };
      
  return (
    <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} 
                />} style={[styles.container, {paddingHorizontal: 15}]}>
      <View style={styles.announcmentContainer}>
        <Text style={styles.announcmentsTitle}>Latest Annoumcnets from School</Text>
        <View style={styles.announcments} >
          <TouchableOpacity onPress={() => router.push("(app)/Announcments/Popout")}  activeOpacity={0.8} style={[styles.announcment, {backgroundColor: 'white'}]}>
            <View style={styles.announcmentPP}>
              <Text style={styles.announcmentInitial}>C</Text>
            </View>
            <View style={styles.content}>
              <View style={{flexDirection: 'row', width: "100%", justifyContent: 'space-between'}}>

              <Text style={styles.announcmentTitle}>Cmmtc</Text>
              <Text style={{opacity: 0.5}}>2025/23/3</Text>
              </View>
              <Text style={styles.announcmentDescripiton}>hey students as you know final exam ...</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
container:{
  flex: 1, 
  backgroundColor: '#F5F5F5',
},
announcmentContainer:{
  // paddingBlock: 15,
  width: "100%",
},
announcmentsTitle:{
  fontSize: 19,
  fontWeight: 'bold',
  marginBottom: 10,
},
announcments:{
  marginBlock: 10,
},
announcment:{
  flexDirection: 'row',
  height: 60,
  borderRadius: 15,
  justifyContent: "space-between",
  alignItems: 'center',
  paddingInline: 10,
  gap: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
},
announcmentPP: {
  backgroundColor: '#d7d7d7',
  borderRadius: '100%',
  width:45,
  height: 45,
  justifyContent: 'center',
  alignItems: 'center',
},
content:{
  justifyContent: 'center',
  flex: 1,
},
announcmentTitle:{
  fontSize: 18,
  fontWeight: 'bold'
},
announcmentDescripiton:{
  opacity: 0.5
},
announcmentInitial:{
  fontSize: 20,
  fontWeight: 600,
  textAlign: "center",
}

})

export default Announcments

