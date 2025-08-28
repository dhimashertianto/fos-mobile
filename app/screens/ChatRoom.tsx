import React, {use, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Layout from '../components/Layout';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {addMessage, clearChat, deleteMessage} from '../store/chatSlice';
import {RootState} from '../store/store';
import firestore from '@react-native-firebase/firestore';
import {selectUser} from '../store/userSlice';

const ChatRoom = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {doctorName, doctorSpeciality, doctorImage} = route.params;
  const [inputText, setInputText] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const user = useSelector(selectUser);
  console.log('user', user);
  console.log('Route Params', route.params);

  // Generate a unique chat ID using doctor name
  const chatId =
    route.params.chatId ||
    React.useMemo(
      () =>
        `chat_${doctorName.replace(/[^a-zA-Z0-9]/g, '_').replace(/\s/g, '')}_${
          user.username
        }`,
      [doctorName],
    );
  console.log('chatId', chatId);
  // Get messages from Redux store
  // const messages = useSelector(
  //   (state: RootState) => state.chat.chats[chatId] || [],
  // );
  useEffect(() => {
    getServerMessages();
  }, [chatId]);

  useEffect(() => {
    const markLastMessageAsRead = async () => {
      const messagesRef = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(1);

      const snapshot = await messagesRef.get();

      if (!snapshot.empty) {
        const lastMessageDoc = snapshot.docs[0];
        const data = lastMessageDoc.data();

        if (
          data.sender !== user.username &&
          !data.readBy?.includes(user.username)
        ) {
          await lastMessageDoc.ref.update({
            readBy: firestore.FieldValue.arrayUnion(user.username),
          });
        }
      }
    };

    markLastMessageAsRead();
  }, [chatId]);

  const getServerMessages = async () => {
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs
          .map(doc => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          })
          .sort((a, b) => a.timestamp - b.timestamp);
        setMessages(newMessages);
      });
    // const messagesSnapshot = await firestore()
    //   .collection('chats')
    //   .doc(chatId)
    //   .collection('messages')
    //   .orderBy('timestamp', 'asc')
    //   .get();
    // const msgs:any = messagesSnapshot.docs.map(doc => doc.data());
    // console.log("msgs",);
    // setMessages(msgs.sort((a, b) => a.timestamp - b.timestamp));
  };

  const chats = useSelector((state: RootState) => state.chat.chats);
  console.log('chats', chats);
  console.log('messages', messages);
  const sendMessage = () => {
    if (inputText.trim()) {
      dispatch(
        addMessage({
          chatId,
          message: {text: inputText, sender: 'user'},
        }),
      );
      if (user.username !== 'doctor') {
        firestore()
          .collection('chats')
          .doc(chatId)
          .set(
            {
              participants: [user.username, doctorName],
            },
            {merge: true},
          )
          .then(() => {
            console.log('Chat created or updated in Firestore');
          })
          .catch(error => {
            console.error(
              'Error creating or updating chat in Firestore:',
              error,
            );
          });
      }
      firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          chatId,
          message: {text: inputText, sender: user.username || 'user'},
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('Message sent to Firestore');
        })
        .catch(error => {
          console.error('Error sending message to Firestore:', error);
        });
      setInputText('');
    }
  };

  const handleClearChat = () => {
    firestore()
      .collection('chats')
      .doc(chatId)
      .delete()
      .then(() => {
        console.log('Chat cleared from Firestore');
      })
      .catch(error => {
        console.error('Error clearing chat from Firestore:', error);
      });
    setMessages([]);
    setInputText('');
    dispatch(clearChat(chatId));
  };

  const handleDeleteMessage = (message: any) => {
    dispatch(deleteMessage({chatId, messageId: message.id}));
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .doc(message.id)
      .delete()
      .then(() => {
        console.log('Message deleted from Firestore');
      })
      .catch(error => {
        console.error('Error deleting message from Firestore:', error);
      });
  };

  const renderHeader = () => {
    if (user.username === 'doctor') {
      return (
        <View style={styles.header}>
          <Image source={doctorImage} style={styles.doctorImage} />
          <Text style={styles.doctorName}>
            {route.params.participants.find(c => c !== route.params.doctorName)}
          </Text>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearChat}>
            <Text style={styles.clearButtonText}>Clear Chat</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.header}>
        <Image source={doctorImage} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.speciality}>{doctorSpeciality}</Text>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearChat}>
          <Text style={styles.clearButtonText}>Clear Chat</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Layout>
      {renderHeader()}
      {/* Add your chat UI components here */}
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef => {
            if (scrollViewRef) {
              scrollViewRef.scrollToEnd({animated: true});
            }
          }}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.message.sender === user.username
                  ? styles.userMessage
                  : styles.doctorMessage,
              ]}>
              <Text
                style={
                  message.message.sender === user.username
                    ? styles.userMessageText
                    : styles.messageText
                }>
                {message.message.text}
              </Text>
              {message.message.sender === user.username && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteMessage(message)}>
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.timestamp}>
                {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  doctorImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  speciality: {
    fontSize: 14,
    color: '#666',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageListContent: {
    paddingBottom: 16,
    flexDirection: 'column',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    position: 'relative',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
  },
  doctorMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
    color: '#333',
  },
  userMessageText: {
    color: '#ffffffff',
    fontSize: 16,
  },
  messageText: {
    color: '#333',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 8,
    color: '#c0c0c0ff',
    marginTop: 4,
    alignSelf: 'flex-end',
    fontStyle: 'italic',
  },
});

export default ChatRoom;
