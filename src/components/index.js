import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import WelcomeScreen from '../screens/welcome/index';
import ListChatScreen from '../screens/chat/index';
import HomeScreen from '../screens/home/index';
import NewpostScreen from '../screens/home/newpost/newpost';
import RegisterScreen from '../screens/register/index';
import ProfileScreen from '../screens/profile/index';
import UpdateAvt from '../screens/profile/upload/uploadavt';
import UpdateBg from '../screens/profile/upload/uploadbg';
import SettingProfile from '../screens/profile/setting/setting';
import InfoScreen from '../screens/profile/setting/info/info';
import ProfileSearch from '../screens/search/profileUser/index';
import EditiIfoScreen from '../screens/profile/setting/editinfo/editinfo';
import SearchScreen from '../screens/search';
import ChatScreen from '../screens/chat/message/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import EditPostScreen from '../screens/profile/editPost';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOption = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    height: 60,
    backgroundColor: '#15202b',
  },
};

const MainTabNavigator = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={screenOption}>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.container}>
                <MaterialCommunityIcons
                  name='home'
                  size={30}
                  color={focused ? 'white' : 'grey'}
                />
                <Text
                  style={focused ? styles.namePageFocused : styles.namePage}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.container}>
                <MaterialCommunityIcons
                  name='account-search'
                  size={30}
                  color={focused ? 'white' : 'grey'}
                />
                <Text
                  style={focused ? styles.namePageFocused : styles.namePage}
                >
                  Search
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name='ListChats'
          component={ListChatScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.container}>
                <MaterialCommunityIcons
                  name='chat'
                  size={30}
                  color={focused ? 'white' : 'grey'}
                />
                <Text
                  style={focused ? styles.namePageFocused : styles.namePage}
                >
                  Chat
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

const Index = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name='MainTabs'
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Newposts'
              component={NewpostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Chat'
              component={ChatScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Profile'
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='updateavt'
              component={UpdateAvt}
              options={{
                title: 'Đổi đại diện',
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#15202b',
                },
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name='updatebg'
              component={UpdateBg}
              options={{
                title: 'Đổi hình nền',
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#15202b',
                },
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />

            <Stack.Screen
              name='SettingProfileScreen'
              component={SettingProfile}
              options={{
                title: 'Cài đặt',
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#15202b',
                },
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />

            <Stack.Screen
              name='Info'
              component={InfoScreen}
              options={{
                title: 'Thông tin cá nhân',
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#15202b',
                },
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name='EditInfo'
              component={EditiIfoScreen}
              options={{
                title: 'Chỉnh sửa thông tin',
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#15202b',
                },
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='InfoSearch'
              component={ProfileSearch}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='EditPost'
              component={EditPostScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Welcome'
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='MainTabs'
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Newposts'
              component={NewpostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Chat'
              component={ChatScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Profile'
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='updateavt'
              component={UpdateAvt}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='updatebg'
              component={UpdateBg}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SettingProfileScreen'
              component={SettingProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Info'
              component={InfoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='EditInfo'
              component={EditiIfoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='InfoSearch'
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namePage: {
    color: 'grey',
    fontSize: 10,
    fontWeight: '500',
  },
  namePageFocused: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});
export default Index;
