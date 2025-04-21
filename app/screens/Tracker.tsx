import React from 'react';
import {
  Linking,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Layout from '../components/Layout';
import {RootState} from '../store/store';
import {addCheckpoint} from '../store/trackerSlice';
import {useTheme} from '../theme/useTheme';

const Tracker = () => {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const {checkpoints, streak} = useSelector(
    (state: RootState) => state.tracker,
  );

  const submitCheckpoint = () => {
    // const today = new Date().toISOString().split('T')[0];
    const today = new Date();
    const fortyFiveDaysAgo = new Date(today);
    fortyFiveDaysAgo.setDate(today.getDate() - 3);

    const todayString = today.toISOString().split('T')[0];

    if (!checkpoints.includes(today)) {
      dispatch(addCheckpoint(todayString));
    }
  };

  const renderCalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return (
      <View style={styles.calendar}>
        <View style={styles.header}>
          {days.map(day => (
            <Text key={day} style={styles.dayHeader}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.dates}>
          {Array.from({length: lastDay.getDate()}).map((_, index) => {
            const date = new Date(
              today.getFullYear(),
              today.getMonth(),
              index + 1,
            );
            const dateString = date.toISOString().split('T')[0];
            const isCompleted = checkpoints.includes(dateString);

            return (
              <TouchableOpacity
                key={index}
                style={[styles.date, isCompleted && styles.completedDate]}>
                <Text
                  style={[
                    styles.dateText,
                    isCompleted ? styles.completedDateText(theme) : {},
                  ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const shareStreak = async () => {
    try {
      const message = `🎉 I'm celebrating ${streak} days smoke-free! Join me on this amazing journey at fos-achievement.com and let's achieve greatness together! 💪✨`;

      try {
        await Share.share({
          message,
        });
      } catch (shareError) {
        console.log('Share API failed, trying fallback');
        // Fallback to opening a URL
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        const canOpen = await Linking.canOpenURL(url);

        if (canOpen) {
          await Linking.openURL(url);
        } else {
          // If WhatsApp isn't available, try a generic SMS
          const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
          await Linking.openURL(smsUrl);
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.title}>Activity Tracker</Text>
          <Pressable onPress={shareStreak}>
            <Text style={styles.sectionHeader}>share</Text>
          </Pressable>
        </View>
        {renderCalendar()}

        <View style={styles.statsContainer}>
          <Text style={styles.streak}>Current Streak: {streak} days</Text>
          {streak >= 7 && (
            <View style={styles.award}>
              <Text style={styles.awardText}>🏆 7 Day Streak Achievement!</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.primary}]}
          onPress={submitCheckpoint}>
          <Text style={styles.buttonText}>Complete Today's Checkpoint</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  calendar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayHeader: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  date: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  dateText: {
    fontSize: 16,
  },
  completedDate: {
    borderRadius: 20,
  },
  completedDateText: theme => ({
    backgroundColor: theme.primary,
    borderRadius: 20,
    padding: 10,
  }),
  statsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  streak: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  award: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 10,
  },
  awardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tracker;
