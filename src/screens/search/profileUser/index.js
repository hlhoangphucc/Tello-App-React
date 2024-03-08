import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style';
import RenderItem from './post/posts';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import socket from '../../../components/socket';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../env';
import BottomSheet from '../../../components/bottomSheet';

const ProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const userData = route.params?.userData;
  const myUser = route.params?.myuser;
  const [postsData, setPostsData] = useState([]);
  const [follow, setFollow] = useState(false);
  const [token, setToken] = useState('');
  const [chatdata, setChatdata] = useState([]);
  const [isData, setIsData] = useState(false);
  const [limit, setLimit] = useState(2);
  const [showComment, setShowComment] = useState(false);
  const [commentData, setCommentData] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `get_post_user?user_id=${userData.user_id}&limit=${limit}`
      );
      setPostsData(response.data.posts);
    };
    fetchPosts();
  }, [userData.user_id, limit]);

  const loadOlderPosts = () => {
    if (!postsData || postsData.length === 0) {
      return;
    }
    try {
      setLimit((prevData) => prevData + 1);
    } catch (error) {}
  };

  const handleFollowUser = () => {
    setFollow(true);
    if (follow) {
      const data = {
        user_id_follow: userData.user_id,
        user_id_send_follow: myUser.user_id,
      };
      axios
        .post('un_follow', data)
        .then((response) => {})
        .catch((error) => {
          console.error('Error unfollow:', error);
        });
      setFollow(false);
    } else {
      const data = {
        user_id_follow: userData.user_id,
        user_id_send_follow: myUser.user_id,
      };
      axios
        .post('add_follow', data)
        .then((response) => {})
        .catch((error) => {
          console.error('Error adding follow:', error);
        });
    }
  };

  useEffect(() => {
    if (myUser) {
      const fetchPosts = async () => {
        const response = await axios.get(
          `get_follow?user_id_follow=${userData.user_id}&user_id_send_follow=${myUser.user_id}`
        );

        if (
          response.data.follows.length > 0 &&
          response.data.follows[0].other_user_id_id === userData.user_id
        ) {
          setFollow(true);
        }
      };
      fetchPosts();
    }
  }, [userData.user_id, limit, myUser]);

  const goToChatScreen = async () => {
    setIsData(true);
    navigation.navigate('Chat', {
      dataChatList: chatdata,
      myUser: myUser,
      token: token,
    });
  };

  useEffect(() => {
    if (myUser) {
      let roomId = uuid.v4();
      data = {
        lastMsg: '',
        roomId,
        myName: `${myUser.user_name || ''} `,
        myEmail: myUser.email,
        myId: myUser.user_id,
        nameOther: `${userData?.username || ''} `,
        emailOther: userData?.email,
        idOther: userData.user_id,
      };
      socket.emit('chat list', data);
      setIsData(true);
    }
  }, [myUser]);

  useEffect(
    React.useCallback(() => {
      if (myUser) {
        const eventId = Math.random().toString(36).substr(2, 9);
        socket.emit(
          'getChatListFromId',
          myUser.user_id,
          userData.user_id,
          eventId
        );
        const handleDataChatList = (datachatList) => {
          if (datachatList.eventId === eventId) {
            const mergedObject = { ...datachatList.data[0] };
            setChatdata(mergedObject);
          }
        };
        socket.on('chatlistfromid', handleDataChatList);
      }
      return () => {
        socket.off('datachatList');
      };
    }),
    [myUser, isData]
  );

  useEffect(() => {
    const backAction = () => {
      handleBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [chatdata]);

  const handleBack = () => {
    navigation.goBack();
    if (chatdata && chatdata.last_msg === '') {
      socket.emit('deleteChatList', chatdata.room_id);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            myUser={myUser}
            setShowComment={setShowComment}
            setCommentData={setCommentData}
          />
        )}
        onEndReached={loadOlderPosts}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.iconsBackContainer}>
              <TouchableOpacity onPress={handleBack}>
                <Ionicons name='arrow-back' size={25} color='white' />
              </TouchableOpacity>
              <Text style={styles.namePage}>{userData.username}</Text>
            </View>
            <View style={styles.backgroundUser}>
              <Image
                source={
                  userData.bg_url === 'null'
                    ? require('../../../assets/images/user.jpg')
                    : { uri: userData.bg_url }
                }
                style={styles.wrapBG}
              />
            </View>
            <View style={styles.avtUser}>
              <View style={styles.avt}>
                <Image
                  source={
                    userData.avt_url === 'null'
                      ? require('../../../assets/images/user.jpg')
                      : { uri: userData.avt_url }
                  }
                  style={styles.wrapAvt}
                />
              </View>
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.nameUser}>{userData.username}</Text>
            </View>
          </View>
        }
      />
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          style={styles.buttonaddFriend}
          onPress={handleFollowUser}
        >
          <Text style={styles.addFriend}>
            {follow
              ? [
                  <Ionicons name='checkmark' size={20} color='white' />,
                  'Đã theo dõi',
                ]
              : [
                  <Ionicons name='person-add' size={20} color='white' />,
                  'Theo dõi',
                ]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonChat} onPress={goToChatScreen}>
          <Ionicons name='chatbox-ellipses' size={20} color='white' />
          <Text style={styles.Message}>Nhắn tin</Text>
        </TouchableOpacity>
      </View>
      {showComment && (
        <BottomSheet
          setShowComment={setShowComment}
          userData={myUser}
          token={token}
          postData={commentData}
        />
      )}
    </View>
  );
};

export default ProfileScreen;
