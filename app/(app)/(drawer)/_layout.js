import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


const _layout = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          drawerActiveBackgroundColor: '#FFBE57',
          drawerActiveTintColor: 'white',
          headerTintColor: '#2C3E50',
          headerRight: route.name === 'Profile' ? null : () => (
            <View style={styles.headerRight}>
              <Ionicons onPress={() => router.push("Profile")} name='person-circle-outline' color={'#F39C12'} size={28}/>
              {/* Add your custom component or button here */}
            </View>
          )
        })}
        drawerContentContainerStyle={styles.drawerContentContainer}
        drawerStyle={styles.drawer}
        drawerContentOptions={{
          activeTintColor: '#FFBE57',
          inactiveTintColor: '#2C3E50',
          labelStyle: styles.drawerLabel
        }}
      >
        <Drawer.Screen
          name='Home' 
          options={{
            title: 'Home',
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={size}
              />
            )
          }}
        />
        <Drawer.Screen 
          name='Profile' 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'person-circle' : 'person-circle-outline'}
                color={color}
                size={size}
              />
            )
          }}
        />

        <Drawer.Screen 
          name='Create' 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'add' : 'add-outline'}
                color={color}
                size={size}
              />
            )
          }}
        />
        {/* <Drawer.Screen 
          name='Notfications' 
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'md-notifications' : 'md-notifications-outline'}
                color={color}
                size={size}
              />
            )
          }}
        /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContentContainer: {
    paddingVertical: 20,
  },
  drawer: {
    backgroundColor: 'white',
  },
  drawerLabel: {
    fontSize: 18,
    marginLeft: -20,
  },
  headerRight: {
    marginRight: 10,
  },
});

export default _layout;

