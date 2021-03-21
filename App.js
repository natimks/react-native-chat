import 'react-native-gesture-handler';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Parse from 'parse/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WrapperPage from './src/components/WrapperPage';
import { UserRegistration } from './src/pages/UserRegistration';
import { UserLogIn } from './src/pages/UserLogIn';
import { UserLogOut } from './src/pages/UserLogOut';
import { Chat } from './src/pages/Chat';
import { APP_ID, JAVASCRIPT_KEY } from '@env';

Parse.setAsyncStorage(AsyncStorage);

const PARSE_APPLICATION_ID = APP_ID;
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_ID = JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_ID);
Parse.serverURL = PARSE_HOST_URL;

function UserRegistrationScreen() {
  return (
    <WrapperPage>
      <UserRegistration />
    </WrapperPage>
  );
}

function UserLogInScreen() {
  return (
    <WrapperPage>
      <UserLogIn />
    </WrapperPage>
  );
}

function ChatScreen() {
  return (
    <WrapperPage>
      <Chat />
    </WrapperPage>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={UserLogInScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='Sign Up' component={UserRegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
