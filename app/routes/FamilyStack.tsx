import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import FamilyPage from '../screens/FamilyPage';
import ChatRoom from '../screens/ChatRoom';
import { clearUser } from '../store/userSlice';

const Stack = createNativeStackNavigator();

export default function FamilyStack() {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FamilyPage"
        component={FamilyPage}
        options={{
          headerTitle: 'Family Pages',
          headerLeft: () => (
            <TouchableOpacity onPress={() => dispatch(clearUser())}>
              <Text style={{ marginLeft: 10 }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({ route }) => ({ title: route.params.doctorName })}
      />
    </Stack.Navigator>
  );
}
