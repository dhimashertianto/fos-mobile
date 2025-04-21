import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Layout from '../components/Layout';
import {useTheme} from '../theme/useTheme';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
// Sample category data - replace with your actual data
const categories = [
  {id: '1', name: 'Personal Doctor', icon: '👨‍⚕️'},
  {id: '2', name: 'User', icon: '👤'},
  {id: '3', name: 'Tracker', icon: '📊'},
  {id: '4', name: 'Activity', icon: '🏃‍♂️'},
  {id: '5', name: 'Organ Analytics', icon: '🏃‍♂️'},
];

// Updated carousel data with internet images
const carouselData = [
  {
    id: '1',
    image: {
      uri: 'https://images.unsplash.com/photo-1555441293-6c6fb1eb9773?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    title: 'Quit Smoking Today',
    description: 'Take the first step towards a healthier life',
  },
  {
    id: '2',
    image: {
      uri: 'https://images.unsplash.com/photo-1528671839653-1f8ab2e4bda1?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    title: 'Health Risks',
    description: 'Smoking causes lung cancer and heart disease',
  },
  {
    id: '3',
    image: {
      uri: 'https://images.unsplash.com/photo-1720238280746-45a8078fc9f8?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    title: 'Better Future',
    description: 'Live longer, breathe easier',
  },
];

// Add image mapping object
const categoryImages = {
  '1': require('../assets/images/medical-team.png'),
  '2': require('../assets/images/teamwork.png'),
  '3': require('../assets/images/tracker.png'),
  '4': require('../assets/images/activity.png'),
  '5': require('../assets/images/lungs.png'),
};

// Add this near other constant data at the top

const Home = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const activities = useSelector(
    (state: RootState) => state.activities.entities,
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

  const renderCarouselItem = ({item}: {item: any}) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <View style={styles.carouselContent}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === activeIndex
                    ? theme.primary
                    : 'rgba(255,255,255,0.5)',
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderCategories = () => (
    <View style={styles.categoriesGrid}>
      {categories.map(item => (
        <Pressable
          key={item.id}
          onPress={() => {
            switch (item.id) {
              case '1':
                navigation.navigate('PersonalDoctor');
                break;
              case '2':
                navigation.navigate('User');
                break;
              case '3':
                navigation.navigate('Tracker');
                break;
              case '4':
                navigation.navigate('Activities');
                break;
              case '5':
                navigation.navigate('ShareAchievement');
                break;
            }
          }}
          style={({pressed}) => [
            styles.card,
            {
              backgroundColor: theme.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}>
          <Image source={categoryImages[item.id]} style={styles.icon} />
          <Text style={[styles.categoryName, {color: theme.text}]}>
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const renderAchievements = () => (
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
                      (parseInt(item.progress.split('/')[0]) /
                        parseInt(item.progress.split('/')[1])) *
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

  return (
    <ScrollView>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={carouselData}
          renderItem={renderCarouselItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setActiveIndex(Math.round(x / width));
          }}
          keyExtractor={item => item.id}
        />
        {renderDotIndicator()}
      </View>
      <Layout>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Categories</Text>
          {renderCategories()}
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>Achievements</Text>
          </View>

          {renderAchievements()}
        </ScrollView>
      </Layout>
    </ScrollView>
  );
};

const {width} = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 60 = padding + gap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    gap: 16,
  },
  card: {
    width: cardWidth,
    height: 120,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  carouselContainer: {},
  carouselItem: {
    width: width,
    height: 250,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  carouselDescription: {
    color: '#fff',
    fontSize: 12,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
    color: '#333',
  },
  achievementContainer: {
    gap: 12,
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

export default Home;
