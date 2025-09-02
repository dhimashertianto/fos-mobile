import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {getSecureValue} from '../utils/keyChain';
import {updateToken} from '../store/userSlice';
import {RootState} from '../store/store';

import AuthStack from './AuthStack';
import DoctorStack from './DoctorStack';
import FamilyStack from './FamilyStack';
import UserStack from './UserStack';
import ExUserStack from './ExUserStack';

export default function RootNavigation() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Sync token from secure storage
  useEffect(() => {
    async function checkIsLogined() {
      try {
        const temp = await getSecureValue('token');
        dispatch(updateToken({token: temp}));
      } catch (e) {
        console.log('Error checking token:', e);
      }
    }
    checkIsLogined();
  }, [dispatch]);

  let Stack;

  if (!user.token) {
    Stack = <AuthStack />;
  } else if (user.role === 'doctor') {
    Stack = <DoctorStack />;
  } else if (user.role === 'family') {
    Stack = <FamilyStack />;
  } else if (user.role === 'exuser') {
    Stack = <ExUserStack />;
  } else {
    Stack = <UserStack />;
  }

  return <NavigationContainer>{Stack}</NavigationContainer>;
}
