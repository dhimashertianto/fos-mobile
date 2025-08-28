import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../store/userSlice';
import {removeSecureValue} from '../utils/keyChain';

import Card from '../components/Card';
import Layout from '../components/Layout';
import MenuItem from '../components/MenuItem';
import Text from '../components/Text';
import {useTheme} from '../theme/useTheme';

const avatar = require('../assets/images/avatar_male.png');

const Settings = () => {
  const {theme, toggleTheme} = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const handleLogout = () => {
    // Remove both access token and refresh token from Local
    removeSecureValue('token');
    removeSecureValue('refresh_token');
    // Remove access token from redux store
    dispatch(clearUser());
  };

  return (
    <Layout>
      <ScrollView
        style={[styles.contentContainer]}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <Card style={[styles.card, {backgroundColor: theme.layoutBg}]}>
          <View style={styles.profileSection}>
            <Pressable style={styles.avatarContainer}>
              <Image source={avatar} style={styles.avatarLarge} />
              <View style={styles.editAvatarBadge}>
                <Text style={styles.editAvatarText}>Edit</Text>
              </View>
            </Pressable>

            <View style={styles.profileInfo}>
              <Text style={[styles.name, {color: theme.color}]}>
                {user.username}
              </Text>
              <Text style={[styles.username, {color: theme.color}]}>
                Day 7 Smoke-Free
              </Text>
              <Text style={[styles.bio, {color: theme.color}]}>
                Former smoker on a journey to better health. Quit smoking after
                10 years. Every day is a new victory! 🚭
              </Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, {color: theme.color}]}>
                  168
                </Text>
                <Text style={[styles.statLabel, {color: theme.color}]}>
                  Hours Free
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, {color: theme.color}]}>
                  $85
                </Text>
                <Text style={[styles.statLabel, {color: theme.color}]}>
                  Saved
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, {color: theme.color}]}>
                  140
                </Text>
                <Text style={[styles.statLabel, {color: theme.color}]}>
                  Cigs Avoided
                </Text>
              </View>
            </View>

            <View style={styles.achievementBadge}>
              <Text style={styles.achievementText}>🏆 One Week Milestone!</Text>
            </View>
          </View>
        </Card>

        {/* Settings Section */}
        <Card style={[styles.card, {backgroundColor: theme.cardBg}]}>
          <Text style={[styles.sectionTitle, {color: theme.color}]}>
            Settings
          </Text>
          <MenuItem
            label="Edit Profile"
            onPress={() => console.log('edit profile')}
          />
          <MenuItem
            label="Clear Cache"
            onPress={() => console.log('clear cache')}
          />
          <MenuItem
            label="Clear History"
            onPress={() => console.log('clear history')}
          />
          <MenuItem
            label="Dark Mode"
            onPress={() => {}}
            rightItem={
              <Switch
                testID="Settings.ThemeSwitch"
                value={theme.name === 'dark'}
                onValueChange={value => toggleTheme(value)}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={theme.name === 'dark' ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            }
          />
          <MenuItem
            label="Terms & Conditions"
            onPress={() => console.log('terms')}
          />
          <MenuItem label="About" onPress={() => console.log('about')} />
          <MenuItem label="Logout" onPress={handleLogout} />
        </Card>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  card: {
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#81b0ff',
    padding: 6,
    borderRadius: 12,
  },
  editAvatarText: {
    color: 'white',
    fontSize: 12,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    marginBottom: 12,
    opacity: 0.8,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  achievementBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Settings;
