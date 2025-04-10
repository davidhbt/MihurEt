import { View, Text, StatusBar } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { router, Stack, Tabs } from 'expo-router'
import { UserAuth } from '../_layout'
import { use } from 'react'
import { ActivityIndicator } from 'react-native-web'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {Drawer} from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
const _layout = () => {
  const {user, setUser} = useContext(UserAuth)
  useEffect(() =>{
    if(user === null){
      router.replace('(auth)')
    }
  },[user])
  
  // if(user === undefined){
  //   return (<ActivityIndicator size={'large'}/>)
  // }else if(user){
  //   return(
  //     <Stack/>
  //   )
  // }


  return (
    <>
    {user &&
    <Tabs screenOptions={{ headerTitleAlign: 'center' , headerShadowVisible: false, tabBarActiveTintColor: "#FFBE57", headerTintColor: "#2C3E50", headerRight: () => (
                <View style={{ marginRight: 10 }}>
                  <Ionicons name='person-circle-outline' color={'#F39C12'} size={28}/>
                  {/* Add your custom component or button here */}
                </View>
              )}}>
      <Tabs.Screen name='(drawer)' options={{headerShown: false, title: 'Home', tabBarIcon: ({color}) => <Ionicons name='home' color={color} size={15}/>}}/>
      <Tabs.Screen name='Events' options={{tabBarIcon: ({color}) => <Ionicons name='today' color={color} size={15}/>}} />
      <Tabs.Screen name='Announcments/Index' options={{title:"Announcments",tabBarIcon: ({color}) => <Ionicons name='megaphone' color={color} size={15}/>}} />
    </Tabs>
    }
  </>
  )
}

export default _layout