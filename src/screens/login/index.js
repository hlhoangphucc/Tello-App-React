import React, { useState, useRef, useEffect } from 'react';
import styles from './style';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import axios from '../../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../components/redux/action';
const LoginScreen = () => {
  const dispatch = useDispatch();
  const email = useRef('');
  const password = useRef('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();
  const signIn = async () => {
    const userData = {
      email: email.current,
      password: password.current,
    };
    try {
      const response = await axios.post('login', userData);
      const accessToken = response.data.token;
      const myUser = JSON.stringify(response.data.user);
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('userData', myUser);
      dispatch(login(userData));
      navigation.replace('MainTabs');
    } catch (error) {
      setCheckLogin(true);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isKeyboardVisible ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, isKeyboardVisible]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      style={styles.container}
    >
      <StatusBar barStyle={'dark-content'} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Animated.View style={{ ...styles.top, opacity: fadeAnim }}>
              <Image
                style={[styles.phone]}
                source={require('./../../assets/send.png')}
              />
            </Animated.View>
          </View>
          <View style={styles.content}>
            <View style={styles.content_email}>
              <TextInput
                placeholder='Email'
                style={styles.textInput}
                autoFocus
                keyboardType='email-address'
                placeholderTextColor='white'
                onChangeText={(text) => (email.current = text)}
              />
            </View>
            <View style={styles.content_pass}>
              <TextInput
                placeholder='Mật khẩu'
                style={styles.textInput}
                secureTextEntry={visible ? false : true}
                keyboardType='default'
                placeholderTextColor='white'
                onChangeText={(text) => (password.current = text)}
              />

              <TouchableOpacity
                style={{ position: 'absolute', right: 0 }}
                onPress={() => {
                  setVisible(!visible);
                }}
              >
                {visible ? (
                  <Image
                    style={styles.visible}
                    source={require('../../assets/icons/visibility.png')}
                  />
                ) : (
                  <Image
                    style={styles.visible}
                    source={require('../../assets/icons/visible.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            {checkLogin && (
              <Text style={styles.checkLogin}>
                Vui lòng kiểm tra lại thông tin
              </Text>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button_register}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.text_register}>Đăng ký</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_login} onPress={signIn}>
                <Text style={styles.text_login}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
