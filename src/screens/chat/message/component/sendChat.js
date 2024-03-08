import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import styles from '../style';
import axios from '../../../../../env';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import socket from '../../../../components/socket';

const SendChat = ({
  handlePressIn,
  dataChatList,
  myUser,
  token,
  isEdit,
  inputMessage,
  setIsEdit,
}) => {
  const messageRef = useRef(null);
  const messageValue = useRef('');
  const [editMessage, setEditMessage] = useState(inputMessage.message);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8,
        base64: true,
        allowsMultipleSelection: true,
      });
      if (!result.canceled) {
        const selectedAssets = result.assets.map((asset) => asset.uri);
        // const selectedAssets = result.assets[0].uri;
        if (selectedAssets.type === 'video') {
          try {
            const fileInfo = await FileSystem.getInfoAsync(selectedAssets);
            if (fileInfo.exists) {
              const videoSizeInBytes = fileInfo.size;
              const maxSizeInBytes = 20 * 1024 * 1024;

              if (videoSizeInBytes <= maxSizeInBytes) {
                uploadMedia(selectedAssets);
              } else {
                Alert.alert(
                  'Thông báo',
                  'Vui lòng chọn media có dung lượng dưới 20MB'
                );
              }
            }
          } catch (error) {}
        } else {
          uploadMedia(selectedAssets);
        }
      } else {
      }
    } catch (error) {}
  };

  const uploadMedia = async (mediaUri) => {
    const formdata = new FormData();
    formdata.append('room_id', dataChatList.room_id);
    mediaUri.forEach((uri, index) => {
      const mediaType = isVideo(uri) ? 'video' : 'image';
      formdata.append('message', {
        uri: uri,
        type: `media/${mediaType}`,
        name: `media${index}.${mediaType === 'video' ? 'mp4' : 'jpg'}`,
      });
      formdata.append('message_type', `${mediaType}`);
    });

    formdata.append('sender_id', myUser.user_id);
    formdata.append(
      'receiver_id',
      dataChatList.other_user_id === myUser.user_id
        ? dataChatList.my_id
        : dataChatList.other_user_id
    );
    formdata.append('send_time', moment().format());
    try {
      const res = await axios.post('upload_media', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        socket.emit('sendMessage', dataChatList);
      } else {
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const isVideo = (filename) => {
    const lowercasedFilename = filename.toLowerCase();
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
    return videoExtensions.some((extension) =>
      lowercasedFilename.endsWith(extension)
    );
  };

  const sendChat = async () => {
    if (!messageValue.current.trim()) {
      return;
    }
    const messageData = {
      room_id: dataChatList.room_id,
      message: messageValue.current.trim(),
      sender_id: myUser.user_id,
      receiver_id:
        dataChatList.other_user_id === myUser.user_id
          ? dataChatList.my_id
          : dataChatList.other_user_id,
      send_time: moment().format(),
      msg_type: 'text',
    };
    socket.emit('sendMessage', messageData);
    messageValue.current = '';
    messageRef.current.clear();
  };

  const updateMessage = () => {
    if (editMessage.trim()) {
      socket.emit('editMessage', inputMessage.id, editMessage);
      socket.emit('getMessages', inputMessage.room_id, 10);
    }
    setIsEdit(false);
  };

  return isEdit ? (
    <>
      <View style={{ ...styles.bottomLeft, width: '10%' }}>
        <Ionicons name='chevron-forward' size={27} color={'gray'} />
      </View>
      <View style={{ ...styles.bottomCenter, width: '80%' }}>
        <TextInput
          placeholder='Bắt đầu một tin nhắn'
          placeholderTextColor='#b1b5b9'
          value={editMessage}
          style={{
            ...styles.keyboardText,
            fontSize: 20,
            borderRadius: 20,
            paddingLeft: 10,
            backgroundColor: 'rgba(253, 253, 253, 0.3)',
            width: '95%',
            height: 35,
          }}
          onChangeText={(text) => setEditMessage(text)}
        />
      </View>
      <View style={{ ...styles.bottomRight, paddingLeft: 0, paddingRight: 0 }}>
        <TouchableOpacity onPress={updateMessage}>
          <Ionicons
            name='checkmark-done-circle'
            size={30}
            style={styles.iconMicInput}
          />
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomLeft}>
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name='image' size={25} style={styles.iconInput} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressIn}>
          <Ionicons name='mic' size={25} style={styles.iconInput} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCenter}>
        <TextInput
          ref={(ref) => {
            messageRef.current = ref;
          }}
          placeholder='Bắt đầu một tin nhắn'
          placeholderTextColor='#b1b5b9'
          style={styles.keyboardText}
          onChangeText={(text) => (messageValue.current = text)}
        />
      </View>
      <View style={styles.bottomRight}>
        <TouchableOpacity onPress={sendChat}>
          <Ionicons name='send' size={30} style={styles.iconMicInput} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendChat;
