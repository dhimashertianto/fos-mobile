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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSmoker, setIsSmoker] = useState('no');
  const [isCancer, setIsCancer] = useState('no');
  const [isUndergoingCancer, setIsUndergoingCancer] = useState('no');
  const [isPasiveSmoker, setIsPasiveSmoker] = useState('no');
  const [isUserFos, setUserFos] = useState('no');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
      notificationsEnabled,
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
          <Text style={styles.header}>Register</Text>
          <Input
            testID="Login.Username"
            placeholder="Username / Email"
            onChangeText={setName}
            lables={'Username'}
            value={name}
            keyboardType="email-address"
            style={styles.input}
          />
          <Input
            testID="Login.Username"
            placeholder="Email"
            onChangeText={setEmail}
            lables={'Username / Email'}
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
          <Text style={styles.question}>Are you an active smoker??</Text>
          <RadioButton.Group onValueChange={setIsSmoker} value={isSmoker}>
            <View style={styles.radioRow}>
              <RadioButton value="yes" />
              <Text style={styles.radioLabel}>Yes</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="no" />
              <Text style={styles.radioLabel}>No</Text>
            </View>
          </RadioButton.Group>

          <Text style={styles.question}>Are you suffering from cancer?</Text>
          <RadioButton.Group onValueChange={setIsCancer} value={isCancer}>
            <View style={styles.radioRow}>
              <RadioButton value="yes" />
              <Text style={styles.radioLabel}>Yes</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="no" />
              <Text style={styles.radioLabel}>No</Text>
            </View>
          </RadioButton.Group>

          <Text style={styles.question}>
            Are you currently undergoing cancer treatment?
          </Text>
          <RadioButton.Group
            onValueChange={setIsUndergoingCancer}
            value={isUndergoingCancer}>
            <View style={styles.radioRow}>
              <RadioButton value="yes" />
              <Text style={styles.radioLabel}>Yes</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="no" />
              <Text style={styles.radioLabel}>No</Text>
            </View>
          </RadioButton.Group>

          <Text style={styles.question}>Are you a passive smoker?</Text>
          <RadioButton.Group
            onValueChange={setIsPasiveSmoker}
            value={isPasiveSmoker}>
            <View style={styles.radioRow}>
              <RadioButton value="yes" />
              <Text style={styles.radioLabel}>Yes</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="no" />
              <Text style={styles.radioLabel}>No</Text>
            </View>
          </RadioButton.Group>

          <Text style={styles.question}>Are you a new user FOS?</Text>
          <RadioButton.Group onValueChange={setUserFos} value={isUserFos}>
            <View style={styles.radioRow}>
              <RadioButton value="yes" />
              <Text style={styles.radioLabel}>Yes</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="no" />
              <Text style={styles.radioLabel}>No</Text>
            </View>
          </RadioButton.Group>

          {/* <View style={styles.switchRow}>
            <Text style={styles.question}>Enable notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              ios_backgroundColor="#ccc"
              trackColor={{false: '#767577', true: '#34C759'}}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View> */}
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

export default Register;
