import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles';
import LoadingModal from '../components/LoadingModal';

export const UserLogIn = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async function () {
    setIsLoading(true);
    const usernameValue = username;
    const passwordValue = password;
    return await Parse.User.logIn(usernameValue, passwordValue)
      .then(async () => {
        setIsLoading(false);
        navigation.navigate('Chat');
        return true;
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert('Error!', error.message);
        return false;
      });
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <View style={Styles.login_wrapper}>
      <View style={Styles.form}>
        <TextInput
          style={Styles.form_input}
          value={username}
          placeholder={'Username'}
          onChangeText={setUsername}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <TextInput
          style={Styles.form_input}
          value={password}
          placeholder={'Password'}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => handleLogin()}>
          <View style={Styles.button}>
            <Text style={Styles.button_label}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
        <Text style={Styles.login_footer_text}>
          {'Don\'t have an account? '}
          <Text style={Styles.login_footer_link}>{'Sign up'}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
