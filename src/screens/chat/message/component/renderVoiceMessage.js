import { useState, useRef } from 'react';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../style';

function formatTimeVoiceChat(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`;
  return formattedTime;
}

const GetRecordingLines = ({ urlFile, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const soundObject = useRef(null);
  const intervalId = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const timeoutId = useRef(null);
  const loadAudio = async () => {
    if (urlFile && !soundObject.current) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: urlFile },
          { shouldPlay: false }
        );
        soundObject.current = sound;
      } catch (error) {}
    }
  };

  const togglePlay = async () => {
    try {
      await loadAudio();
      if (soundObject.current) {
        if (!isPlaying) {
          await soundObject.current.playAsync();
          setIsPlaying(true);

          const durationInSeconds = parseInt(duration.split(':')[1], 10);
          if (!isPaused) {
            setCurrentTime(durationInSeconds);
          }

          const id = setInterval(() => {
            setCurrentTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
          }, 1000);
          intervalId.current = id;

          const newTimeoutId = setTimeout(async () => {
            clearInterval(id);
            setIsPlaying(false);
            setIsPaused(false);
            setCurrentTime(0);
            await soundObject.current?.setPositionAsync(0);
            await soundObject.current?.stopAsync();
          }, durationInSeconds * 1000);

          timeoutId.current = newTimeoutId;
        } else {
          await soundObject.current.pauseAsync();
          clearInterval(intervalId.current);
          setIsPlaying(false);
          setIsPaused(true);
          if (timeoutId.current !== null) {
            clearTimeout(timeoutId.current);
          }
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <View>
      {urlFile ? (
        <>
          <TouchableOpacity
            style={styles.audioPlayContainer}
            onPress={togglePlay}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play-circle'}
              color={'white'}
              size={25}
            />
            <Text style={styles.audioText}>
              {isPlaying
                ? formatTimeVoiceChat(currentTime)
                : isPaused
                ? formatTimeVoiceChat(currentTime)
                : duration}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size='small' color='#0000ff' />
      )}
    </View>
  );
};

export default GetRecordingLines;
