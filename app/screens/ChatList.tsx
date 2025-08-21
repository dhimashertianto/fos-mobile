import React, { use, useEffect } from 'react';
import {
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Layout from '../components/Layout';
import {useTheme} from '../theme/useTheme';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../store/userSlice';
import { doc, setDoc } from '../../node_modules/@react-native-firebase/firestore/lib/modular/index';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';

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

type RootStackParamList = {
  ChatRoom: {
    chatId: string;
    participants: any;
    doctorId: string;
    doctorName: string;
    doctorSpeciality: string;
    doctorImage: any;
  };
  // ...other routes
};

const ChatList = () => {
    const [chatLists, setChatLists] = React.useState([]);
    const [loaded,setLoaded] = React.useState(false);
    const [doctor,setDoctor] = React.useState(null);
    const {theme} = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();


    useEffect(() => {
      if(!loaded && chatLists.length === 0) {
        getChatLists()
      }
        return()=> {
            console.log("Loaded",chatLists)
        }
    }, [loaded,chatLists]);


    const getChatLists = async () => {
        try {
            const snapshot = await firestore().collection('chats').get();

            const chats = snapshot.docs.map(doc => {
                const data = doc.data();
                const doctor = categories.find(c =>
                    data.participants.includes(c.name)
                );

                return {
                    id: doc.id,
                    ...data,
                    doctor, // simpan detail dokter di object chat
                };
            });

            setChatLists(chats);
            setLoaded(true);
        } catch (error) {
            console.error('Error fetching chat lists:', error);
        }
    };


    const handleDoctorPress = (item: any) => {  
        navigation.navigate('ChatRoom', {
            chatId:item.id,
            participants:item.participants,
            doctorId: item.doctor.id,
            doctorName: item.doctor.name,
            doctorSpeciality: item.doctor.speciality,
            doctorImage:
                item.doctor.gender === 'Male'
                ? require('../assets/images/avatar_male.png')
                : require('../assets/images/avatar_female.png'),
            });
    };

  const renderCategoryCard = ({item}: {item: any}) => {

    const doctor = item.doctor; 
    const username = item.participants.find((participant: any) => participant !== user.username);
    if (!doctor) return null;
    return(
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
            username === 'user' || username === "family"
                ? require('../assets/images/avatar_male.png')
                : require('../assets/images/avatar_female.png')
            }
            style={styles.doctorImage}
        />
        <Text style={styles.categoryName}>{username}</Text>

    </Pressable>
  )};

  return (
    <Layout>
        <TouchableOpacity onPress={() => getChatLists()}>
            <Text style={styles.header}>Reload</Text>  
        </TouchableOpacity>
        <FlatList
            data={chatLists}
            renderItem={renderCategoryCard}
            keyExtractor={item => item.id}
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
    width: width * 0.9,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default ChatList;
