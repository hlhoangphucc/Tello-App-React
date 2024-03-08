import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import axios from '../../../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const postData = route.params?.item;
  const [media, setMedia] = useState(postData);
  const [token, setToken] = useState('');
  const imageUri = media || '';

  const [textInput, setTextInput] = useState(
    postData.text_post !== 'null' ? postData.text_post : ''
  );

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
    navigation.addListener('focus', fetchData);
  }, [navigation]);

  const updatePost = async () => {
    const formdata = new FormData();
    formdata.append('post_id', postData.post_id);
    formdata.append('text_post', textInput);
    formdata.append('media_post', {
      uri: imageUri.uri || imageUri.media_post,
      type: 'image/png.jpg',
      name: 'picture.png',
    });
    try {
      const res = await axios.put('update_post', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        navigation.goBack();
      } else {
      }
    } catch (error) {
      console.error('Error uploading image:', error);
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleIconClick}>
              <Ionicons name='arrow-back' size={30} color='white' />
            </TouchableOpacity>

            <Text style={styles.textHeader}>Chỉnh sửa bài viết</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.buttonHeader} onPress={updatePost}>
              <Text style={styles.textbuttonHeader}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line}></View>

        <View style={styles.bodyContainer}>
          <View style={styles.bodyheader}>
            <View style={styles.bodyheaderLeft}>
              {postData && (
                <Image
                  source={
                    postData.avt_user === 'null'
                      ? require('../../../assets/images/user.jpg')
                      : { uri: postData.avt_user }
                  }
                  style={styles.wrap}
                />
              )}
            </View>
            <View style={styles.bodyheaderRight}>
              <Text style={styles.name}>{postData.user_name}</Text>
            </View>
          </View>
          <View style={styles.bodyBody}>
            <View style={styles.bodyStatus}>
              {postData.text_post === 'null' ? (
                <TextInput
                  placeholder='Bạn đang nghĩ gì ?'
                  placeholderTextColor='#b1b5b9'
                  value={textInput}
                  style={styles.textInput}
                  onChangeText={(text) => setTextInput(text)}
                />
              ) : (
                <TextInput
                  placeholder='Bạn đang nghĩ gì ?'
                  placeholderTextColor='#b1b5b9'
                  value={textInput}
                  style={styles.textInput}
                  onChangeText={(text) => setTextInput(text)}
                />
              )}
            </View>
            <View style={styles.uploadImg}>
              {imageUri && (
                <View style={styles.clearImageButtonContainer}>
                  <Image
                    source={{ uri: imageUri.uri || imageUri.media_post }}
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

export default EditPostScreen;
