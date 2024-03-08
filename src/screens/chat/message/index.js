import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import socket from '../../../components/socket';
import { useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import SendVoiceChat from './component/sendVoice';
import RenderItem from './component/renderMessage';
import moment from 'moment';

const ChatScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const scrollPosition = useRef(0);
  const route = useRoute();
  const dataChatList = route.params.dataChatList;
  const token = route.params.token;
  const myUser = route.params.myUser;
  const [chatData, setChatdata] = useState('');
  const [limit, setLimit] = useState(10);
  const [isEdit, setIsEdit] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  //-----HANDLE GET MESSAGE-----//
  useEffect(() => {
    try {
      socket.emit('getMessages', dataChatList.room_id, limit);
      socket.on('allMessages', (data) => {
        const foundElement = data.find(
          (item) => 'room_id' in item && item.room_id === dataChatList.room_id
        );
        if (foundElement) {
          setChatdata(sortMessages(data));
        }
      });
    } catch (error) {}
  }, [limit]);

  const loadOlderMessages = () => {
    if (!chatData || chatData.length === 0) {
      return;
    }
    try {
      setLimit((prevData) => prevData + 5);
    } catch (error) {}
  };

  const sortMessages = (messages) => {
    return messages.sort(function (a, b) {
      return new Date(b.send_time) < new Date(a.send_time)
        ? -1
        : new Date(b.send_time) > new Date(a.send_time)
        ? 1
        : 0;
    });
  };

  //-----END HANDLE GET MESSAGE-----//

  //-----NAVIGATION-----//
  const goToChatList = () => {
    navigation.navigate('ListChats');
  };

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
    const backAction = () => {
      goToChatList();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [dataChatList]);

  //-----HANDLE FLATLIST------//
  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: scrollPosition.current,
      animated: false,
    });
  }, [chatData]);

  const handleScroll = (event) => {
    scrollPosition.current = event.nativeEvent.contentOffset.y;
  };
  //-----END HANDLE FLATLIST------//
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#15202b' }}
      // keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={goToChatList}>
              <Ionicons
                name='arrow-back-outline'
                size={30}
                style={styles.iconHeader}
              />
            </TouchableOpacity>

            <View style={styles.avtCircle}>
              <Image
                source={
                  dataChatList.avt_url === 'null'
                    ? require('../../../assets/images/user.jpg')
                    : { uri: dataChatList.avt_url }
                }
                style={styles.wrapBody}
              />
            </View>

            <View>
              <Text style={styles.name}>
                {myUser.user_id === dataChatList.other_id
                  ? dataChatList.my_name
                  : dataChatList.name_other}
              </Text>
              {dataChatList.status ? (
                <Text
                  style={{
                    ...styles.name,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'rgba(8, 245, 200, 0.8) ',
                  }}
                >
                  Đang hoạt động
                </Text>
              ) : (
                <Text
                  style={{
                    ...styles.name,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'rgba(8, 245, 200, 0.8) ',
                  }}
                >
                  {format_time(dataChatList.online_time)}
                </Text>
              )}
            </View>
          </View>
          <Ionicons
            name='alert-circle-outline'
            size={30}
            style={styles.iconHeader}
          />
        </View>

        <View style={styles.bodyContainer}>
          <FlatList
            ref={flatListRef}
            data={chatData}
            renderItem={({ item }) => (
              <RenderItem
                chatdata={item}
                myUser={myUser}
                setIsEdit={setIsEdit}
                setInputMessage={setInputMessage}
              />
            )}
            inverted
            style={styles.flatList}
            onEndReached={loadOlderMessages}
            onScroll={handleScroll}
            onEndReachedThreshold={0.1}
            keyExtractor={() => uuid.v4().toString()}
          />
        </View>

        <SendVoiceChat
          dataChatList={dataChatList}
          myUser={myUser}
          token={token}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          inputMessage={inputMessage}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
