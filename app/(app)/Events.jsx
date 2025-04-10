import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, RefreshControl } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from "../../firebase";

const Events = () => {
  const EventsRef = collection(db, "Schools", "Mission", "Events");
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const eventsSnapshot = await getDocs(EventsRef);
      setEvents(eventsSnapshot.docs.map(doc => doc.data()));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData().finally(() => setRefreshing(false));
  };

  const renderEvent = ({ item }) => (
    <View style={styles.Event}>
      <View style={styles.EventImage}>
        <Image
          style={{ width: '100%', height: "100%" }}
          source={{ uri: item.Banner_URL }}
        />
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.EventTitle}>{item.Title}</Text>
        <Text style={styles.EventPrice}>{item.is_paid ? 'Paid' : 'Free'}</Text>
        <Text style={styles.EventDescription}>{item.Description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.eventContainer}>
      <View style={styles.TopTexts}>
        <Text style={styles.eventsTitle}>Upcoming Events</Text>
      </View>

      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  TopTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  eventsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  eventMore: {
    color: '#FF9E02',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  Event: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  EventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  eventContent: {
    justifyContent: 'center',
    flex: 1,
  },
  EventTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  EventPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#28a745',
    marginBottom: 10,
  },
  EventDescription: {
    fontSize: 14,
    color: '#6A6A6A',
    lineHeight: 20,
  },
});

export default Events;
