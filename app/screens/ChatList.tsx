import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  View,
} from 'react-native';
import Layout from '../components/Layout';
import {useTheme} from '../theme/useTheme';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../store/userSlice';

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
};

const ChatList = () => {
    const [chatLists, setChatLists] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const {theme} = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const user = useSelector(selectUser);
    console.log("Current user:",user);
    useEffect(() => {
        if (!user || !user.name) return;
        const unsubscribeChats = firestore()
            .collection('chats')
            .where('participants', 'array-contains', user.name)
            .onSnapshot(snapshot => {
                const chatDocs = snapshot.docs;
                const newChatLists: any[] = [];
                const messageUnsubscribers: (() => void)[] = [];

                chatDocs.forEach(doc => {
                const data = doc.data();
                const chatId = doc.id;

                const doctor = user.name;

                const chatItem = {
                    id: chatId,
                    ...data,
                    doctor,
                    lastMessage: null,
                };

                newChatLists.push(chatItem);

                const unsubscribeMessage = firestore()
                    .collection('chats')
                    .doc(chatId)
                    .collection('messages')
                    .orderBy('timestamp', 'desc')
                    .limit(1)
                    .onSnapshot(messageSnapshot => {
                    const lastMessageDoc = messageSnapshot.docs[0];
                    const lastMessageData = lastMessageDoc?.data();

                    const lastMessage = lastMessageDoc
                        ? {
                            id: lastMessageDoc.id,
                            ...lastMessageData,
                            isUnread:
                            lastMessageData.sender !== user.username &&
                            !lastMessageData.readBy?.includes(user.username),
                        }
                        : null;

                    setChatLists(prevChats =>
                        prevChats.map(c => (c.id === chatId ? {...c, lastMessage} : c)),
                    );
                    });

                messageUnsubscribers.push(unsubscribeMessage);
                });

                setChatLists(newChatLists);
                setLoaded(true);

                return () => {
                messageUnsubscribers.forEach(unsub => unsub());
                };
            });

        return () => {
        unsubscribeChats();
        };
  }, [categories]);

  const handleDoctorPress = (item: any) => {
    navigation.navigate('ChatRoom', {
      chatId: item.id,
      participants: item.participants,
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
    const username = item.participants.find(
      (participant: any) => participant !== user.username,
    );

    if (!doctor) return null;

    const messageText = item.lastMessage?.message?.text || '(Belum ada pesan)';
    const messageTime = item.lastMessage?.timestamp
      ? new Date(item.lastMessage.timestamp.toDate()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '';

    return (
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
            username === 'user' || username === 'family'
              ? require('../assets/images/avatar_male.png')
              : require('../assets/images/avatar_female.png')
          }
          style={styles.doctorImage}
        />
        <View>
          <Text style={styles.categoryName}>{username}</Text>
          <Text
            style={[
              styles.lastMessageText,
              item.lastMessage?.isUnread && styles.unreadText,
            ]}>
            {item.lastMessage?.isUnread ? 'New Message' : messageText}
          </Text>
          {messageTime ? (
            <Text style={styles.messageTime}>{messageTime}</Text>
          ) : null}
        </View>
      </Pressable>
    );
  };

  return (
    <Layout>
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
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  doctorImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
    marginRight: 16,
  },
  lastMessageText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  unreadText: {
    fontWeight: 'bold',
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    color: '#555',
    marginTop: 2,
  },
});

export default ChatList;
