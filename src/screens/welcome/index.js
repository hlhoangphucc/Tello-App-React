import React, { useState } from 'react';
import styles from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';

const scrollContent = {
  img1: {
    img: require('./../../assets/images/fast.png'),
    title: 'Fast',
    content: "The world's fastest messaging app.\nIt is free and secure",
  },
  img2: require('./../../assets/images/logo.png'),
  title: 'Telegram',
  content: "The world's fastest messaging app.\nIt is free and secure",
  img3: {
    img: require('./../../assets/images/gift.png'),
    title: 'Free',
    content: "The world's fastest messaging app.\nIt is free and secure",
  },
  img4: {
    img: require('./../../assets/images/unlitmitted.png'),
    title: 'Powerful',
    content: "The world's fastest messaging app.\nIt is free and secure",
  },
  img5: {
    img: require('./../../assets/images/security.png'),
    title: 'Secure',
    content: "The world's fastest messaging app.\nIt is free and secure",
  },
  img6: {
    img: require('./../../assets/images/cloud.png'),
    title: 'Base',
    content: "The world's fastest messaging app.\nIt is free and secure",
  },
};
const WelcomeScreen = ({ navigation }) => {
  const [imgActive, setimgActive] = useState(0);
  const [isIcon, setIcon] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];
  const toggleIcon = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setIcon(!isIcon);
      animatedValue.setValue(0);
    });
  };
  const goToDetailScreen = () => {
    navigation.navigate('Login');
  };
  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [isIcon ? 'white' : '#181819', isIcon ? '#181819' : 'white'],
  });

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };
  return (
    <Animated.View
      style={[styles.container, { backgroundColor: interpolatedColor }]}
    >
      <StatusBar barStyle={'auto'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleIcon}>
          {isIcon ? (
            <Ionicons
              name='moon'
              size={20}
              style={[
                styles.iconHeader,
                { backgroundColor: interpolatedColor },
              ]}
            />
          ) : (
            <Ionicons name='sunny' size={20} style={styles.iconHeader} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.contentBody}>
          <ScrollView
            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
            scrollEventThrottle={16}
          >
            {Object.keys(scrollContent).map((e) => {
              const image = scrollContent[e];
              return (
                <View key={e} style={styles.scrollContent}>
                  <Image
                    source={image.img}
                    key={e}
                    resizeMode='stretch'
                    style={styles.wrap}
                  />
                  <Text
                    style={[
                      styles.title,
                      { color: isIcon ? 'black' : 'white' },
                    ]}
                  >
                    {image.title}
                  </Text>
                  <Text style={styles.content}>{image.content}</Text>
                </View>
              );
            })}
          </ScrollView>
          {
            <View style={styles.wrapDot}>
              {Object.keys(scrollContent).map((e, index) => {
                return (
                  <Text
                    key={e}
                    style={imgActive == index ? styles.dotActive : styles.dot}
                  >
                    ●
                  </Text>
                );
              })}
            </View>
          }
        </View>
        <TouchableOpacity style={styles.buttonClick} onPress={goToDetailScreen}>
          <Text style={styles.textButton}>Start Messaging</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default WelcomeScreen;
