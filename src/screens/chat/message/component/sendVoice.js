import React, { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../style';
import SendChat from './sendChat';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import axios from '../../../../../env';
import socket from '../../../../components/socket';

const SendVoiceChat = ({
  dataChatList,
  myUser,
  token,
  isEdit,
  inputMessage,
  setIsEdit,
}) => {
  const [recordingInProgress, setRecordingInProgress] = useState(false);
  const [duration, setDuration] = useState(0);
  const isCountingRef = useRef(false);
  const recordingRef = useRef('');
  const intervalIdRef = useRef('');

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        recordingRef.current = recording;
      }
    } catch (err) {}
  }
  /*STOP HANDLE VOICE MESSAGE*/
  async function stopRecording() {
    if (!recordingRef.current) {
      return;
    }
    setRecordingInProgress(false);
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const { sound, status } =
        await recordingRef.current.createNewLoadedSoundAsync();

      if ('durationMillis' in status) {
        const newDuration = status.durationMillis;
        const formattedDuration = getDurationFormatted(newDuration);

        const allRecordings = [
          {
            sound: sound,
            duration: formattedDuration,
            file: recordingRef.current.getURI() || '',
          },
        ];

        allRecordings.forEach(
          async (recording) => await sendRecording(recording)
        );
      } else {
      }
    } catch (error) {
    } finally {
      recordingRef.current = undefined;
    }
  }
  const handlePressIn = () => {
    intervalIdRef.current = setInterval(() => {
      setDuration((prevDuration) => {
        const newDuration = prevDuration + 1;
        if (newDuration <= 60) {
          return newDuration;
        } else {
        }
      });
    }, 1000);

    setRecordingInProgress(true);
    isCountingRef.current = true;
    startRecording();
  };
  const handlePressOut = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    setDuration(0);
    isCountingRef.current = false;
    stopRecording();
  };

  const handleClearVoice = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    setDuration(0);
    setRecordingInProgress(false);
    isCountingRef.current = false;
  };

  useEffect(() => {
    if (!isCountingRef.current) {
      setDuration(0);
    }
  }, [isCountingRef.current]);

  // CALCULATE FORMATTED DURATION FROM MILLISECONDS
  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }

  const sendRecording = async (recording) => {
    const formdata = new FormData();
    formdata.append('room_id', dataChatList.room_id);
    formdata.append('message', {
      uri: recording.file,
      type: 'voice/m4a',
      name: 'voice.m4a',
    });
    formdata.append('sender_id', myUser.user_id);
    formdata.append(
      'receiver_id',
      dataChatList.other_user_id === myUser.user_id
        ? dataChatList.my_id
        : dataChatList.other_user_id
    );
    formdata.append('send_time', moment().format());
    formdata.append('message_type', 'voice');
    formdata.append('voice_duration', recording.duration);
    try {
      const res = await axios.post('upload_voice', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        socket.emit('sendMessage', dataChatList);
      } else {
      }
    } catch (error) {
      console.error('Error uploading voice:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  return isEdit ? (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: '500',
            left: 10,
            top: 10,
          }}
        >
          Chỉnh sửa tin nhắn
        </Text>
        <TouchableOpacity
          style={{ right: 10, top: 5 }}
          onPress={handleCancelEdit}
        >
          <Ionicons name='close-circle' size={30} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainerEdit}>
        <SendChat
          handlePressIn={handlePressIn}
          dataChatList={dataChatList}
          myUser={myUser}
          token={token}
          isEdit={isEdit}
          inputMessage={inputMessage}
          setIsEdit={setIsEdit}
        />
      </View>
    </>
  ) : (
    <View style={styles.bottomContainer}>
      {recordingInProgress ? (
        <View style={styles.VoiceChatContainer}>
          <TouchableOpacity onPress={handleClearVoice}>
            <Ionicons name='trash' size={30} style={styles.micTrash} />
          </TouchableOpacity>
          <Text style={styles.DurationText}>Đang ghi được: {duration}s</Text>
          <TouchableOpacity onPress={handlePressOut}>
            <Ionicons name='send' size={30} style={styles.iconMicInput} />
          </TouchableOpacity>
        </View>
      ) : (
        <SendChat
          handlePressIn={handlePressIn}
          dataChatList={dataChatList}
          myUser={myUser}
          token={token}
          isEdit={isEdit}
          inputMessage={inputMessage}
          setIsEdit={setIsEdit}
        />
      )}
    </View>
  );
};

export default SendVoiceChat;
