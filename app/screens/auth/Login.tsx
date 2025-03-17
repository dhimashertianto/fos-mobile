import {Formik} from 'formik';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';

import Card from '../../components/Card';
import {Input} from '../../components/Form';
import Layout from '../../components/Layout';
const AppIcon = require('../../assets/images//appicon.png');

import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/userSlice';

import {useTheme} from '../../theme/useTheme';
interface ValuesType {
  username: string;
  password: string;
}

const initialValues: ValuesType = {username: '', password: ''};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must contain atleast 5 characters')
    .required('Required'),
  password: Yup.string().min(5, 'Too Short!').required('Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const {theme} = useTheme();

  const handleLogin = async (values: {username: string; password: string}) => {
    try {
      if (values.username === 'admin' && values.password === 'admin') {
        // await setSecureValue('token', true);
        dispatch(updateToken({token: true}));
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <Layout>
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
                    testID="Login.Username"
                    placeholder="Username/Email"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    keyboardType="email-address"
                    error={
                      errors.username && touched.username ? errors.username : ''
                    }
                    style={styles.inputContainer}
                    leftIcon="person"
                  />
                  <Input
                    testID="Login.Password"
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    error={
                      errors.password && touched.password ? errors.password : ''
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
                </View>
              )}
            </Formik>
          </Card>
        </View>
      </ScrollView>
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
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Login;
