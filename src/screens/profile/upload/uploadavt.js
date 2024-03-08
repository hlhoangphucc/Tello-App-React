import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, Image, Alert, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from '../../../../env';
import moment from 'moment';
const UpdateAvt = ({ navigation }) => {
  const route = useRoute();
  const userData = route.params?.userData;
  const token = route.params?.token;
  const [image, setImage] = useState(null);
  const imageUri = image || '';
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

  const updateAvt = async () => {
    const formdata = new FormData();
    formdata.append('user_id', userData.user_id);
    formdata.append('user_name', userData.user_name);
    formdata.append('avt_url', {
      uri: imageUri,
      type: 'image/png',
      name: 'avt.png',
      user_id: userData.user_id,
    });
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyBody}>
          <View style={styles.uploadImg}>
            {imageUri ? (
              <>
                <Image source={{ uri: imageUri }} style={styles.imgStatus} />
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonSize}>
                    <TouchableOpacity
                      style={styles.buttonHeader}
                      onPress={updateAvt}
                    >
                      <Text style={styles.textbuttonHeader}>Đổi</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.centeredTextContainer}>
                <Text style={styles.centeredText}></Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={pickImage}>
          <FontAwesome5 name='photo-video' size={30} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAvt;
