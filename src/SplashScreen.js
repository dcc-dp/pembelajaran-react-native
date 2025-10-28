import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Image } from 'react-native';
import LottieView from 'lottie-react-native'

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const BounsView = props => {
  const bouns = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
  
    Animated.spring(bouns, {
      toValue: 1,
      friction: 0.5,
      tension: 1,
      useNativeDriver: true,
    }).start();
  }, [bouns]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{scale:bouns}], // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// const Animation = props => {
//   const muncul = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(muncul, {
//       toValue: 1,
//       duration: 3000,
//       useNativeDriver: true,
//     }).start();
//   }, [muncul]);

//   return (
//     <Animation.view style={{ opacity: muncul }}>
//       {props.children}
//     </Animation.view>
//   );
// };

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FadeInView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LottieView
          source={require('../src/assets/RqjpfRGZhq.json')}
          autoPlay
          Loop={true}
          style={{width:400, height:400}}
        />
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default SplashScreen;
