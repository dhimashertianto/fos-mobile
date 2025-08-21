import React from 'react';
import {
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

const PersonalDoctor = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const handleDoctorPress = (doctor: any) => {

    navigation.navigate('ChatRoom', {
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpeciality: doctor.speciality,
      doctorImage:
        doctor.gender === 'Male'
          ? require('../assets/images/doctor_male.png')
          : require('../assets/images/doctor_female.png'),
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
          item.gender === 'Male'
            ? require('../assets/images/doctor_male.png')
            : require('../assets/images/doctor_female.png')
        }
        style={styles.doctorImage}
      />
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryName}>{item.speciality}</Text>
    </Pressable>
  );

  return (
    <Layout>
      <FlatList
        data={categories}
        renderItem={renderCategoryCard}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Layout>
  );
};

const {width} = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 60 = padding + gap

const styles = StyleSheet.create({
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
    gap: 16,
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

export default PersonalDoctor;
