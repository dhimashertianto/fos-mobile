import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Alert, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import FamilyPage from '../screens/FamilyPage';
import ChatRoom from '../screens/ChatRoom';
import {clearUser} from '../store/userSlice';

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
