import React, { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Slider from '@react-native-community/slider';
import Player from './Player';
import getFontSize from '../../utils';

const windowWidth = Dimensions.get('window').width;
const sliderStyle = Platform.OS === 'android'
  ? { width: windowWidth - 60 }
  : {
    width: (windowWidth - 120) * 2,
    transform: [
      { scaleX: 0.5 },
      { scaleY: 0.5 },
      { translateX: -(windowWidth - 120) + 40 },
    ],
  };

// const uri =
// "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3";
const AudioPlayer = ({ uri }) => {
  const [state, setState] = useState({
    isPlaying: false,
    currentPosition: 0,
    duration: 0,
    sliderEditing: false,
    seekPosition: 0,
    completed: false,
  });
  const onSliderEditStart = () => {
    setState({ ...state, sliderEditing: true });
  };
  const onSliderEditEnd = () => {
    setState({ ...state, sliderEditing: false });
  };

  const onSliderEditing = (value) => {
    setState({ ...state, seekPosition: value });
  };

  const pause = () => {
    setState({ ...state, isPlaying: false });
  };

  useEffect(() => {
    play();
  }, []);

  const play = () => {
    setState({ ...state, isPlaying: true, completed: false });
  };
  const onLoad = (event) => {
    setState({ ...state, duration: event.duration });
  };
  const onComplete = () => {
    setState({
      ...state,
      isPlaying: false,
      currentPosition: 0,
      completed: true,
    });
  };
  const onProgress = (event) => {
    if (state.sliderEditing) {
      return;
    }
    setState({ ...state, currentPosition: event.currentTime });
  };
  return (
    <>
      {!state.isPlaying ? (
        <FontAwesome5
          onPress={() => play()}
          name="play"
          size={getFontSize(16)}
          style={{ padding: 15 }}
        />
      ) : (
        <FontAwesome5
          onPress={() => pause()}
          name="pause"
          size={getFontSize(16)}
          style={{ padding: 15 }}
        />
      )}
      {!state.completed && (
        <Player
          paused={!state.isPlaying}
          onProgress={onProgress}
          onLoad={onLoad}
          onComplete={onComplete}
          onError={() => {}}
          uri={uri}
          seekPosition={state.seekPosition}
        />
      )}
      <Slider
        style={sliderStyle}
        onSlidingStart={onSliderEditStart}
        onSlidingComplete={onSliderEditEnd}
        onValueChange={onSliderEditing}
        value={state.currentPosition}
        maximumValue={state.duration}
        minimumTrackTintColor="#5396EB"
        maximumTrackTintColor="lightgrey"
        thumbTintColor="black"
      />
    </>
  );
};

export default AudioPlayer;
