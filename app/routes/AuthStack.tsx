import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import RegisterDoctor from '../screens/auth/RegisterDoctor';
import RegisterFamily from '../screens/auth/RegisterFamily';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterDoctor" component={RegisterDoctor} />
      <Stack.Screen name="RegisterFamily" component={RegisterFamily} />
    </Stack.Navigator>
  );
}
