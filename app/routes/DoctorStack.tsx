import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';

import ChatList from '../screens/ChatList';
import ChatRoom from '../screens/ChatRoom';
import {typeVariants} from '../theme/theme';
import {Alert, Text, TouchableOpacity} from 'react-native';
import {clearUser} from '../store/userSlice';

const Stack = createNativeStackNavigator();

export default function DoctorStack() {
  const dispatch = useDispatch();

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
        options={{
          headerTitle: 'Chat List',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                  {text: 'Cancel', style: 'cancel'},
                  {text: 'YES', onPress: () => dispatch(clearUser())}, // Or navigation.goBack()
                ]);
              }}
              style={{marginRight: 15}}>
              <Text>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({route}) => ({title: route.params.doctorName})}
      />
    </Stack.Navigator>
  );
}
