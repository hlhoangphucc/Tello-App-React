import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
import moment from 'moment';
import axios from '../../../../env';

const NewpostScreen = () => {
  const statusRef = useRef(null);
  const statusValue = useRef('');
  const [media, setMedia] = useState(null);
  const imageUri = media || '';
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;
  const token = route.params?.token;

  const createNewpost = async () => {
    if (!imageUri && !statusValue.current.trim()) {
      return;
    } else {
      const formdata = new FormData();
      formdata.append('post_id', uuid.v4());
      formdata.append('text_post', statusValue.current);
      formdata.append(
        'media_post',
        imageUri
          ? isVideo(imageUri.uri)
            ? {
                uri: imageUri.uri,
                type: 'video/mp4',
                name: 'video.mp4',
              }
            : {
                uri: imageUri.uri,
                type: 'image/png.jpg',
                name: 'picture.png',
              }
          : ''
      );
      formdata.append('user_name', userData.user_name);
      formdata.append('user_id', userData.user_id);
      formdata.append('avt_user', userData.avt_url);
      formdata.append('post_time', moment().format());
      try {
        const res = await axios.post('upload_posts', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 201) {
          navigation.navigate('Home');
          clearImage();
          statusValue.current = '';
          statusRef.current.clear();
        } else {
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        console.log(selectedAsset);
        setMedia(selectedAsset);
      } else {
      }
    } catch (error) {
      console.error('Lỗi khi chọn hình ảnh:', error);
    }
  };

  const clearImage = () => {
    setMedia(null);
  };

  const handleIconClick = () => {
    navigation.goBack();
  };
  const isVideo = (filename) => {
    const lowercasedFilename = filename.toLowerCase();
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];

    return videoExtensions.some((extension) =>
      lowercasedFilename.endsWith(extension)
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleIconClick}>
              <Ionicons name='arrow-back' size={30} color='white' />
            </TouchableOpacity>

            <Text style={styles.textHeader}>Tạo bài viết</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={createNewpost}
            >
              <Text style={styles.textbuttonHeader}>Đăng</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line}></View>

        <View style={styles.bodyContainer}>
          <View style={styles.bodyheader}>
            <View style={styles.bodyheaderLeft}>
              {userData && (
                <Image
                  source={
                    userData.avt_url === 'null'
                      ? require('../../../assets/images/user.jpg')
                      : { uri: userData.avt_url }
                  }
                  style={styles.wrap}
                />
              )}
            </View>
            <View style={styles.bodyheaderRight}>
              <Text style={styles.name}>{userData.user_name}</Text>
            </View>
          </View>
          <View style={styles.bodyBody}>
            <View style={styles.bodyStatus}>
              <TextInput
                placeholder='Bạn đang nghĩ gì ?'
                placeholderTextColor='#b1b5b9'
                style={styles.textInput}
                ref={(ref) => {
                  statusRef.current = ref;
                }}
                onChangeText={(text) => {
                  statusValue.current = text;
                }}
              />
            </View>
            <View style={styles.uploadImg}>
              {imageUri && (
                <View style={styles.clearImageButtonContainer}>
                  <Image
                    source={{ uri: imageUri.uri }}
                    style={styles.imgStatus}
                  />
                  <Text
                    style={
                      media.height > 800
                        ? { ...styles.clearImageButtonText, top: '10%' }
                        : media.height < 700 || media.widtgh < 1000
                        ? {
                            ...styles.clearImageButtonText,
                            top: '2%',
                            right: '28%',
                          }
                        : { ...styles.clearImageButtonText, top: '5%' }
                    }
                    onPress={clearImage}
                  >
                    X
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={pickImage}>
            <FontAwesome5 name='photo-video' size={30} color='white' />
          </TouchableOpacity>
          <Entypo name='location' size={30} color='white' />
          <MaterialIcons name='emoji-emotions' size={30} color='white' />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NewpostScreen;
