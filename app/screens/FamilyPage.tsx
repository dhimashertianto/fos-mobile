import {Alert, BackHandler, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useFocusEffect} from '@react-navigation/native';
import {clearUser} from '../store/userSlice';

const FamilyPage = () => {
  const dispatch = useDispatch();
  const activities = useSelector(
    (state: RootState) => state.activities.entities,
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'YES', onPress: () => dispatch(clearUser())}, // Or navigation.goBack()
        ]);
        return true; // Prevent default behavior
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove(); // ✅ Correct cleanup
    }, []),
  );

  const doneDataActivities = activities.filter(item => item.done);
  const achievements = [
    {
      id: '1',
      title: 'Daily Task Achievment',
      progress: `${doneDataActivities.length}/${activities.length}`,
      completed: doneDataActivities.length === activities.length,
      icon: '🌟',
    },
    {
      id: '2',
      title: 'Tracker 1 Week',
      progress: '50/100',
      completed: false,
      icon: '💰',
    },
    {
      id: '3',
      title: 'Tracker 1 Year',
      progress: '10/100',
      completed: false,
      icon: '❤️',
    },
  ];
  return (
    <View style={styles.achievementContainer}>
      {achievements.map(item => (
        <View key={item.id} style={styles.achievementCard}>
          <Text style={styles.achievementIcon}>{item.icon}</Text>
          <View style={styles.achievementContent}>
            <Text style={styles.achievementTitle}>{item.title}</Text>
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${
                      (parseInt(item.progress.split('/')[0], 10) /
                        parseInt(item.progress.split('/')[1], 10)) *
                      100
                    }%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{item.progress}</Text>
          </View>
          {item.completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>✓</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default FamilyPage;

const styles = StyleSheet.create({
  achievementContainer: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  completedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
});
