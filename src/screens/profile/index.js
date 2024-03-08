import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style';
import RenderItem from './post/posts';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from '../../../env';
import uuid from 'react-native-uuid';
import BottomSheet from '../../components/bottomSheet';

const ProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const token = route.params?.token;
  const userData = route.params?.userData;
  const myUser = userData;
  const [limit, setLimit] = useState(2);
  const [postsData, setPostsData] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentData, setCommentData] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `get_post_user?user_id=${myUser.user_id}&limit=${limit}`
      );
      setPostsData(response.data.posts);
    };
    fetchPosts();
    navigation.addListener('focus', fetchPosts);
  }, [myUser.user_id, reloadPage, limit]);

  const handleIconClick = () => {
    navigation.navigate('Home');
  };

  const goToUpdateAvt = () => {
    navigation.navigate('updateavt', { userData: userData, token: token });
  };
  const goToUpdateBg = () => {
    navigation.navigate('updatebg', { userData: userData, token: token });
  };

  const goToSettingProfile = () => {
    navigation.navigate('SettingProfileScreen', {
      username: myUser.user_name,
      email: myUser.email,
      userData: userData,
    });
  };

  const loadOlderPosts = () => {
    if (!postsData || postsData.length === 0) {
      return;
    }
    try {
      setLimit((prevData) => prevData + 1);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            setReloadPage={setReloadPage}
            reloadPage={reloadPage}
            token={token}
            myUser={myUser}
            setShowComment={setShowComment}
            setCommentData={setCommentData}
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.iconsBackContainer}>
              <TouchableOpacity onPress={handleIconClick}>
                <Ionicons name='arrow-back' size={25} color='white' />
              </TouchableOpacity>
              <Text style={styles.namePage}>Trang cá nhân</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={goToSettingProfile}>
                  <Ionicons name='settings-outline' size={25} color='white' />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.backgroundUser}>
              <TouchableOpacity onPress={goToUpdateBg}>
                <Image
                  source={
                    myUser.bg_url === 'null'
                      ? require('../../assets/images/user.jpg')
                      : { uri: myUser.bg_url }
                  }
                  style={styles.wrapBG}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.avtUser}>
              <View style={styles.avt}>
                <TouchableOpacity onPress={goToUpdateAvt}>
                  <Image
                    source={
                      myUser.avt_url === 'null'
                        ? require('../../assets/images/user.jpg')
                        : { uri: myUser.avt_url }
                    }
                    style={styles.wrapAvt}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.nameUser}>{myUser.user_name}</Text>
            </View>
          </View>
        }
        onEndReached={loadOlderPosts}
        onEndReachedThreshold={0.1}
        keyExtractor={() => uuid.v4().toString()}
      />
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

export default ProfileScreen;
