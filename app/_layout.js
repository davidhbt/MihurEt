import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {auth, db} from '../firebase'
import { onAuthStateChanged, getDoc, doc } from "firebase/auth";
import { createContext } from "react";
import { ActivityIndicator, Text } from "react-native";
import { View } from "react-native";


export const UserAuth = createContext()

export default function RootLayout() {
  const [user, setUser] = useState(undefined)
  const [userStat, setUserStat] = useState(undefined)
  useEffect(() =>{
    const updateUser = onAuthStateChanged(auth, async (curruser) =>{
      if(curruser){
        const userRef = doc(db, "Schools", "Mission", "Users", curruser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserStat(docSnap.data());
        } else {
          setUserStat(null)
        }
      }else{
        setUser(null);
      }
    })
    return () => updateUser();
  }, [])

  console.log(user)
  return (
    <UserAuth.Provider value={{ user, setUser }}>
      {user === null ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }} />
      )}
    </UserAuth.Provider>
  )
  
}

