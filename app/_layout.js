import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {auth} from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";


export const UserAuth = createContext()

export default function RootLayout() {
  const [user, setUser] = useState()
  useEffect(() =>{
    const updateUser = onAuthStateChanged(auth, (curruser) =>{
      setUser(curruser)
    })
    return () => updateUser();
  }, [])

  console.log(user)

  return( 
    <UserAuth.Provider value={{user, setUser}}>
     <Stack screenOptions={{headerShown: false}}/>
     </UserAuth.Provider>
    )
}
