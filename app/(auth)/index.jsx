import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
  ToastAndroid,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import bk from "../../assets/test.png";
import { useState } from "react";
import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Toast } from "toastify-react-native";
// import ToastManager from "toastify-react-native/components/ToastManager";

const { width, height } = Dimensions.get("window");

function Index() {
  const [value, setValue] = useState(null);
  const [email, setEmail] = useState('')
  const [Passwrd, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin =  async() =>{
    // console.log("hello")
    setLoading(true)
    if(!email || Passwrd.length < 7){
      // console.log('hell naw')
      setLoading(false)
      ToastAndroid.show(("Invalid Form Input"), ToastAndroid.SHORT)
      
      return;
    }
    try{
      await signInWithEmailAndPassword(auth, email, Passwrd)
      console.log('logged in')
      router.replace("/(app)")
    }catch(err){
      console.log(err)
      ToastAndroid.show(("Invalid Email or Password"), ToastAndroid.SHORT)
    }finally{
      setLoading(false)
    }
  }

  return (
    <ImageBackground source={bk} style={styles.container} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.avoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={styles.Logincontainer}>
            <Text style={styles.pageTitle}>Welcome back 👋</Text>

            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  Mihur<Text style={styles.headerTextSpan}>ET</Text>
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                onChangeText={setEmail}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  autoComplete="none"

                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Password"
                  style={styles.input}
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  autoComplete="none"
                />
              </View>

              <TouchableOpacity style={styles.createAccount}>
                <Link href='/Signup'  style={styles.createAccountText}>Create an Account</Link>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.8}
               style={styles.button}>
                <Text
                 style={styles.buttonText}>{loading ? 'logging in...' : "Login"}</Text>
              </TouchableOpacity>

              <View style={styles.handleBox}>
                <FontAwesome
                  style={styles.handleIcon}
                  name="instagram"
                  size={14}
                  color="#888"
                />
                <Text style={styles.handle}>nukehash</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  avoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  Logincontainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 30, // Increased font size for better prominence
    fontWeight: "700", // Slightly heavier weight
    color: "#fff", // White text color
    marginBottom: 24, // More space below the title
    textAlign: "center",
    opacity: 0.85,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    padding: 26,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#F39C12",
    textAlign: "center",
  },
  headerTextSpan: {
    color: "#2C3E50",
    fontWeight: "800",
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#444",
    opacity: 0.8,
  },
  input: {
    height: 48,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 12,
    color: "#333",
  },
  createAccount: {
    alignSelf: "flex-end",
    marginBottom: 18,
  },
  createAccountText: {
    fontSize: 13,
    color: "#F39C12",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#F39C12",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  handleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    gap: 4,
  },
  handleIcon: {
    // marginRight: 4,
  },
  handle: {
    fontSize: 13,
    color: "#888",
  },
});

export default Index;
