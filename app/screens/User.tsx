import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Layout from '../components/Layout';
import {useTheme} from '../theme/useTheme';
import {useNavigation} from '@react-navigation/native';

// Sample data for both categories
const successfulQuitters = [
  {
    id: '1',
    name: 'Budi Santoso',
    daysSmokeFree: 365,
    avatar: require('../assets/images/avatar_male.png'),
  },
  {
    id: '2',
    name: 'Siti Aminah',
    daysSmokeFree: 180,
    avatar: require('../assets/images/avatar_female.png'),
  },
];

const tryingToQuit = [
  {
    id: '3',
    name: 'Ahmad Rahman',
    currentProgress: '2 weeks',
    avatar: require('../assets/images/avatar_male.png'),
  },
  {
    id: '4',
    name: 'Diana Putri',
    currentProgress: '5 days',
    avatar: require('../assets/images/avatar_female.png'),
  },
];

const User = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const renderUserCard = ({item, type}: {item: any; type: string}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatRoom', {
          doctorId: item.id,
          doctorName: item.name,
          doctorSpeciality:
            type === 'successful'
              ? `${item.daysSmokeFree} hari bebas rokok`
              : `Progress: ${item.currentProgress}`,
          doctorImage: item.avatar,
        })
      }
      style={({pressed}) => [
        styles.card,
        {
          backgroundColor: theme.primary,
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      <Image source={item.avatar} style={styles.userImage} />
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userStatus}>
        {type === 'successful'
          ? `${item.daysSmokeFree} hari bebas rokok`
          : `Progress: ${item.currentProgress}`}
      </Text>
    </Pressable>
  );

  return (
    <Layout>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Berhasil Berhenti Merokok</Text>
        <FlatList
          data={successfulQuitters}
          renderItem={({item}) => renderUserCard({item, type: 'successful'})}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Sedang Berhenti Merokok</Text>
        <FlatList
          data={tryingToQuit}
          renderItem={({item}) => renderUserCard({item, type: 'trying'})}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </Layout>
  );
};

const {width} = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    paddingHorizontal: 16,
  },
  listContainer: {
    gap: 16,
    paddingHorizontal: 8,
  },
  card: {
    width: cardWidth,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7,
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  userImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
    borderRadius: 32,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  userStatus: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default User;
