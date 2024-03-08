import React, { useRef, useState, useEffect } from 'react';
import styles from './style';
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
// import axios from 'axios';
import axios from '../../../env';
const RegisterScreen = ({ navigation }) => {
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const phonenumberRef = useRef('');
  const confirmpasswordRef = useRef('');
  const isValidEmailRef = useRef(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [checkRegister, setCheckRegister] = useState(true);
  const [contentMessage, setContentMessage] = useState('');
  const signUp = async () => {
    const userData = {
      username: usernameRef.current,
      password: passwordRef.current,
      email: emailRef.current,
      phone: phonenumberRef.current,
    };
    try {
      const respone = await axios.post('signup', userData);
      if ((respone.status = 200)) {
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          messageRegister('Email này được sử dụng');
        } else {
          console.error('Server error:', error.response.data.error);
        }
      } else {
        console.error('Network error:', error.message);
      }
    }
  };

  const signIn = () => {
    navigation.goBack();
  };

  const validateEmail = (text) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail.com$/;
    isValidEmailRef.current = !emailPattern.test(text);
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

  const messageRegister = (content) => {
    setCheckRegister(false);
    setContentMessage(content);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Animated.View style={{ ...styles.top, opacity: fadeAnim }}>
              <Image
                style={styles.phone}
                source={require('./../../assets/send.png')}
              />
            </Animated.View>
            {!checkRegister && (
              <Text style={styles.check}>{contentMessage}</Text>
            )}
            <View style={styles.content}>
              <TextInput
                placeholder='Tên người dùng'
                autoFocus
                style={styles.textInput}
                keyboardType='default'
                placeholderTextColor='white'
                onChangeText={(text) => (usernameRef.current = text)}
              />
              <TextInput
                placeholder='Số điện thoại'
                style={styles.textInput}
                keyboardType='phone-pad'
                placeholderTextColor='white'
                onChangeText={(text) => (phonenumberRef.current = text)}
              />
              <TextInput
                placeholder='Email'
                style={styles.textInput}
                keyboardType='email-address'
                placeholderTextColor='white'
                onChangeText={(text) => {
                  emailRef.current = text;
                  validateEmail(text);
                }}
              />
              <TextInput
                placeholder='Mật khẩu'
                style={styles.textInput}
                secureTextEntry
                keyboardType='default'
                placeholderTextColor='white'
                onChangeText={(text) => (passwordRef.current = text)}
              />
              <TextInput
                placeholder='Xác nhận mật khẩu'
                style={styles.textInput}
                secureTextEntry
                keyboardType='default'
                placeholderTextColor='white'
                onChangeText={(text) => (confirmpasswordRef.current = text)}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button_login} onPress={signIn}>
                  <Text style={styles.text_login}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button_register}
                  onPress={() => {
                    if (isValidEmailRef.current) {
                      messageRegister('Email không hợp lệ');
                    } else if (emailRef.current === '') {
                      messageRegister('Email không được để trống');
                    } else if (passwordRef.current === '') {
                      messageRegister('Mật khẩu không được để trống');
                    } else if (confirmpasswordRef.current === '') {
                      messageRegister('Xác nhận mật khẩu không được để trống');
                    } else if (
                      passwordRef.current !== confirmpasswordRef.current
                    ) {
                      messageRegister('Mật khẩu không khớp');
                    } else {
                      signUp();
                    }
                  }}
                >
                  <Text style={styles.text_register}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
