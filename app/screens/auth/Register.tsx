import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, RadioButton, Switch} from 'react-native-paper';
import {Input} from '../../components/Form';
import firestore from '@react-native-firebase/firestore';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isSmoker, setIsSmoker] = useState(false);
  const [isCancer, setIsCancer] = useState(false);
  const [isUndergoingCancer, setIsUndergoingCancer] = useState(false);
  const [isPasiveSmoker, setIsPasiveSmoker] = useState(false);
  const [isUserFos, setUserFos] = useState(true);
  const [isExUserFos, setExUserFos] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const navigation = useNavigation();
  const checkUsernameExists = async (username: string) => {
    const userSnapshot = await firestore()
      .collection('users')
      .where('username', '==', username)
      .get();
    return !userSnapshot.empty;
  };
  const handleRegister = () => {
    // Jika isUserFos true, tampilkan konfirmasi terlebih dahulu
    if (isUserFos) {
      Alert.alert(
        'Confirm Registration',
        'You are registering as a new FOS user. Continue?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Yes', onPress: () => proceedRegistration()},
          // {text: 'Yes', onPress: () => proceedRegistration(true)},
        ],
      );
    } else {
      Alert.alert(
        'Confirm Registration',
        'You are registering as a existing FOS user. Continue?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Yes', onPress: () => proceedRegistration()},
        ],
      );
    }
  };

  const proceedRegistration = async () => {
    setIsLoading(true);

    const exists = await checkUsernameExists(username);
    if (exists) {
      Alert.alert('Username already exists. Please choose another one.');
      setIsLoading(false);
      return;
    }

    const formData = {
      username,
      email,
      password,
      isSmoker,
      isCancer,
      isUndergoingCancer,
      isPasiveSmoker,
      isUserFos: isUserFos,
      isExUserFos: isExUserFos,
      notificationsEnabled,
    };

    try {
      await firestore().collection('users').add(formData);
      Alert.alert('Registration Successful', 'You can now log in.', [
        {text: 'OK', onPress: () => navigation.navigate('Login')},
      ]);
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Registration Failed', 'Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Register</Text>
          <Input
            testID="Login.Username"
            placeholder="Username"
            onChangeText={setUserName}
            lables={'Username'}
            value={username}
            keyboardType="email-address"
            style={styles.input}
          />
          <Input
            testID="Login.Username"
            placeholder="Email"
            onChangeText={setEmail}
            lables={'Email'}
            value={email}
            keyboardType="email-address"
            style={styles.input}
          />
          <Input
            testID="Login.Password"
            placeholder="Password"
            onChangeText={setPassword}
            lables="Password"
            value={password}
            secureTextEntry
            style={styles.input}
            leftIcon="lock-closed"
          />

          <View style={styles.switchRow}>
            <Text style={styles.question}>Are you an active smoker??</Text>
            <Switch
              value={isSmoker}
              onValueChange={setIsSmoker}
              ios_backgroundColor="#ccc"
              trackColor={{false: '#767577', true: '#34C759'}}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
              style={styles.switch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.question}>Are you suffering from cancer?</Text>
            <Switch
              value={isCancer}
              onValueChange={setIsCancer}
              ios_backgroundColor="#ccc"
              trackColor={{false: '#767577', true: '#34C759'}}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
              style={styles.switch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.question}>
              Are you currently undergoing cancer treatment?
            </Text>
            <Switch
              value={isUndergoingCancer}
              onValueChange={setIsUndergoingCancer}
              ios_backgroundColor="#ccc"
              trackColor={{false: '#767577', true: '#34C759'}}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
              style={styles.switch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.question}>Are you a passive smoker?</Text>
            <Switch
              value={isPasiveSmoker}
              onValueChange={setIsPasiveSmoker}
              ios_backgroundColor="#ccc"
              trackColor={{false: '#767577', true: '#34C759'}}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
              style={styles.switch}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.question}>Are you a new user FOS?</Text>
            <Switch
              value={isUserFos}
              onValueChange={res => {
                setUserFos(res);
                setExUserFos(!res);
              }}
              ios_backgroundColor="#ccc"
              trackColor={{false: '#767577', true: '#34C759'}}
              thumbColor={isUserFos ? '#fff' : '#f4f3f4'}
              style={styles.switch}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.question}>Are you ex-smoker?</Text>
            <Switch
              value={isExUserFos}
              onValueChange={res => {
                setUserFos(!res);
                setExUserFos(res);
              }}
              ios_backgroundColor="#ccc"
              trackColor={{false: '#767577', true: '#34C759'}}
              thumbColor={isUserFos ? '#fff' : '#f4f3f4'}
              style={styles.switch}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomButton}>
          <Button mode="contained" onPress={handleRegister}>
            Register
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    borderWidth: 2,
  },
  outlinedInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioLabel: {
    fontSize: 16,
  },
  switchRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    // backgroundColor: 'red',
  },
  question: {
    flex: 1,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    // backgroundColor: 'grey',
  },
  switch: {
    // flex: 1,
    // backgroundColor: 'green',
  },
  bottomButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopColor: '#eee',
  },
});

export default Register;
