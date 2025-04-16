import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { createContext } from "react";
import { ActivityIndicator, Text } from "react-native";
import { View } from "react-native";
import { doc, getDoc } from "firebase/firestore";

export const UserAuth = createContext();

export default function RootLayout() {
  const [user, setUser] = useState(undefined);
  const [userStat, setUserStat] = useState(undefined);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (curruser) => {
      if (curruser) {
        setUser(curruser);
        console.log(curruser.uid);
        const userRef = doc(db, "Schools", "Mission", "Users", curruser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserStat(docSnap.data());
          // console.log(docSnap.data(), "dd");
        } else {
          setUserStat(null);
          setUser(null)
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // console.log(userStat, "wsgg");

  console.log(user);
  return (
    <UserAuth.Provider value={{ user, setUser, userStat, setUserStat }}>
      {user === undefined ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }} />
      )}
    </UserAuth.Provider>
  );
}
