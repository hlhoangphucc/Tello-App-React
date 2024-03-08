import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { logout } from '../../../components/redux/action';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const email = route.params.email;
  const userData = route.params?.userData;

  const goToUpdateAvt = () => {
    navigation.navigate('updateavt');
  };
  const goToUpdateBg = () => {
    navigation.navigate('updatebg');
  };
  const goToinfo = () => {
    navigation.navigate('Info', { email: email, userData: userData });
  };
  const [pressedButton, setPressedButton] = useState(null);

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };

  const handlePressOut = () => {
    setPressedButton(null);
  };

  const handlesignOut = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(logout());
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor: pressedButton === 'info' ? '#f0f0f0' : '#272c38',
            },
          ]}
          onPressIn={() => handlePress('info')}
          onPressOut={handlePressOut}
          onPress={goToinfo}
        >
          <Ionicons
            color={'white'}
            size={30}
            name='information-outline'
            style={styles.iconPage}
          />
          <Text style={styles.textContent}>Thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor:
                pressedButton === 'userData' ? '#f0f0f0' : '#272c38',
            },
          ]}
          onPressIn={() => handlePress('userData')}
          onPressOut={handlePressOut}
          onPress={goToUpdateAvt}
        >
          <Ionicons
            color={'white'}
            size={30}
            name='image-outline'
            style={styles.iconPage}
          />
          <Text style={styles.textContent}>Đổi hình nền đại diện</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor: pressedButton === 'bg' ? '#f0f0f0' : '#272c38',
            },
          ]}
          onPressIn={() => handlePress('bg')}
          onPressOut={handlePressOut}
          onPress={goToUpdateBg}
        >
          <Ionicons
            color={'white'}
            size={30}
            name='images-outline'
            style={styles.iconPage}
          />
          <Text style={styles.textContent}>Đổi hình nền</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handlesignOut}>
          <View style={styles.btnsignout}>
            <Text style={styles.txtbtn}>Đăng xuất</Text>
            <Ionicons color={'#fff'} size={40} name='log-out-outline' />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingProfile;
