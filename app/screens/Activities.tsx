import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Layout from '../components/Layout';
import {
  activitiesAdded,
  activitiesToggled,
  resetActivities,
} from '../store/activitiesSlice';
import {RootState} from '../store/store';
import {useTheme} from '../theme/useTheme';

const Activities = () => {
  const dispatch = useDispatch();
  const {theme} = useTheme();
  const inputRef = useRef<TextInput>(null);
  const activities = useSelector(
    (state: RootState) => state.activities.entities,
  );

  const addNewActivities = () => {
    let temp = 'new task';
    if (temp !== '') {
      dispatch(activitiesAdded({id: Date.now(), title: temp, done: false}));
    }
    inputRef.current?.clear();
  };

  const handleComplete = (id: string) => {
    dispatch(activitiesToggled(id));
  };

  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set time to midnight
    return midnight.getTime() - now.getTime(); // Time until midnight in ms
  };

  useEffect(() => {
    const timeUntilMidnight = getTimeUntilMidnight();

    const timer = setTimeout(() => {
      dispatch(resetActivities());
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [dispatch]);

  let emptyVariable = activities.filter(item => !item.done) || [];

  return (
    <Layout>
      <View style={styles.container}>
        <Pressable onPress={() => dispatch(resetActivities())}>
          <Text style={styles.title}>Today's Activities</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Active Tasks</Text>
        {emptyVariable.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.achievementContainer}>
              <Text style={styles.emptyText}>
                All activities completed for today!
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🏆</Text>
              </View>
              <Text style={styles.achievementText}>Daily Goal Achieved!</Text>
              <Text style={styles.rewardText}>
                You've earned {'totalPoints'} points for completing all
                activities
              </Text>
              <TouchableOpacity
                style={[styles.completeButton]}
                onPress={addNewActivities}>
                <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            key={(item: {id: any}) => item.id}
            data={activities.filter(item => !item.done)}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.activityItem}>
                <Text style={styles.activityText}>{item.title}</Text>
                <TouchableOpacity
                  style={[
                    styles.completeButton,
                    {backgroundColor: theme.primary},
                  ]}
                  onPress={() => handleComplete(item.id)}>
                  <Text style={styles.buttonText}>
                    {item.done ? 'Completed' : 'Submit'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 8,
  },
  activityText: {
    fontSize: 16,
  },
  completeButton: {
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -200,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  achievementContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    minHeight: 250,
  },
  badge: {
    width: 80,
    height: 80,
    backgroundColor: '#FFD700',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 40,
  },
  achievementText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  rewardText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  completedItem: {
    backgroundColor: '#E8F5E9',
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default Activities;
