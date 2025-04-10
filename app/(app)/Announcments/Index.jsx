import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { auth, db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Announcments = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [announcmets, setAnnouncmets] = useState([]);
  const AnnouncmetRef = collection(db, "Schools", "Mission", "Announcments");

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(AnnouncmetRef);
      setAnnouncmets(snapshot.docs.map(doc => doc.data()));
      console.log('got')
    } catch (error) {
      console.error("Error fetching Announcmets:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false))
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <View style={styles.announcmentContainer}>
        <Text style={styles.announcmentsTitle}>
          Latest Announcements from School
        </Text>
        <View style={styles.announcments}>
          {announcmets.map((announcment, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push("(app)/Announcments/Popout")}
              activeOpacity={0.8}
              style={styles.announcment}
            >
              <View style={styles.announcmentPP}>
                <Text style={styles.announcmentInitial}>
                  {announcment.Posted_By.charAt(0)}
                </Text>
              </View>
              <View style={styles.content}>
                <View style={styles.titleRow}>
                  <Text style={styles.announcmentTitle}>
                    {announcment.Title}
                  </Text>
                  <Text style={styles.dateText}>2025/23/01</Text>
                </View>
                <Text style={styles.announcmentDescription}>
                  {announcment.Description.length > 70 ? `${announcment.Description.substring(0, 70)}...` : announcment.Description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
  },
  announcmentContainer: {
    width: "100%",
    paddingTop: 20,
  },
  announcmentsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  announcments: {
    marginBottom: 20,
  },
  announcment: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  announcmentPP: {
    backgroundColor: "#d7d7d7",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  announcmentInitial: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  announcmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    opacity: 0.7,
  },
  announcmentDescription: {
    fontSize: 14,
    color: "#6A6A6A",
    opacity: 0.8,
  },
});

export default Announcments;
