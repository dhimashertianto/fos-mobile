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
import {Button, RadioButton} from 'react-native-paper';
import {Input} from '../../components/Form';
import firestore from '@react-native-firebase/firestore';


const RegisterDoctor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [speciality,setSpeciality] = useState('');
  const [isUserId, setIsUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isSmoker, setIsSmoker] = useState('no');
  const [isCancer, setIsCancer] = useState('no');
  const [isUndergoingCancer, setIsUndergoingCancer] = useState('no');
  const [isPasiveSmoker, setIsPasiveSmoker] = useState('no');
  const [isUserFos, setUserFos] = useState(false);
  const [isDoctor, setIsDoctor] = useState(true);

  const navigation = useNavigation();

  const checkUsernameExists = async (username: string) => {
    const userSnapshot = await firestore()
      .collection('users')
      .where('username', '==', username)
      .get({source: 'server'});
    console.log("userSnapshot:",userSnapshot);
    return !userSnapshot.empty;
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const formData = {
      name,
      username,
      speciality,
      email,
      password,
      isSmoker,
      isCancer,
      isUndergoingCancer,
      isPasiveSmoker,
      isUserFos,
      isDoctor,
    };
    const exists = await checkUsernameExists(username);
    if(exists) {
      Alert.alert('Username already exists. Please choose another one.');
      setIsLoading(false);
      return;
    }
    else{
      firestore()
      .collection('users')
      .add(formData)
      .then(() => {
        console.log('Doctor added!');
        Alert.alert('Registration Successful', 'You can now log in.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
        setIsLoading(false);
      })
      .catch((error:any) => {
        console.error('Error adding doctor: ', error);
        Alert.alert('Registration Failed', 'An error occurred. Please try again.');
        setIsLoading(false);
      });

    }

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Register Doctor</Text>
          <Input
            testID="Login.Username"
            placeholder="Username Doctor"
            onChangeText={setUsername}
            lables={'Username Doctor'}
            value={username}
            keyboardType="email-address"
            style={styles.input}
          />
          <Input
            testID="Login.Username"
            placeholder="Name Doctor"
            onChangeText={setName}
            lables={'Name Doctor'}
            value={name}
            keyboardType="default"
            style={styles.input}
          />
           <Input
            testID="Login.Username"
            placeholder="Speciality Doctor"
            onChangeText={setSpeciality}
            lables={'Speciality Doctor'}
            value={speciality}
            keyboardType="default"
            style={styles.input}
          />
          <Input
            testID="Login.Username"
            placeholder="Email Doctor"
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
        </ScrollView>

        <View style={styles.bottomButton}>
          <Button mode="contained" onPress={handleRegister} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
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
  question: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopColor: '#eee',
  },
});

export default RegisterDoctor;
