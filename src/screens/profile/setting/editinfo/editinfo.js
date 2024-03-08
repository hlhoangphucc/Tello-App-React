import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from '../../../../../env';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditiIfoScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const route = useRoute();
  const userData = route.params?.userData;
  const [token, setToken] = useState('');

  const [inputName, setInputName] = useState(userData.user_name);
  const [inputPhone, setInputPhone] = useState(userData.phone);
  const [image, setImage] = useState(null);
  const imageUri = image || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        setToken(accessToken);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Server error:', error.response);
        }
      }
    };
    fetchData();
  }, []);

  const clearImage = () => {
    setImage(null);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImage(selectedAsset.uri);
      } else {

      }
    } catch (error) {
      console.error('Lỗi khi chọn hình ảnh:', error);
    }
  };

  useEffect(() => {
    if (userData.gender === 'nam') {
      setSelectedOption('nam');
    } else {
      setSelectedOption('nu');
    }
  }, [userData.gender]);

  const updateInfo = async () => {
    if (inputName === '' || inputPhone === '') {
      Alert.alert('Thông Báo', 'Vui lòng nhập thông tin');
    } else if (imageUri === '') {
      const formdata = new FormData();
      formdata.append('user_id', userData.user_id);
      formdata.append('user_name', inputName);
      formdata.append('phone', inputPhone);
      formdata.append('gender', selectedOption);
      formdata.append('upload_time', moment().format());

      try {
        const res = await axios.put('update_avt', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 201) {

          navigation.navigate('Home');

          clearImage();
        } else {

        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      const formdata = new FormData();
      formdata.append('user_id', userData.user_id);
      formdata.append('user_name', inputName);
      formdata.append('avt_url', {
        uri: imageUri,
        type: 'image/png',
        name: 'avt.png',
        user_id: userData.user_id,
      });
      formdata.append('phone', inputPhone);
      formdata.append('gender', selectedOption);
      formdata.append('upload_time', moment().format());

      try {
        const res = await axios.put('update_avt', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 201) {

          navigation.navigate('Home');
          clearImage();
        } else {

        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyTop}>
          <View style={styles.bodyLeft}>
            <View style={styles.avtUser}>
              <View style={styles.avt}>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={
                      imageUri
                        ? { uri: imageUri }
                        : userData.avt_url === 'null'
                        ? require('../../../../assets/images/user.jpg')
                        : { uri: userData.avt_url }
                    }
                    style={styles.wrapAvt}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bodyRight}>
            <View style={styles.contentBody}>
              <Text style={styles.textContent}>Họ tên: </Text>
              <View style={styles.textInputBody}>
                <TextInput
                  style={styles.textInput}
                  value={inputName}
                  placeholderTextColor='#b1b5b9'
                  onChangeText={(text) => {
                    setInputName(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.lineBody}></View>
            <View style={styles.contentBody}>
              <Text style={styles.textContent}>SĐT: </Text>
              <View style={styles.textInputBody}>
                <TextInput
                  style={styles.textInput}
                  value={inputPhone}
                  keyboardType='numeric'
                  placeholderTextColor='#b1b5b9'
                  onChangeText={(text) => {
                    setInputPhone(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.lineBody}></View>

            <View style={styles.radioContainer}>
              <View style={styles.radioContent}>
                <RadioButton
                  value='nam'
                  status={selectedOption === 'nam' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedOption('nam')}
                />
                <Text style={styles.textOption}>Nam</Text>
              </View>

              <View style={styles.radioContent}>
                <RadioButton
                  value='nu'
                  status={selectedOption === 'nu' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedOption('nu')}
                />
                <Text style={styles.textOption}>Nữ</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bodyBottom}>
          <TouchableOpacity style={styles.contentBottom} onPress={updateInfo}>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditiIfoScreen;
