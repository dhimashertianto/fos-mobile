import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatList from '../screens/ChatList';
import ChatRoom from '../screens/ChatRoom';
import { typeVariants } from '../theme/theme';

const Stack = createNativeStackNavigator();

export default function DoctorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: typeVariants.titleLarge.fontFamily,
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerTitle: 'Chat List' }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({ route }) => ({ title: route.params.doctorName })}
      />
    </Stack.Navigator>
  );
}
