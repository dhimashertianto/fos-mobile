import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {FAB} from 'react-native-paper';
import Layout from '../components/Layout';
import {createNews, getNews} from '../services';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store/store';

const News = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  const [berita, setBerita] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // State form
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [penulis, setPenulis] = useState('');
  const [kategori, setKategori] = useState('');
  const [gambarUrl, setGambarUrl] = useState('');

  const resetForm = () => {
    setJudul('');
    setIsi('');
    setPenulis('');
    setKategori('');
    setGambarUrl('');
  };

  const fetchingNews = async () => {
    try {
      const res = await getNews();
      setBerita(res.data);
    } catch (err) {
      console.error('Gagal mengambil data berita:', err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchingNews();
    }, []),
  );

  const handleSubmit = async () => {
    if (!judul || !isi || !penulis || !kategori) {
      Alert.alert('Validasi', 'Harap isi semua field wajib');
      return;
    }

    const payload = {
      judul,
      isi,
      penulis,
      tanggal: moment().format('YYYY-MM-DDTHH:mm:ss'),
      kategori,
      gambar_url:
        gambarUrl ||
        'https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };

    try {
      await createNews(payload);
      Alert.alert('Sukses', 'Berita berhasil dibuat!');
      setModalVisible(false);
      resetForm();
      fetchingNews();
    } catch (error) {
      Alert.alert('Error', 'Gagal membuat berita');
      console.error(error);
    }
  };

  const renderItem = ({item}) => {
    const date = new Date(item.tanggal);

    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const formattedDate = date
      .toLocaleDateString('en-GB', options)
      .replace(/ /g, '-');

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return (
      <Pressable
        style={styles.newsItem}
        onPress={() => navigation.navigate('NewsDetail', {item})}>
        <Image source={{uri: item.gambar_url}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.judul}</Text>
          <Text style={styles.penulis}>{item.penulis}</Text>
          <View style={styles.tanggalContainer}>
            <Text style={styles.tanggal}>{formattedDate}</Text>
            <Text style={styles.tanggal}>{`${hours}:${minutes}`}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <Layout>
      <FlatList
        data={berita}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<Text style={styles.header}>News</Text>}
      />

      {user?.role.toString() === 'admin' && (
        <View style={styles.containerfab}>
          <FAB
            style={styles.fab}
            onPress={() => setModalVisible(true)}
            label="Tambah Berita"
          />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // tombol back android
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Form Tambah Berita</Text>

            <TextInput
              style={styles.input}
              placeholder="Judul"
              value={judul}
              onChangeText={setJudul}
            />
            <TextInput
              style={[styles.input, {height: 80}]}
              placeholder="Isi"
              multiline
              value={isi}
              onChangeText={setIsi}
            />
            <TextInput
              style={styles.input}
              placeholder="Penulis"
              value={penulis}
              onChangeText={setPenulis}
            />
            <TextInput
              style={styles.input}
              placeholder="Kategori"
              value={kategori}
              onChangeText={setKategori}
            />
            <TextInput
              style={styles.input}
              placeholder="URL Gambar (optional)"
              value={gambarUrl}
              onChangeText={setGambarUrl}
            />

            <View style={styles.buttonRow}>
              <Button title="Batal" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 60,
    marginRight: 15,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    textAlign: 'left',
    alignContent: 'space-around',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },
  penulis: {
    fontSize: 14,
    color: '#555',
  },
  tanggal: {
    fontSize: 14,
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  containerfab: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  tanggalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  openButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
