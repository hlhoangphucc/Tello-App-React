import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './style';
import moment from 'moment';
import { Video, ResizeMode } from 'expo-av';
import Lightbox from 'react-native-lightbox-v2';
import axios from '../../../../env';

const RenderItem = ({ item, myUser, setShowComment, setCommentData }) => {
  const [like, setLike] = useState(false);

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

  useEffect(() => {
    if (item && myUser) {
      if (item.interact_user_ids.includes(myUser.user_id)) {
        setLike(true);
      }
    }
  }, [myUser]);

  const handleLikePost = (item) => {
    setLike(true);
    if (like) {
      const postData = {
        post_id: item.post_id,
        user_id: myUser.user_id,
      };
      axios
        .post('un_like', postData)
        .then((response) => {})
        .catch((error) => {
          console.error('Error unlike:', error);
        });
      setLike(false);
    } else {
      const postData = {
        post_id: item.post_id,
        user_id: myUser.user_id,
      };
      axios
        .post('add_like', postData)
        .then((response) => {})
        .catch((error) => {
          console.error('Error adding like:', error);
        });
    }
  };

  const handleCommentPost = (item) => {
    setCommentData(item);
    setShowComment(true);
  };

  const renderBody = () => {
    if (item.post_type === 'text-image') {
      return item.media_post ? (
        <Lightbox
          renderContent={() => (
            <Image
              source={{ uri: item.media_post }}
              style={styles.imgcontent}
            />
          )}
        >
          <Image
            source={{ uri: item.media_post }}
            style={{ width: 500, height: 400 }}
          />
        </Lightbox>
      ) : (
        <View style={styles.centeredTextContainer}>
          <Text style={styles.centeredText}></Text>
        </View>
      );
    } else if (item.post_type === 'text-video') {
      return item.media_post ? (
        <>
          <Video
            style={styles.videocontent}
            source={{
              uri: item.media_post,
            }}
            resizeMode={ResizeMode.COVER}
            rate={1.0}
            volume={1.0}
            useNativeControls={true}
          />
        </>
      ) : (
        <View style={styles.centeredTextContainer}>
          <Text style={styles.centeredText}></Text>
        </View>
      );
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {item && (
          <Image
            source={
              item.avt_user === 'null'
                ? require('../../../assets/images/user.jpg')
                : { uri: item.avt_user }
            }
            style={styles.wrap}
          />
        )}
        <View style={styles.headerRight}>
          <Text style={styles.name}>{item.user_name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.post_time}>{formatTimes(item.post_time)} </Text>
            {item.is_edit && (
              <Text style={styles.post_time}>(Đã chỉnh sửa) </Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>
            {item.text_post !== 'null' ? item.text_post : ''}
          </Text>
        </View>
        {renderBody()}
      </View>
      <View style={styles.bottomRight}>
        <TouchableOpacity
          onPress={() => handleLikePost(item)}
          style={styles.InteractContainer}
        >
          {like ? (
            <AntDesign name='heart' size={30} color='white' />
          ) : (
            <AntDesign name='hearto' size={30} color='#38444d' />
          )}

          {like ? (
            <Text style={styles.textInteract}>{item.interact_count} </Text>
          ) : (
            <Text style={styles.textInteract}>{item.interact_count}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCommentPost(item)}
          style={styles.InteractContainer}
        >
          <AntDesign name='message1' size={30} color='#38444d' />
          <Text style={styles.textInteract}>{item.comment_count}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line}></View>
    </View>
  );
};

export default memo(RenderItem);
