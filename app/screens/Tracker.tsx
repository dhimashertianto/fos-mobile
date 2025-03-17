import React, {use, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Layout from '../components/Layout';
import {useTheme} from '../theme/useTheme';

const Tracker = () => {
  const {theme} = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkpoints, setCheckpoints] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  const submitCheckpoint = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!checkpoints.includes(today)) {
      const newCheckpoints = [...checkpoints, today];
      setCheckpoints(newCheckpoints);
      calculateStreak(newCheckpoints);
    }
  };

  const calculateStreak = (points: string[]) => {
    const sortedDates = [...points].sort();
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currentDate = new Date(sortedDates[i]);
      const diffDays = Math.floor(
        (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    }

    setStreak(currentStreak);
  };

  const renderCalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
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

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Activity Tracker</Text>
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
