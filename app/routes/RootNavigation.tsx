/**
 * This is a Navigation file which is wired already with Bottom Tab Navigation.
 * If you don't like it, feel free to replace with your own setup.
 * Uncomment commented lines from return() of RootNavigation to wire Login flow
 */
import React, {useEffect} from 'react';
import {ColorValue, Text, TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

// Hook for theme change (Light/Dark Mode)
import {typeVariants} from '../theme/theme';
import {useTheme} from '../theme/useTheme';
// Get Value from Keyring (Encrypted token)
import {getSecureValue} from '../utils/keyChain';
// Redux slice for updating Access Token to store
import {clearUser, updateToken} from '../store/userSlice';

import {RootState} from '../store/store';

// Screens
import Register from '..//screens/auth/Register';
import RegisterFamily from '..//screens/auth/RegisterFamily';
import Activities from '../screens/Activities';
import Login from '../screens/auth/Login';
import ChatRoom from '../screens/ChatRoom';
import FamilyPage from '../screens/FamilyPage';
import Home from '../screens/Home';
import News from '../screens/News';
import NewsDetail from '../screens/NewsDetail';
import OrganAnalytics from '../screens/OrganAnalytics';
import PersonalDoctor from '../screens/PersonalDoctor';
import ChatList from '../screens/ChatList';
import Settings from '../screens/Settings';
import ShareAchievement from '../screens/ShareAchievement';
import Tracker from '../screens/Tracker';
import User from '../screens/User';
// Icons for Bottom Tab Navigation
const listSharpIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="list-sharp" size={30} color={color} />
);
const newsIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="newspaper" size={30} color={color} />
);
const homeIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="home" size={24} color={color} />
);
const networkIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="wifi-sharp" size={24} color={color} />
);
const settingsIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="person" size={24} color={color} />
);

// Root Navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Copy existing token from local storage to redux store
  useEffect(() => {
    async function checkIsLogined() {
      try {
        let temp = await getSecureValue('token');
        dispatch(updateToken({token: temp}));
      } catch (e) {}
    }
    checkIsLogined();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user.token === true ? (
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
            options={{headerShown: false}}
            name="MainTabs"
            component={MainTabNavigator}
          />
          <Stack.Screen
            name="PersonalDoctor"
            component={PersonalDoctor}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTitle: 'Personal Doctor',
            }}
          />
          <Stack.Screen
            name="ChatList"
            component={ChatList}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTitle: 'Chat List',
            }}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTitle: 'User',
            }}
          />
          <Stack.Screen
            name="Tracker"
            component={Tracker}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTitle: 'Tracker',
            }}
          />
          <Stack.Screen
            name="Activities"
            component={Activities}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTitle: 'Activities',
            }}
          />
          <Stack.Screen
            name="OrganAnalytics"
            component={OrganAnalytics}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTitle: 'Organ Analytics',
            }}
          />
          <Stack.Screen
            name="ShareAchievement"
            component={ShareAchievement}
            options={{
              headerShown: false,
              headerBackTitle: 'Back',
              headerTitle: 'Organ Analytics',
            }}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={({route}) => ({
              title: route.params.doctorName,
            })}
          />
          <Stack.Screen
            name="NewsDetail"
            component={NewsDetail}
            options={({route}) => ({
              title: route.params.title,
              headerTitle: 'Detail News',
            })}
          />
          <Stack.Screen
            name="FamilyPage"
            component={FamilyPage}
            options={({navigation}) => ({
              headerTitle: 'Family Pages',
              headerLeft: () => (
                <TouchableOpacity onPress={() => dispatch(clearUser())}>
                  <Text style={{marginLeft: 10}}>Logout</Text>
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterFamily" component={RegisterFamily} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// Add this new component for Tab Navigation
function MainTabNavigator() {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: theme.color,
        tabBarActiveTintColor: theme.primary,
        headerStyle: {height: 70},
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: typeVariants.titleLarge.fontFamily,
          fontSize: 18,
          color: theme.primary,
          fontWeight: 'bold',
        },
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: homeIcon,
          tabBarTestID: 'BottomTab.ToDo',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="To Do"
        component={News}
        options={{
          headerShown: false,
          tabBarIcon: newsIcon,
          tabBarTestID: 'BottomTab.News',
          tabBarLabel: 'News',
        }}
      />
      {/* <Tab.Screen
        name="To Do"
        component={Tasks}
        options={{
          headerShown: false,
          tabBarIcon: listSharpIcon,
          tabBarTestID: 'BottomTab.ToDo',
          tabBarLabel: 'Tasks',
        }}
      /> */}
      {/* <Tab.Screen
        name="NetworkExample"
        component={NetworkExample}
        options={{
          headerShown: false,
          tabBarIcon: networkIcon,
          tabBarTestID: 'BottomTab.Network',
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: settingsIcon,
          tabBarLabel: 'Profile',
          tabBarTestID: 'BottomTab.Settings',
        }}
      />
    </Tab.Navigator>
  );
}
