import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { style } from "./styles";
import Carousel from "react-native-snap-carousel";
import Feather from "react-native-vector-icons/Feather";
import { soundIcon, speeds, timers } from "./constants";
import { getIcon, hasAndroidPermission } from "./utility";
import BottomContainer from "./components/BottomContainer";
import VideoOtherOptions from "./components/VideoOtherOptions";

const AddScreen = (props) => {
  const [camera, setCamera] = useState(null);
  let carousel = null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [cameraSide, setCameraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const [recording, setRecording] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(1);
  const [timerValue, setTimerValue] = useState(timers[1]);

  const crossIcon = (
    <Feather
      name="x"
      color="white"
      size={30}
      onPress={() => {
        props.navigation.navigate("Home");
      }}
    />
  );

  const runCounter = async () => {
    return new Promise((resolve, reject) => {
      let _currentTimer = timers[currentTimer];
      var interval = setInterval(() => {
        _currentTimer -= 1;
        setTimerValue(_currentTimer);
        if (_currentTimer <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };

  const recordVideo = async () => {
    try {
      setShowTimer(true);
      await runCounter();
      setRecording(true);
      setShowTimer(false);
      setTimerValue(timers[currentTimer]);
      const { uri, codec = "mp4" } = await camera.recordAsync({
        maxDuration: 5,
      });
      console.log("uri: ", uri);
      setRecording(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const stopRecording = async () => {
    await camera.stopRecording();
    setRecording(false);
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 20 }}>
        <Text style={{ color: "white" }}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <View>
        <StatusBar hidden={true} />
      </View>
      <RNCamera
        ref={(ref) => {
          setCamera(ref);
        }}
        captureAudio={false}
        style={{ flex: 1 }}
        type={cameraSide}
        flashMode={cameraFlash}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {!recording && !showTimer ? (
          <VideoOtherOptions
            crossIcon={crossIcon}
            cameraFlash={cameraFlash}
            setCameraFlash={setCameraFlash}
          />
        ) : null}

        <View style={style.timer} />
        {showTimer ? <Text style={style.timerValue}>{timerValue}</Text> : null}
        <BottomContainer
          recordVideo={recordVideo}
          stopRecording={stopRecording}
          recording={recording}
          showTimer={showTimer}
          cameraSide={cameraSide}
          setCameraSide={setCameraSide}
        />
      </RNCamera>
    </View>
  );
};

export default AddScreen;
