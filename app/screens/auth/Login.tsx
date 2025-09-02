import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import Card from '../../components/Card';
import {Input} from '../../components/Form';
import Layout from '../../components/Layout';
const AppIcon = require('../../assets/images//appicon.png');
import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {updateToken, updateUser} from '../../store/userSlice';

import {useTheme} from '../../theme/useTheme';
import {setSecureValue} from '../../utils/keyChain';
import firestore from '@react-native-firebase/firestore';

interface ValuesType {
  username: string;
  password: string;
}

const initialValues: ValuesType = {username: '', password: ''};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must contain atleast 5 characters')
    .required('Required'),
  password: Yup.string().min(3, 'Too Short!').required('Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {theme} = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async (values: {username: string; password: string}) => {
    const {username, password} = values;
    console.log('Login values:', values);
    const users = await firestore()
      .collection('users')
      .where('username', '==', username)
      .where('password', '==', password)
      .get({source: 'server'});
    console.log('Login users:', users);
    if (!users.empty) {
      const userData = users.docs[0].data();

      await dispatch(
        updateUser({
          name: userData.name,
          username: userData.username,
          speciality: userData.speciality || '',
          email: userData.email,
          role: userData.isAdmin
            ? 'admin'
            : userData.isDoctor
            ? 'doctor'
            : userData.isUserFamily
            ? 'family'
            : userData.isExUserFos
            ? 'exuser'
            : 'user',
          isUserFos: userData.isUserFos || false,
          isUserFamily: userData.isUserFamily || false,
          isDoctor: userData.isDoctor || false,
          isAdmin: userData.isAdmin || false,
        }),
      );
      await dispatch(updateToken({token: true}));
    }
    if (users.empty) {
      Alert.alert('Login Failed', 'Invalid credentials');
      return;
    }
  };

  const handleRegister = params => {
    setModalVisible(false);
    switch (params) {
      case 'newUser':
        navigation.navigate('Register');
        break;

      case 'doctor':
        navigation.navigate('RegisterDoctor');
        break;

      default:
        navigation.navigate('RegisterFamily');
        break;
    }
  };

  return (
    <Layout>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <View style={styles.container}>
            <View style={styles.iconWrapper}>
              <Image
                source={AppIcon}
                style={styles.appIcon}
                resizeMode="contain"
              />
            </View>
            <Card style={styles.formWrapper}>
              <View style={styles.formHeader}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>
              </View>
              <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.formContainer}>
                    <Input
                      lables="Username"
                      testID="Login.Username"
                      placeholder="Username/Email"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      keyboardType="email-address"
                      error={
                        errors.username && touched.username
                          ? errors.username
                          : ''
                      }
                      style={styles.inputContainer}
                      leftIcon="person"
                    />
                    <Input
                      lables="Password"
                      testID="Login.Password"
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      error={
                        errors.password && touched.password
                          ? errors.password
                          : ''
                      }
                      style={styles.inputContainer}
                      leftIcon="lock-closed"
                    />
                    <TouchableOpacity
                      style={[
                        styles.loginButton,
                        {backgroundColor: theme.primary},
                      ]}
                      onPress={handleSubmit}
                      testID="Login.Button">
                      <Text style={styles.loginButtonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.loginRegisterButton}
                      onPress={() => setModalVisible(true)}
                      testID="Login.Button">
                      <Text style={styles.loginRegisterText}>Register Now</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="close" size={30} color={'rgba(0, 0, 0, 0.5)'} />
              </Pressable>
            </View>
            <Text style={styles.modalText}>What Kind of User Are You?</Text>
            <Pressable
              style={[styles.button, {backgroundColor: theme.primary}]}
              onPress={() => handleRegister('doctor')}>
              <Text style={styles.textStyle}>New Doctor FOS</Text>
            </Pressable>
            <View style={{height: 10}} />
            <Pressable
              style={[styles.button, {backgroundColor: theme.primary}]}
              onPress={() => handleRegister('newUser')}>
              <Text style={styles.textStyle}>New User FOS</Text>
            </Pressable>
            <View style={{height: 10}} />

            <Pressable
              style={[styles.button, {backgroundColor: theme.primary}]}
              onPress={() => handleRegister('family')}>
              <Text style={styles.textStyle}>Family User FOS</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formWrapper: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appIcon: {
    width: 120,
    height: 120,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 2,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginRegisterButton: {justifyContent: 'center', alignItems: 'center'},
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginRegisterText: {
    color: 'blue',
    fontStyle: 'italic',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Login;
