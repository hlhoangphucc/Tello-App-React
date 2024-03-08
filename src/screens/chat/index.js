import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import Modal from 'react-native-modal';
import { v4 as uuidv4 } from 'uuid';
import socket from '../../components/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from '../../../env';

function ListChatScreen({ navigation }) {
  const [chatdata, setChatdata] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [myUser, setMyUser] = useState('');
  const [token, setToken] = useState('');

  const format_time = (time) => {
    const now = moment().format('YYYY-MM-DD HH:mm');
    const formattedTime = moment(time).format('YYYY-MM-DD HH:mm');
    const timeDifference = moment.duration(moment(now).diff(formattedTime));
    const minutesAgo = timeDifference.asMinutes();
    let formattedTimes;
    if (minutesAgo < 1) {
      formattedTimes = 'Vừa xong';
    } else if (minutesAgo < 60) {
      formattedTimes = `${Math.floor(minutesAgo)} phút trước`;
    } else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      formattedTimes = `${hoursAgo} giờ trước`;
    }
    return formattedTimes;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const myUser = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(myUser);
        setToken(accessToken);
        if (userData) {
          try {
            const respone = await axios.get(`get_user/${userData.id}`);
            const myData = respone.data.user[0];
            setMyUser(myData);
          } catch (error) {
            console.error('Fetch data user failed', error);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Server error:', error.response);
        }
      }
    };
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (myUser) {
          const eventId = Math.random().toString(36).substr(2, 9);
          socket.emit('getChatList', myUser.user_id, eventId);
          const handleDataChatList = (datachatList) => {
            if (datachatList.eventId === eventId) {
              setChatdata(datachatList.data);
            }
          };
          socket.on('datachatList', handleDataChatList);
        }
      };
      fetchData();
      return () => {
        socket.off('datachatList');
      };
    }, [myUser])
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLongPress = (item) => {
    toggleModal();
  };

  const handleNavigationMessage = (item) => {
    navigation.navigate('Chat', {
      dataChatList: item,
      myUser: myUser,
      token: token,
    });
  };

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

  const truncateText = (text) => {
    const maxLength = 30;
    if (text && text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  const renderItem = ({ item }) => (
    format_time(item.online_time),
    (
      <TouchableOpacity
        onPress={() => handleNavigationMessage(item)}
        onLongPress={() => handleLongPress(item)}
        style={styles.chatItem}
      >
        <View>
          <Image
            source={
              item.avt_url === 'null'
                ? require('../../assets/images/user.jpg')
                : { uri: item.avt_url }
            }
            style={styles.avatar}
          />
          {item.status && (
            <Ionicons
              name='ellipse-sharp'
              size={15}
              style={styles.iconHeader}
            />
          )}
        </View>
        <View style={styles.chatInfo}>
          <Text style={styles.name}>
            {myUser.user_id === item.my_id ? item.my_name : item.name_other}
          </Text>
          <View style={styles.content}>
            <Text style={styles.message}>
              {truncateText(item.last_msg)} •{formatTimes(item.updated_at)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  );

  const renderUser = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleNavigationMessage(item)}
      onLongPress={() => handleLongPress(item)}
      style={styles.iconUser}
    >
      <View>
        {item.status ? (
          <Text style={{ color: 'yellow' }}>Trực Tuyến</Text>
        ) : (
          <Text style={{ color: 'white' }}>
            {format_time(item.online_time)}
          </Text>
        )}
        <View>
          <Image
            source={
              item.avt_url === 'null'
                ? require('../../assets/images/user.jpg')
                : { uri: item.avt_url }
            }
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              left: 7,
            }}
          />
        </View>
        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>
          {myUser.user_id === item.my_id ? item.my_name : item.name_other}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.flatListHeader}>
        <FlatList
          data={chatdata}
          renderItem={renderUser}
          keyExtractor={() => uuidv4()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.line}></View>
      <FlatList
        data={chatdata}
        renderItem={renderItem}
        keyExtractor={() => uuidv4()}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text>Bạn muốn thu hồi tin nhắn này?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Text style={styles.button}>Có</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.button}>Không</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ListChatScreen;
