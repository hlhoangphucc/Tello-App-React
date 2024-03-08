import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Animated,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Text,
  Image,
  Modal,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './style';
import axios from '../../env';
import moment from 'moment';

const BottomSheet = ({ setShowComment, userData, postData, token }) => {
  const slide = React.useRef(new Animated.Value(0)).current;
  const messageRef = useRef(null);
  const messageValue = useRef('');
  const isSelected = useRef('');
  const [comments, setComments] = useState([]);
  const [isRetrieve, setisRetrieve] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputComment, setinputComment] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setisRetrieve(!isRetrieve);
  };

  const togglecannel = () => {
    setisRetrieve(!isRetrieve);
  };

  const handleLongPress = (item) => {
    if (item.user_id !== userData.user_id) {
      return;
    }
    isSelected.current = item;
    setModalVisible(!isModalVisible);
  };

  const deleteComment = async () => {
    setisRetrieve(!isRetrieve);
    try {
      const res = await axios.delete(
        `/delete_comment/${isSelected.current.id}/`
      );
      if (res.status === 200) {
        setIsSend(!isSend);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
    }
  };

  const editComment = async () => {
    try {
      const res = await axios.put(
        `update_comment?id=${isSelected.current.id}&content_comment=${inputComment}`
      );
      if (res.status === 201) {
        setinputComment('');
        setIsSend(!isSend);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
    }
  };

  const toggleEdit = () => {
    setinputComment(isSelected.current.content_comment);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setisRetrieve(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `get_comment?post_id=${postData.post_id}`
        );
        setComments(sortMessages(response.data.comments));
      } catch (error) {
        console.error('Error fetching Comments data:', error);
      }
    };
    fetchData();
  }, [isSend]);

  const sendComment = async () => {
    if (!messageValue.current.trim()) {
      return;
    }
    const formdata = new FormData();
    formdata.append('post_id', postData.post_id);
    formdata.append('user_id', userData.user_id);
    formdata.append('content_comment', messageValue.current.trim());

    try {
      const res = await axios.post('add_comment', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        console.log('Comment Successful');
        messageValue.current = '';
        messageRef.current.clear();
        setIsSend(!isSend);
      } else {
        console.log('Comment Failed');
      }
    } catch (error) {
      console.error('Error Comment Posts:', error);
    }
  };

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setShowComment(false);
    });
  };

  useEffect(() => {
    slideUp();
  }, []);

  const closeComment = () => {
    slideDown();
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

  const sortMessages = (messages) => {
    return messages.sort(function (a, b) {
      return new Date(b.creatd_at) < new Date(a.creatd_at)
        ? -1
        : new Date(b.creatd_at) > new Date(a.creatd_at)
        ? 1
        : 0;
    });
  };

  const RenderItem = ({ item }) => {
    const renderitem = () => {
      return (
        <View style={styles.itemContainer}>
          {item && (
            <Image
              source={
                item.avt_url === 'null'
                  ? require('../assets/images/user.jpg')
                  : { uri: item.avt_url }
              }
              style={styles.wrapBody}
            />
          )}
          <View>
            <TouchableOpacity
              style={styles.contentContainer}
              onPress={() => handleLongPress(item)}
            >
              <Text style={styles.itemName}>{item.user_name}</Text>
              <Text style={styles.itemContent}>{item.content_comment}</Text>
            </TouchableOpacity>
            <View style={styles.bottomContainer}>
              {item.is_edit ? (
                <>
                  <Text style={styles.textBottom}>
                    <Text style={{ fontSize: 12 }}>Chỉnh sửa</Text> (
                    {formatTimes(item.creatd_at)})
                  </Text>
                </>
              ) : (
                <Text style={styles.textBottom}>
                  {formatTimes(item.creatd_at)}
                </Text>
              )}
              <Text style={styles.textBottom}>Phản hồi</Text>
            </View>
          </View>
        </View>
      );
    };
    return <>{renderitem()}</>;
  };

  return (
    <KeyboardAvoidingView style={styles.backdrop}>
      <SafeAreaView style={styles.backdrop}>
        <View style={styles.backdrop}>
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [
                  {
                    translateY: slide.interpolate({
                      inputRange: [0, 1],
                      outputRange: [Dimensions.get('window').height, 0],
                    }),
                  },
                  {
                    scaleY: slide.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.Container}>
              <Pressable onPress={closeComment}>
                <View style={styles.line}></View>
              </Pressable>
              <View style={styles.BodyContainer}>
                <FlatList
                  data={comments}
                  renderItem={({ item }) => <RenderItem item={item} />}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View style={styles.lineBottom}></View>
              {inputComment ? (
                <View style={{ ...styles.BottomContainer, height: 90 }}>
                  <View style={styles.bottomCenter}>
                    <Text
                      style={{
                        color: 'white',
                        bottom: 5,
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}
                    >
                      Chỉnh sửa bình luận
                    </Text>
                    <View style={{ ...styles.inputContainer, height: 40 }}>
                      <TextInput
                        value={inputComment}
                        style={{
                          ...styles.keyboardText,
                          fontSize: 20,
                          borderRadius: 20,
                          paddingLeft: 10,
                          backgroundColor: 'rgba(253, 253, 253, 0.3)',
                        }}
                        onChangeText={(text) => setinputComment(text)}
                      />
                    </View>
                  </View>
                  <View style={styles.bottomRight}>
                    <TouchableOpacity onPress={editComment}>
                      <Ionicons
                        name='checkmark-done-circle'
                        size={30}
                        style={{ ...styles.iconMicInput, top: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.BottomContainer}>
                  <View style={styles.bottomCenter}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        ref={(ref) => {
                          messageRef.current = ref;
                        }}
                        placeholder='Viết bình luận mới'
                        placeholderTextColor='rgba(0, 52, 49, 1)'
                        style={styles.keyboardText}
                        onChangeText={(text) => (messageValue.current = text)}
                      />
                    </View>
                  </View>
                  <View style={styles.bottomRight}>
                    <TouchableOpacity onPress={sendComment}>
                      <Ionicons
                        name='send'
                        size={30}
                        style={styles.iconMicInput}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
      <View>
        <Modal
          visible={isModalVisible}
          animationType='slide'
          transparent={true}
        >
          <Pressable style={styles.modal} onPress={closeModal}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={toggleEdit}>
                <Text style={styles.button}>Chỉnh sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.button}>Xóa</Text>
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
                Bạn muốn xóa bình luận?
              </Text>
              <View style={styles.handleButton}>
                <TouchableOpacity onPress={togglecannel}>
                  <Text style={styles.button}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteComment}>
                  <Text style={{ ...styles.button, color: 'red' }}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BottomSheet;
