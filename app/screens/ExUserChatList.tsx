import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {clearUser} from '../store/userSlice';
import Layout from '../components/Layout';
import {useTheme} from '../theme/useTheme';
import firestore, {doc} from '@react-native-firebase/firestore';

const ExUserChatList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [doctors, setDoctors] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const {theme} = useTheme();
  const activities = useSelector(
    (state: RootState) => state.activities.entities,
  );

  const fetchDoctors = async () => {
    try {
      const doctorSnapshot = await firestore()
        .collection('users')
        .where('isDoctor', '==', true)
        .get({source: 'server'});
      const doctorList = doctorSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('doctorList', doctorList);
      setDoctors(doctorList.sort((a, b) => a?.name - b?.name));
    } catch (error) {
      console.error('Error fetching doctors: ', error);
    }
  };

  const fetchUser = async () => {
    try {
      const userSnapshot = await firestore()
        .collection('users')
        .where('isUserFos', '==', true)
        .get({source: 'server'});
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('userList', userList);
      setUsers(userList.sort((a, b) => a?.name - b?.name));
    } catch (error) {
      console.error('Error fetching doctors: ', error);
    }
  };

  useEffect(() => {
    if (doctors.length === 0) {
      fetchDoctors();
      fetchUser();
    }
  }, [doctors]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'YES', onPress: () => dispatch(clearUser())}, // Or navigation.goBack()
        ]);
        return true; // Prevent default behavior
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove(); // ✅ Correct cleanup
    }, []),
  );

  const doneDataActivities = activities.filter(item => item.done);
  const achievements = [
    {
      id: '1',
      title: 'Daily Task Achievment',
      progress: `${doneDataActivities.length}/${activities.length}`,
      completed: doneDataActivities.length === activities.length,
      icon: '🌟',
    },
    {
      id: '2',
      title: 'Tracker 1 Week',
      progress: '50/100',
      completed: false,
      icon: '💰',
    },
    {
      id: '3',
      title: 'Tracker 1 Year',
      progress: '10/100',
      completed: false,
      icon: '❤️',
    },
  ];

  const categories = [
    {
      id: '1',
      name: 'dr. Dhimas',
      icon: '👨‍⚕️',
      gender: 'Male',
      speciality: 'Cardiologist',
    },
    {
      id: '2',
      name: 'dr. Dewi',
      icon: '👤',
      gender: 'Female',
      speciality: 'Dermatologist',
    },
    {
      id: '3',
      name: 'dr. Anggi',
      icon: '📊',
      gender: 'Female',
      speciality: 'Pediatrician',
    },
    {
      id: '4',
      name: 'dr.Angga',
      icon: '🏃‍♂️',
      gender: 'Male',
      speciality: 'Neurologist',
    },
  ];

  const handleDoctorPress = (doctor: any) => {
    navigation.navigate('ChatRoom', {
      doctorId: doctor.id,
      doctorName: doctor.name || doctor.username,
      doctorSpeciality: doctor.speciality || doctor.email,
      doctorImage: doctor?.name
        ? require('../assets/images/doctor_male.png')
        : require('../assets/images/avatar_male.png'),
    });
  };

  const renderCategoryCard = ({item}: {item: any}) => (
    <Pressable
      onPress={() => handleDoctorPress(item)}
      style={({pressed}) => [
        styles.card,
        {
          backgroundColor: theme.primary,
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      <Image
        source={
          item.isDoctor
            ? require('../assets/images/doctor_male.png')
            : require('../assets/images/avatar_male.png')
        }
        style={styles.doctorImage}
      />
      <Text style={styles.categoryName}>{item.name || item.username}</Text>
      <Text style={styles.categoryName}>{item.speciality || item.email}</Text>
      <Text
        style={[
          styles.categoryName,
          {position: 'absolute', top: 10, left: 10, color: 'white'},
        ]}>
        {item?.isDoctor ? 'Doctor' : 'User'}
      </Text>
    </Pressable>
  );

  return (
    <>
      <Layout>
        <FlatList
          data={[...doctors, ...users]}
          renderItem={renderCategoryCard}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </Layout>
    </>
  );
};

export default ExUserChatList;

const {width} = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 60 = padding + gap

const styles = StyleSheet.create({
  achievementContainer: {
    gap: 12,
    paddingHorizontal: 22,
    backgroundColor: 'white',
    flex: 1,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  completedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },

  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    marginBottom: 120,
    flex: 1,
    justifyContent: 'space-between',
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
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  doctorImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
});
