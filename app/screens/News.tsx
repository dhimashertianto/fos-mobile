import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Layout from '../components/Layout';

// Sample news data about smoking, vaping, and death count
const newsData = [
  {
    id: '1',
    title: 'The Deadly Reality of Smoking and Vaping: A Public Health Crisis',
    imageUrl:
      'https://images.unsplash.com/photo-1686051742304-c31859ab0c7b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL related to the topic
    description:
      'Smoking continues to claim millions of lives worldwide every year, while vaping, often seen as a safer alternative, is linked to a growing number of health issues. The global death toll from smoking is staggering, but efforts to reduce it are ongoing. In this article, we explore the statistics surrounding smoking-related diseases, the impact of public health campaigns, and the role of legislation in curbing tobacco use. We also discuss the emerging trends in vaping and its implications for public health, emphasizing the need for comprehensive education and prevention strategies.',
  },
  {
    id: '2',
    title: 'How Smoking is Linked to Over 8 Million Deaths Annually',
    imageUrl:
      'https://images.unsplash.com/photo-1527099908998-5b73a5fe2a0d?q=80&w=3876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL related to the topic
    description:
      'Every year, smoking is responsible for over 8 million deaths worldwide. This devastating figure highlights the urgent need for awareness, education, and policy changes to combat the smoking epidemic. This article delves into the various health risks associated with smoking, including lung cancer, heart disease, and respiratory illnesses. We examine the socioeconomic factors that contribute to smoking prevalence and the effectiveness of different cessation programs. Additionally, we discuss the role of healthcare providers in supporting patients to quit smoking and the importance of community resources in promoting a smoke-free environment.',
  },
  {
    id: '3',
    title: 'Vaping: A New Threat to Public Health?',
    imageUrl:
      'https://images.unsplash.com/photo-1616065787198-a41b9ab94ef2?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL related to the topic
    description:
      'While vaping has been marketed as a safer alternative to smoking, evidence is emerging that it poses its own significant health risks. Researchers are exploring the long-term effects of vaping, which may contribute to respiratory and cardiovascular diseases. This article reviews the current research on vaping, including its chemical composition and potential health impacts. We also discuss the demographic trends in vaping, particularly among youth, and the regulatory challenges faced by health authorities. The article emphasizes the need for ongoing research and public health initiatives to address the risks associated with vaping.',
  },
  {
    id: '4',
    title: 'Global Efforts to Reduce Smoking-Related Deaths',
    imageUrl:
      'https://images.unsplash.com/photo-1577931170527-cb5c8f39020c?q=80&w=3873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL related to the topic
    description:
      'Many countries have implemented tobacco control policies, such as smoking bans, advertising restrictions, and graphic warning labels. These measures aim to reduce the death toll from smoking, but the battle continues against the tobacco industry. This article analyzes the effectiveness of various tobacco control strategies implemented globally, highlighting successful case studies and ongoing challenges. We explore the role of international organizations in promoting tobacco control and the importance of public awareness campaigns. The article also discusses the future of tobacco control in the face of emerging products like e-cigarettes and heated tobacco products.',
  },
];

const News = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <Pressable
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetail', {item})}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </Pressable>
  );

  return (
    <Layout>
      <FlatList
        data={newsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<Text style={styles.header}>News</Text>}
      />
    </Layout>
  );
};

export default News;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  newsItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
