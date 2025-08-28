// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  name: '',
  username: '',
  token: '',
  role: 'user' | 'doctor' | 'admin' | 'family' ,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      const { name, username, token,role } = action.payload;
      state.name = name;
      state.username = username;
      state.token = token;
      state.role = role;
    },
    updateToken(state, action) {
      state.token = action.payload.token;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { updateUser, updateToken, clearUser } = userSlice.actions;

// 🔑 Selector untuk ambil user state
export const selectUser = (state: RootState) => state.user;
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
