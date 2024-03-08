import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import RenderItem from './post/posts';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Animated,
  AppState,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../../components/socket';
import uuid from 'react-native-uuid';
import axios from '../../../env';
import BottomSheet from '../../components/bottomSheet';

const HomeScreen = ({ navigation }) => {
  const token = useRef('');
  const [postData, setPostsData] = useState([]);
  const [limit, setLimit] = useState(2);
  const [userData, setUserData] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [commentData, setCommentData] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 150);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const myUser = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(myUser);
        token.current = accessToken;
        if (userData) {
          try {
            const respone = await axios.get(`get_user/${userData.id}`);
            const myData = respone.data.user[0];
            setUserData(myData);

            const response = await axios.get(
              `get_all_posts?limit=${limit}&user_id=${myData.user_id}`
            );
            setPostsData(response.data.posts);
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
    navigation.addListener('focus', fetchData);
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        try {
          const response = await axios.get(
            `get_all_posts?limit=${limit}&user_id=${userData.user_id}`
          );
          setPostsData(response.data.posts);
        } catch (error) {
          console.error('Error fetching Posts data:', error);
        }
      }
    };
    fetchData();
  }, [limit]);

  useEffect(() => {
    const fetchData = async () => {
      const myUser = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(myUser);
      socket.on('connect', () => {
        const user_id = userData.id;
        socket.emit('connection', { user_id });
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const myUser = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(myUser);

      const handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {
          const user_id = userData.id;
          socket.emit('user_disconnect', { user_id });
        }
      };
      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    };
    fetchData();
  }, []);

  const goToNewPostScreen = () => {
    navigation.navigate('Newposts', {
      userData: userData,
      token: token.current,
    });
  };

  const goToProfileScreen = () => {
    navigation.navigate('Profile', {
      token: token.current,
      userData: userData,
    });
  };

  const loadOlderPosts = () => {
    if (!postData || postData.length === 0) {
      return;
    } else if (postData.length >= limit) {
      setLimit((prevData) => prevData + 1);
    }
  };

  const handleRefreshing = async () => {
    setRefreshing(true);
    if (userData) {
      try {
        const response = await axios.get(
          `get_all_posts?limit=${limit}&user_id=${userData.user_id}`
        );
        setPostsData(response.data.posts);
      } catch (error) {
        console.error('Error fetching Posts data:', error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor='#61dafb' barStyle={'auto'} />
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
        }}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerText}>Tello</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={goToProfileScreen}>
                <MaterialCommunityIcons
                  name='account-circle-outline'
                  size={30}
                  color='white'
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.bodyContainer}>
            <View style={styles.headerBody}>
              {userData && (
                <TouchableOpacity
                  onPress={goToProfileScreen}
                  style={styles.imageContainer}
                >
                  <Image
                    source={
                      userData.avt_url === 'null'
                        ? require('../../assets/images/user.jpg')
                        : { uri: userData.avt_url }
                    }
                    style={styles.wrapBody}
                  />
                </TouchableOpacity>
              )}

              <View style={styles.headercenterBody}>
                <TouchableOpacity
                  style={styles.boderradiusBody}
                  onPress={goToNewPostScreen}
                >
                  <Text style={styles.boderText}>Bạn đang nghĩ gì ? </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineBody}></View>
          </View>
        </View>
        <FlatList
          data={postData}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              myUser={userData}
              setShowComment={setShowComment}
              setCommentData={setCommentData}
            />
          )}
          onEndReached={loadOlderPosts}
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={handleRefreshing}
          keyExtractor={() => uuid.v4().toString()}
        />
      </Animated.View>
      {showComment && (
        <BottomSheet
          setShowComment={setShowComment}
          userData={userData}
          token={token}
          postData={commentData}
        />
      )}
    </View>
  );
};

export default HomeScreen;
