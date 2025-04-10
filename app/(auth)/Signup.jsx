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
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import bk from "../../assets/test.png";
import { useState } from "react";

import { Dropdown } from "react-native-element-dropdown";
const { width, height } = Dimensions.get("window");
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
// import { auth, db } from "../../Config/FireBase";
import { collection, setDoc, doc } from "firebase/firestore";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { useContext } from "react";
import { UserAuth } from "../_layout";

function Signup() {
  const { user, setUser } = useContext(UserAuth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [Passwrd, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([{ label: "Mission", value: 1 }]);
  const [Schoolvalue, setSchoolValue] = useState(null);
  const [accountType, setaccountType] = useState([
    { label: "Student", value: 1 },
    { label: "Instructor", value: 2 },
    { label: "Admin", value: 3 },
  ]);
  const [accountTypeValue, setaccountTypeValue] = useState(null);
  const usersRef = collection(db, "Schools", "Mission", "Users");

  const [classes, setClasses] = useState([
    {
      label: "Grade 1",
      value: 1,
    },
    {
      label: "Grade 2",
      value: 2,
    },
    {
      label: "Grade 3",
      value: 3,
    },
    {
      label: "Grade 4",
      value: 4,
    },
    {
      label: "Grade 5",
      value: 5,
    },
    {
      label: "Grade 6",
      value: 6,
    },
    {
      label: "Grade 7",
      value: 7,
    },
    {
      label: "Grade 8",
      value: 8,
    },
    {
      label: "Grade 9",
      value: 9,
    },
    {
      label: "Grade 10",
      value: 10,
    },
    {
      label: "Grade 11",
      value: 11,
    },
    {
      label: "Grade 12",
      value: 12,
    },
  ]);
  const [classesValue, setClassesValue] = useState(null);
  // console.log(accountTypeValue, "hh");

  const handleLogin = async () => {
    // console.log('clickedd')
    // setError(""); // Reset error message
    // setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, Passwrd);
      console.log('step 1')

      // Update user profile with their display name (using their entered name)
      await updateProfile(auth.currentUser, {
        displayName: "Mission", // Use the name entered by the user
      });

      // Add user data to Firestore using the user's UID as document ID
      await setDoc(doc(usersRef, auth.currentUser.uid), { 
        Name: name,
        Email: email,
        ...(accountTypeValue === 1 && {
          Class: classesValue,
          Account_Level: 1,
        }),
        ...(accountTypeValue === 2 && { Account_Level: 2 }),
        ...(accountTypeValue === 3 && { Account_Level: 3 }),
      });

      console.log("User created successfully");
      // Uncomment to redirect to another page after login (if necessary)
      router.replace("/");
      router.replace("/(app)/(drawer)/Home/Index");
    } catch (err) {
      console.log('Failed')
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
      console.log('wsg')
    }
  };

  return (
    <ImageBackground source={bk} style={styles.container} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.avoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView>
            <View style={styles.Logincontainer}>
              {/* <Text style={styles.pageTitle}>Welcome To MihurET👋</Text> */}

              <View style={styles.form}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Create Account</Text>
                  {/* </Text> */}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    onChangeText={setName}
                    style={styles.input}
                    placeholder="Full name"
                    placeholderTextColor="#999"
                    autoComplete="none"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="example@gmail.com"
                    placeholderTextColor="#999"
                    autoComplete="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="**********"
                    style={styles.input}
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoComplete="none"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Account Type</Text>
                  <Dropdown
                    data={accountType}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Account Type"
                    value={accountTypeValue}
                    onChange={(item) => {
                      setaccountTypeValue(item.value);
                    }}
                    renderLeftIcon={() => (
                      <Ionicons
                        style={{ marginInline: 5 }}
                        color="black"
                        name="person"
                        size={20}
                      />
                    )}
                  />
                </View>
                {accountTypeValue === 1 ? (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Grade</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={classes}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Book For Grade?"
                      value={classesValue}
                      onChange={(item) => {
                        setClassesValue(item.value);
                        //   console.log(item.value)
                      }}
                      renderLeftIcon={() => (
                        <Ionicons
                          style={{ marginInline: 5 }}
                          color="black"
                          name="star"
                          size={20}
                        />
                      )}
                    />
                  </View>
                ) : (
                  <></>
                )}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>School</Text>
                  <Dropdown
                    data={schools}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select School"
                    value={Schoolvalue}
                    onChange={(item) => {
                      setSchoolValue(item.value);
                    }}
                    renderLeftIcon={() => (
                      <Ionicons
                        style={{ marginInline: 5 }}
                        color="black"
                        name="library"
                        size={20}
                      />
                    )}
                  />
                </View>

                <TouchableOpacity style={styles.createAccount}>
                  <Link href={"/"} style={styles.createAccountText}>
                    Already Have An Account?
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText}>Create Account</Text>
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
          </ScrollView>
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
    marginTop: 50,
    marginBottom: 50,

    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 25, // Increased font size for better prominence
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
    // height: 5000,
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 30,
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

export default Signup;
