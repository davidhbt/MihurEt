import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Drawer from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Drawer
      initialRouteName='Home/Index'
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          drawerActiveBackgroundColor: '#FFBE57',
          drawerActiveTintColor: 'white',
          headerTintColor: '#2C3E50',
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Ionicons name='person-circle-outline' color={'#F39C12'} size={28}/>
              {/* Add your custom component or button here */}
            </View>
          )
        

        }}>
        <Drawer.Screen 
          name='Home/Index' 
          options={{
            title: 'Home'
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default _layout