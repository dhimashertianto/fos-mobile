import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
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

const RegisterFamily = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUserId, setIsUserId] = useState('');
  const [password, setPassword] = useState('');

  const [isSmoker, setIsSmoker] = useState('no');
  const [isCancer, setIsCancer] = useState('no');
  const [isUndergoingCancer, setIsUndergoingCancer] = useState('no');
  const [isPasiveSmoker, setIsPasiveSmoker] = useState('no');
  const [isUserFos, setUserFos] = useState('no');

  const navigation = useNavigation();
  const handleRegister = () => {
    const formData = {
      name,
      email,
      password,
      isSmoker,
      isCancer,
      isUndergoingCancer,
      isPasiveSmoker,
      isUserFos,
    };
    console.log('Form Data:', formData);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Register Family</Text>
          <Input
            testID="Login.Username"
            placeholder="Username Family"
            onChangeText={setName}
            lables={'Username Family'}
            value={name}
            keyboardType="email-address"
            style={styles.input}
          />
          <Input
            testID="Login.Username"
            placeholder="Email Family"
            onChangeText={setEmail}
            lables={'Email Family'}
            value={email}
            keyboardType="email-address"
            style={styles.input}
          />
          <Input
            testID="Login.Username"
            placeholder="Email Family"
            onChangeText={setIsUserId}
            lables={'Your Username'}
            value={isUserId}
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

export default RegisterFamily;
