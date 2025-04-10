import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {auth} from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";
import { ActivityIndicator, Text } from "react-native";
import { View } from "react-native";


export const UserAuth = createContext()

export default function RootLayout() {
  const [user, setUser] = useState(undefined)
  useEffect(() =>{
    const updateUser = onAuthStateChanged(auth, (curruser) =>{
      setUser(curruser)
    })
    return () => updateUser();
  }, [])

  console.log(user)
  return (
    <UserAuth.Provider value={{ user, setUser }}>
      {user === undefined ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }} />
      )}
    </UserAuth.Provider>
  )
  
}
