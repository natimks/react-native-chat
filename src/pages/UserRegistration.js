import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles';

export const UserRegistration = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doUserSignUp = async function () {
    const usernameValue = username;
    const passwordValue = password;
    return await Parse.User.signUp(usernameValue, passwordValue)
      .then((createdUser) => {
        Alert.alert(
          'Success!',
          `User ${createdUser.get('username')} was successfully created!`
        );
        navigation.navigate('Home');
        return true;
      })
      .catch((error) => {
        Alert.alert('Error!', error.message);
        return false;
      });
  };

  return (
    <View style={Styles.login_wrapper}>
      <View style={Styles.form}>
        <TextInput
          style={Styles.form_input}
          value={username}
          placeholder={'Username'}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <TextInput
          style={Styles.form_input}
          value={password}
          placeholder={'Password'}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => doUserSignUp()}>
          <View style={Styles.button}>
            <Text style={Styles.button_label}>{'Sign Up'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={Styles.login_footer_text}>
          {'Already have an account? '}
          <Text style={Styles.login_footer_link}>{'Log In'}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
