import styles from './style';
import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import socket from '../../components/socket';
import uuid from 'react-native-uuid';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import axios from '../../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

function SearchScreen({ navigation }) {
  const [originalUsers, setOriginalUsers] = useState([]);
  const [alluser, setAllUser] = useState([]);
  const [myuser, setMyUser] = useState('');
  const [result, setResult] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUser = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(myUser);
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

  useEffect(() => {
    inputRef.current.clear();
    setOriginalUsers([]);
    setAllUser([]);
    setResult(false);
    const fetchData = async () => {
      if (myuser && myuser.user_id) {
        try {
          const response = await axios.get('get_all_user');
          const userData = response.data.users;

          const initialData = Array.from(
            { length: userData.length },
            (_, index) => ({
              user_id: userData[index].user_id,
              username: userData[index].user_name,
              email: userData[index].email,
              avt_url: userData[index].avt_url,
              bg_url: userData[index].bg_url,
              gender: userData[index].gender,
              phone: userData[index].phone,
            })
          );
          const filteredData = initialData.filter(
            (item) => item.user_id !== myuser.user_id
          );
          setAllUser(filteredData);
          setOriginalUsers(filteredData);
        } catch (error) {
          console.error('Error fetching data:', error);
          if (error.response) {
            console.error('Server error:', error.response.data);
          }
        }
      }
    };
    fetchData();
  }, [myuser]);

  const handleSearch = (text) => {
    const filteredResults = searchUser(text, originalUsers);
    setAllUser(filteredResults);
    setResult(true);
  };

  /*HANDLE SEARCH NAME*/
  const searchUser = (searchText, users) => {
    if (searchText === '') {
      return [];
    }
    const normalizedSearchText = searchText.toUpperCase();
    const filteredUsers = (users ?? []).filter((user) => {
      const normalizedPhone = user.phone ? user.phone.toUpperCase() : '';
      const normalizedUsername = user.username
        ? user.username.toUpperCase()
        : '';
      const normalizedEmail = user.email ? user.email.toUpperCase() : '';

      const userInformation =
        normalizedPhone + normalizedUsername + normalizedEmail;

      return userInformation.includes(normalizedSearchText);
    });

    return filteredUsers;
  };

  const goToProfileScreen = (data) => {
    navigation.navigate('InfoSearch', { userData: data, myuser: myuser });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => goToProfileScreen(item)}
    >
      {item && (
        <Image
          source={
            item.avt_url === 'null'
              ? require('../../assets/images/user.jpg')
              : { uri: item.avt_url }
          }
          style={styles.avatar}
        />
      )}
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.username}</Text>
        <Text style={styles.state}>Đã kết nối</Text>
      </View>
    </TouchableOpacity>
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.header}>
          <View style={styles.iconsBackContainer}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name='arrow-back' size={35} color='white' />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Icon name='search' style={styles.icon} />

            <TextInput
              ref={(ref) => {
                inputRef.current = ref;
              }}
              style={styles.input}
              placeholder='Tìm kiếm'
              placeholderTextColor='#b1b5b9'
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
        </View>

        <View style={styles.bottom}>
          {result && (
            <FlatList
              data={alluser}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SearchScreen;
