import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { RNFFmpeg } from "react-native-ffmpeg";
var RNFS = require("react-native-fs");
import Animated from "react-native-reanimated";
import SoundGrid from "./SoundGrid";
var Sound = require("react-native-sound");

const SoundContainer = () => {
  const containerHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(containerHeight, {
      toValue: 500,
      velocity: 5,
      tension: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
    // fetchSounds();
    // playSound();
  }, []);

  const playSound = async () => {
    const exist = await RNFS.exists(
      `${RNFS.DocumentDirectoryPath}/sounds/output.mp3`
    );
    console.log("exist: ", exist);
    // Sound.setCategory("Playback");
    // const file = await Sound(
    //   `${RNFS.DocumentDirectoryPath}/sounds/output.mp3`,
    //   Sound.MAIN_BUNDLE
    // );
    // file.setNumberOfLoops(-1);
    // file.play();
    const sound = new Sound(
      'https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4',
      null,
      (error) => {
        if (error) {
          // do something
          console.log("error: ", error);
        }

        // play when loaded
        sound.play();
      }
    );
  };

  const fetchSounds = async () => {
    const soundsFolder = `${RNFS.DocumentDirectoryPath}/sounds/`;
    await RNFS.mkdir(soundsFolder);
    // await RNFS.downloadFile({
    //   fromUrl: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
    //   toFile: `${soundsFolder}/tum-mile.mp4`,
    // });
    await RNFFmpeg.execute(
      `-i https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4 -vn -acodec copy ${RNFS.DocumentDirectoryPath}/sounds/output.mp3`
    );
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        height: 500,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // transform: [{ translateY: containerHeight }],
      }}
    >
      <SoundGrid />
    </Animated.View>
  );
};

export default SoundContainer;
