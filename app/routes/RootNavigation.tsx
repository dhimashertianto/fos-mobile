import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { getSecureValue } from '../utils/keyChain';
import { updateToken } from '../store/userSlice';
import { RootState } from '../store/store';

import AuthStack from './AuthStack';
import DoctorStack from './DoctorStack';
import FamilyStack from './FamilyStack';
import UserStack from './UserStack';

export default function RootNavigation() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Sync token from secure storage
  useEffect(() => {
    async function checkIsLogined() {
      try {
        const temp = await getSecureValue('token');
        dispatch(updateToken({ token: temp }));
      } catch (e) {
        console.log('Error checking token:', e);
      }
    }
    checkIsLogined();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {!user.token ? (
        <AuthStack />
      ) : user.role === 'doctor' ? (
        <DoctorStack />
      ) : user.role === 'family' ? (
        <FamilyStack />
      ) : (
        <UserStack />
      )}
    </NavigationContainer>
  );
}
