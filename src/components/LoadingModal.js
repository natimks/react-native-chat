import React from 'react';
import { BlurView } from '@react-native-community/blur';
import { StatusBar } from 'react-native';

import LottieView from 'lottie-react-native';

const LoadingModal = () => {
  return (
    <>
      <StatusBar />
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        blurType='light'
        blurAmount={10}
        reducedTransparencyFallbackColor='white'
      >
        <LottieView
          source={require('../../assets/loading_chat.json')}
          autoPlay
          loop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
      </BlurView>
    </>
  );
};

export default LoadingModal;
