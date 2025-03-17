import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Layout from '../components/Layout';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {addMessage, clearChat, deleteMessage} from '../store/chatSlice';
import type {RootState} from '../store'; // Adjust this import based on your store setup

const ChatRoom = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {doctorName, doctorSpeciality, doctorImage} = route.params;
  const [inputText, setInputText] = React.useState('');

  // Generate a unique chat ID using doctor name
  const chatId = React.useMemo(() => `chat_${doctorName}`, [doctorName]);

  // Get messages from Redux store
  const messages = useSelector(
    (state: RootState) => state.chat.chats[chatId] || [],
  );

  const sendMessage = () => {
    if (inputText.trim()) {
      dispatch(
        addMessage({
          chatId,
          message: {text: inputText, sender: 'user'},
        }),
      );
      setInputText('');
    }
  };

  const handleClearChat = () => {
    dispatch(clearChat(chatId));
  };

  const handleDeleteMessage = (messageIndex: number) => {
    dispatch(
      deleteMessage({
        chatId,
        messageIndex,
      }),
    );
  };

  return (
    <Layout>
      <View style={styles.header}>
        <Image source={doctorImage} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.speciality}>{doctorSpeciality}</Text>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearChat}>
          <Text style={styles.clearButtonText}>Clear Chat</Text>
        </TouchableOpacity>
      </View>
      {/* Add your chat UI components here */}
      <View style={styles.chatContainer}>
        <ScrollView
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.sender === 'user'
                  ? styles.userMessage
                  : styles.doctorMessage,
              ]}>
              <Text style={styles.messageText}>{message.text}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteMessage(index)}>
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            multiline
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
  },
  doctorMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  messageText: {
    color: '#FFFFFF',
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
});

export default ChatRoom;
