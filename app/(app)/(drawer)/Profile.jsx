import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { UserAuth } from '../../_layout';
import { useContext } from 'react';
import { use } from 'react';

const Profile = () => {
  const {user, userStat} = useContext(UserAuth)
  // Function to generate a random 10-digit number as ID
  const generateRandomID = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/1200' }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>DavidHabte</Text>
          {userStat.Account_Level == 1 &&  
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Grade:</Text>
          <Text style={styles.info}>9</Text>
        </View>
}
{
  userStat.Account_Level == 2 &&  <View style={styles.infoContainer}>
  <Text style={styles.infoLabel}>Instructor</Text>
  {/* <Text style={styles.info}>9</Text> */}
</View>
}
{
  userStat.Account_Level == 3 &&  <View style={styles.infoContainer}>
  <Text style={styles.infoLabel}>Admin</Text>
  {/* <Text style={styles.info}>9</Text> */}
</View>
}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Joined:</Text>
          <Text style={styles.info}>{userStat.Date ? userStat?.Date : 'Null'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>ID NO:</Text>
          <Text style={styles.ID}>{user.uid}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '85%',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  photoContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    padding: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    letterSpacing: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ID:{
    fontSize: 10
  },
  infoLabel: {
    fontSize: 16,
    color: '#777',
    fontWeight: '600',
    marginRight: 6,
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
});

export default Profile;
