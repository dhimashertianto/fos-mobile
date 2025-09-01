import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import {deleteNewsById, updateNewsById} from '../services';
import {useTheme} from '../theme/useTheme';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store/store';
import moment from 'moment';

const NewsDetail = ({route}) => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);
  const {item} = route.params;
  const {theme} = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [penulis, setPenulis] = useState('');
  const [kategori, setKategori] = useState('');
  const [gambarUrl, setGambarUrl] = useState('');

  const date = new Date(item.tanggal);
  const options = {day: '2-digit', month: 'short', year: 'numeric'};
  const formattedDate = date
    .toLocaleDateString('en-GB', options)
    .replace(/ /g, '-');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const handlePressDeleteNews = async (id: string) => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus berita ini?',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteNewsById(id);
              Alert.alert('Berita berhasil dihapus');
              navigation.goBack();
            } catch (err) {
              console.error('Gagal hapus berita:', err.message);
              Alert.alert('Gagal menghapus berita');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handlePressEditNews = async () => {
    try {
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
      await updateNewsById(item?.id, payload);
      setModalVisible(true);
      navigation.goBack();
    } catch (err) {
      console.log('Gagal update berita:', err.message);
    }
  };

  return (
    <View style={[styles.screen, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card]}>
          <Image source={{uri: item?.gambar_url}} style={styles.image} />

          <View style={styles.content}>
            <Text style={[styles.title, {color: theme.text}]}>
              {item?.judul}
            </Text>
            <Text style={[styles.meta, {color: theme.textSecondary}]}>
              Ditulis oleh: {item?.penulis}
            </Text>
            <Text style={[styles.meta, {color: theme.textSecondary}]}>
              Tanggal: {formattedDate} {hours}:{minutes}
            </Text>
            <Text style={[styles.meta, {color: theme.textSecondary}]}>
              Kategori: {item?.kategori}
            </Text>

            <View style={styles.divider} />
            <Text style={[styles.description, {color: theme.text}]}>
              {item?.isi}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.primary}]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>← Kembali</Text>
        </TouchableOpacity>
        {user.role?.toString() === 'admin' && (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.accent}]}
            onPress={() => {
              setModalVisible(true);
              setJudul(item?.judul);
              setIsi(item?.isi);
              setPenulis(item?.penulis);
              setKategori(item?.kategori);
              setGambarUrl(item?.gambar_url);
            }}>
            <Text style={styles.buttonText}>Edit Berita</Text>
          </TouchableOpacity>
        )}
        {user.role?.toString() === 'admin' && (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.error}]}
            onPress={() => handlePressDeleteNews(item.id)}>
            <Text style={styles.buttonText}>🗑️ Hapus Berita</Text>
          </TouchableOpacity>
        )}
      </View>

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
              style={[styles.input, {height: 200}]}
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
              style={[styles.input, {height: 80}]}
              placeholder="URL Gambar (optional)"
              value={gambarUrl}
              onChangeText={setGambarUrl}
            />

            <View style={styles.buttonRow}>
              <Button title="Batal" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={() => handlePressEditNews()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 140, // agar isi tidak ketutup tombol
    minHeight: SCREEN_HEIGHT,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 12,
    minHeight: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  content: {
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  floatingButtons: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    flexDirection: 'column',
    gap: 10,
    zIndex: 10,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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

export default NewsDetail;
