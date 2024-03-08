import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import styles from '../style';
import GetRecordingLines from './renderVoiceMessage';
import { Video, ResizeMode } from 'expo-av';
import Lightbox from 'react-native-lightbox-v2';
import moment from 'moment';
import 'moment/locale/vi';
import socket from '../../../../components/socket';

const formatTimes = (timeData) => {
  const messageTime = moment(timeData).utcOffset('+07:00');
  const isSameWeek = messageTime.isSame(moment(), 'week');
  const isSameDay = messageTime.isSame(moment(), 'day');
  let formattedTime;
  if (isSameWeek) {
    if (isSameDay) {
      formattedTime = messageTime.format('HH:mm');
    } else {
      formattedTime = messageTime.format('ddd, DD MMM');
    }
  } else {
    formattedTime = messageTime.format('MMM D');
  }

  return formattedTime;
};

const RenderItem = ({ chatdata, myUser, setIsEdit, setInputMessage }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRetrieve, setisRetrieve] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setisRetrieve(!isRetrieve);
  };

  const togglecannel = () => {
    setisRetrieve(!isRetrieve);
  };

  const handleLongPress = (chatdata) => {
    if (
      chatdata.message_type !== 'retrieve' &&
      chatdata.sender_id === myUser.user_id
    ) {
      setModalVisible(!isModalVisible);
    }
  };

  const retrieveMessage = (item, myUser) => {
    if (item.sender_id === myUser.user_id) {
      socket.emit('retrieveMessage', item.id);
      socket.emit('getMessages', item.room_id, 10);
    }
    setisRetrieve(false);
  };

  const toggleEdit = (chatData) => {
    setInputMessage(chatData);
    setIsEdit(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setisRetrieve(false);
  };

  const renderMedia = () => {
    if (chatdata.message_type === 'voice') {
      return (
        <View>
          <GetRecordingLines
            urlFile={chatdata.message}
            duration={chatdata.voice_duration}
          />
        </View>
      );
    } else if (
      chatdata.message_type === 'text' ||
      chatdata.message_type === 'edittext'
    ) {
      return (
        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
          {chatdata.message}
        </Text>
      );
    } else if (chatdata.message_type === 'retrieve') {
      return (
        <Text style={{ color: 'gray', fontWeight: '500' }}>
          Tin nhắn đã thu hồi
        </Text>
      );
    } else {
      const messagetype = chatdata.message_type;
      const messagetypeArr = messagetype.split(',');
      const cleanedArray = messagetypeArr.map((str) =>
        str.replace(/[\[\]']/g, '').trim()
      );

      const message = chatdata.message;
      const messageArr = message.split(',');
      const cleanedmessageArray = messageArr.map((str) =>
        str.replace(/[\[\]']/g, '').trim()
      );

      const media = cleanedArray.map((val, index) => {
        if (val === 'video') {
          return (
            <Video
              style={{
                width: '100%',
                height: '100%',
                marginBottom: 5,
                borderRadius: 5,
              }}
              source={{
                uri: cleanedmessageArray[index],
              }}
              resizeMode={ResizeMode.COVER}
              rate={1.0}
              volume={1.0}
              useNativeControls={true}
            />
          );
        } else {
          return (
            <Lightbox
              renderContent={() => (
                <Image
                  source={{ uri: cleanedmessageArray[index] }}
                  style={styles.lightboxImage}
                />
              )}
            >
              <Image
                source={{ uri: cleanedmessageArray[index] }}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
              />
            </Lightbox>
          );
        }
      });
      return (
        <View style={styles.gridView}>
          <FlatList
            data={media}
            renderItem={({ item }) => (
              <View
                style={
                  media.length < 2
                    ? {
                        width: 250,
                        aspectRatio: 1,
                        paddingHorizontal: 1,
                        paddingVertical: 1,
                      }
                    : styles.gridItem
                }
              >
                {item}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={media.length % 2 === 0 ? 2 : 3}
          />
        </View>
      );
    }
  };

  const render = () => {
    return (
      <View
        style={[
          styles.messageItem,
          chatdata.sender_id == myUser.user_id
            ? styles.messageTextRight
            : styles.messageTextLeft,
        ]}
      >
        {renderMedia()}
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            paddingLeft: 5,
            fontSize: 12,
          }}
        >
          {formatTimes(chatdata.send_time)}
        </Text>
        <View>
          <Modal
            visible={isModalVisible}
            animationType='slide'
            transparent={true}
          >
            <Pressable style={styles.modal} onPress={closeModal}>
              <View style={styles.buttonContainer}>
                {chatdata.message_type.includes('image') ? (
                  <View></View>
                ) : (
                  <TouchableOpacity
                    onPress={() => toggleEdit(chatdata, myUser)}
                  >
                    <Text style={styles.button}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.button}>Thu hồi</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>

          <Modal visible={isRetrieve} animationType='slide' transparent={true}>
            <View style={styles.modal}>
              <View style={styles.buttonContainer}>
                <Text
                  style={{
                    color: 'white',
                    paddingBottom: 20,
                    fontWeight: '500',
                    fontSize: 15,
                  }}
                >
                  Bạn muốn thu hồi tin nhắn?
                </Text>
                <View style={styles.handleButton}>
                  <TouchableOpacity onPress={togglecannel}>
                    <Text style={styles.button}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => retrieveMessage(chatdata, myUser)}
                  >
                    <Text style={{ ...styles.button, color: 'red' }}>
                      Thu hồi
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity onLongPress={() => handleLongPress(chatdata)}>
      {chatdata.message_type !== 'edittext' ? (
        render()
      ) : (
        <View>
          <Text
            style={[
              chatdata.sender_id == myUser.user_id
                ? {
                    textAlign: 'right',
                    right: 95,
                    color: 'white',
                    fontSize: 14,
                  }
                : {
                    textAlign: 'left',
                    left: 35,
                    color: 'black',
                    fontSize: 14,
                  },
            ]}
          >
            Đã chỉnh sửa
          </Text>
          {render()}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RenderItem;
