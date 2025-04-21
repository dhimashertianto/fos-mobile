import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {useTheme} from '../theme/useTheme';

const OrganAnalytics = () => {
  const {theme} = useTheme();
  const organs = [
    {
      name: 'Lungs',
      icon: require('../assets/images/lungs.png'),
      description: 'Respiratory system organ responsible for oxygen exchange',
    },
    {
      name: 'Liver',
      icon: require('../assets/images/liver.png'),
      description: 'Vital organ for detoxification and metabolism',
    },
    {
      name: 'Stomach',
      icon: require('../assets/images/stomach.png'),
      description: 'Digestive organ that processes food',
    },
    {
      name: 'Bladder',
      icon: require('../assets/images/blader.png'),
      description: 'Stores urine before excretion',
    },
  ];

  const renderItem = ({item}) => (
    <View style={[styles.organItem, {backgroundColor: theme.primary}]}>
      <Image source={item.icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={[styles.organTitle, {color: theme.text}]}>
          {item.name}
        </Text>
        <Text style={[styles.organDescription, {color: theme.text}]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={organs}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      numColumns={2}
    />
  );
};

export default OrganAnalytics;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  organItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  organTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  organDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    margin: 10,
    resizeMode: 'contain',
  },
});
