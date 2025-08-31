import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {deleteNewsById} from '../services';
import {useTheme} from '../theme/useTheme';

const NewsDetail = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params;
  const {theme} = useTheme();

  const handlePressDeleteNews = async id => {
    try {
      await deleteNewsById(id);
      Alert.alert('Berita berhasil dihapus');
      navigation.goBack();
    } catch (err) {
      console.error('Gagal hapus berita:', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: item?.gambar_url}} style={styles.image} />
      <Text style={styles.title}>{item?.judul}</Text>
      <Text style={styles.description}>{item?.isi}</Text>
      <Text style={styles.description}>{item?.penulis}</Text>
      <Text style={styles.description}>{item?.tanggal}</Text>
      <Text style={styles.description}>{item?.kategori}</Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.primary}]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={{height: 16}} />
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.error}]}
        onPress={() => handlePressDeleteNews(item?.id)}>
        <Text style={styles.buttonText}>Deleted News</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NewsDetail;
