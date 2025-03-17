import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Message {
  text: string;
  sender: 'user' | 'doctor';
}

interface ChatState {
  chats: {
    [chatId: string]: Message[];
  };
}

const initialState: ChatState = {
  chats: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{chatId: string; message: Message}>,
    ) => {
      const {chatId, message} = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = [];
      }
      state.chats[chatId].push(message);
    },
    clearChat: (state, action: PayloadAction<string>) => {
      delete state.chats[action.payload];
    },
    deleteMessage: (state, action) => {
      const {chatId, messageIndex} = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId] = state.chats[chatId].filter(
          (_, index) => index !== messageIndex,
        );
      }
    },
  },
});

export const {addMessage, clearChat, deleteMessage} = chatSlice.actions;
export default chatSlice.reducer;
