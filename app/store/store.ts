import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {reduxStorage} from './storage';

// Slices
import tasksSlice from './tasksSlice';
import userSlice from './userSlice';
import dummyNetwokSlice from './dummyNetwork';
import chatSlice from './chatSlice';
import activitiesSlices from './activitiesSlice';
import trackerSlices from './trackerSlice';

const rootReducer = combineReducers({
  todos: tasksSlice,
  user: userSlice,
  dummyNetwork: dummyNetwokSlice,
  chat: chatSlice,
  activities: activitiesSlices,
  tracker: trackerSlices,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
