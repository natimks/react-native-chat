import React from 'react';
import { Text, View, StatusBar, SafeAreaView, Image } from 'react-native';
import Styles from '../styles';

const WrapperPage = ({ children }) => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image
            style={Styles.login_header_logo}
            source={require('../../assets/logo-chat.png')}
          />
          <Text style={Styles.login_header_text}>
            <Text style={Styles.login_header_text_bold}>
              React Native Chat by 👩🏻‍💻 @natimks
            </Text>
          </Text>
        </View>
        {children}
      </SafeAreaView>
    </>
  );
};

export default WrapperPage;
