import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator'; // bottom tab
import PersonalDoctor from '../screens/PersonalDoctor';
import ChatList from '../screens/ChatList';
import ChatRoom from '../screens/ChatRoom';
import User from '../screens/User';
import Tracker from '../screens/Tracker';
import Activities from '../screens/Activities';
import OrganAnalytics from '../screens/OrganAnalytics';
import ShareAchievement from '../screens/ShareAchievement';
import NewsDetail from '../screens/NewsDetail';
import {typeVariants} from '../theme/theme';

const Stack = createNativeStackNavigator();

export default function UserStack() {
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
        name="MainTabs"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PersonalDoctor" component={PersonalDoctor} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({route}) => ({title: route.params.doctorName})}
      />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Tracker" component={Tracker} />
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="OrganAnalytics" component={OrganAnalytics} />
      <Stack.Screen
        name="ShareAchievement"
        component={ShareAchievement}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={({route}) => ({
          headerTitle: `Detail News`,
        })}
      />
    </Stack.Navigator>
  );
}
