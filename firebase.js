
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyDy34UYQD7XgrdwBvQmRXyfWa8nTTTu-yM",
  authDomain: "mihuret.firebaseapp.com",
  projectId: "mihuret",
  storageBucket: "mihuret.firebasestorage.app",
  messagingSenderId: "1058978627384",
  appId: "1:1058978627384:web:f4ffb6bdec901970f74bcd",
  measurementId: "G-H4VF9VTN4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= initializeAuth(app, {
   persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)
