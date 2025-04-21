import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '../theme/useTheme';

const ShareAchievement = () => {
  const route = useRoute();
  const {theme} = useTheme();
  const {streakDays} = route.params || {streakDays: 190};

  // Calculate time breakdown
  const months = Math.floor(streakDays / 30);
  const remainingDays = streakDays % 30;
  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;

  const getDurationText = () => {
    const parts = [];
    if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (weeks > 0) parts.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    return parts.join(' ');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.primary}]}>
      <Image
        source={require('../assets/images/crown.png')}
        style={styles.crown}
      />
      <Text style={styles.streakText}>{streakDays}</Text>
      <Text style={styles.daysText}>DAYS</Text>
      <Text style={styles.achievementText}>SMOKE-FREE STREAK</Text>
      <Text style={styles.durationText}>
        Congratulations! You've been smoke-free for {getDurationText()}!
      </Text>
      <Text style={styles.keepGoingText}>Keep up the great work!</Text>
    </View>
  );
};

export default ShareAchievement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  crown: {
    width: 160,
    height: 160,
  },
  streakText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  daysText: {
    fontSize: 32,
    color: '#fff',
    marginTop: -10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  achievementText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  durationText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  keepGoingText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
});
