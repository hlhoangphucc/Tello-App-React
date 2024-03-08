import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style';
import { useRoute } from '@react-navigation/native';

const InfoScreen = ({ navigation }) => {
  const route = useRoute();
  const email = route.params.email;
  const userData = route.params?.userData;

  const goToEditInfo = () => {
    navigation.navigate('EditInfo', { userData: userData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backgroundUser}>
          <Image
            source={
              userData.bg_url === 'null'
                ? require('../../../../assets/images/user.jpg')
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
                  ? require('../../../../assets/images/user.jpg')
                  : { uri: userData.avt_url }
              }
              style={styles.wrapAvt}
            />
          </View>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameUser}>{userData.user_name}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.contentBody}>
          <Text style={styles.textContent}>Giới Tính : {userData.gender}</Text>
        </View>
        <View style={styles.lineBody}></View>
        <View style={styles.contentBody}>
          <Text style={styles.textContent}>Email : {email}</Text>
        </View>
        <View style={styles.lineBody}></View>

        <View style={styles.contentBody}>
          <Text style={styles.textContent}>SĐT: {userData.phone}</Text>
        </View>
        <View style={styles.lineBody}></View>

        <View style={styles.editContainer}>
          <TouchableOpacity onPress={goToEditInfo} style={styles.contentEdit}>
            <Text style={styles.textContent}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InfoScreen;
