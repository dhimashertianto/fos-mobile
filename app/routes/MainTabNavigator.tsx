import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import News from '../screens/News';
import Settings from '../screens/Settings';
import { useTheme } from '../theme/useTheme';
import { typeVariants } from '../theme/theme';

const Tab = createBottomTabNavigator();

const TabIcon = (name: string, size = 24) =>
  ({ color }: { color: string }) =>
    <Icon name={name} size={size} color={color} />;

export default function MainTabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: theme.color,
        tabBarActiveTintColor: theme.primary,
        headerStyle: { height: 70 },
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
          tabBarIcon: TabIcon('home', 24),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: TabIcon('newspaper', 30),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{
          tabBarIcon: TabIcon('person', 24),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
