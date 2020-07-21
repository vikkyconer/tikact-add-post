import React, { useState } from "react";
import { View, StatusBar, Text } from "react-native";
import { RNCamera } from "react-native-camera";
import VideoOtherOptions from "./VideoOtherOptions";
import BottomContainer from "./BottomContainer";
import Feather from "react-native-vector-icons/Feather";
import { timers } from "../constants";
import { style } from "../styles";

const CameraScreen = (props) => {
  const [camera, setCamera] = useState(null);
  const [cameraSide, setCameraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const [recording, setRecording] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(1);
  const [timerValue, setTimerValue] = useState(timers[1]);
  const [flashIcon, setFlashIcon] = useState("flash-off-outline");

  const crossIcon = (
    <Feather
      name="x"
      color="white"
      size={30}
      onPress={() => {
        props.navigation.goBack(null);
      }}
    />
  );

  const flashCamera = () => {
    console.log("flash Camera");
    if (cameraFlash === "off") {
      setCameraFlash("torch");
      setFlashIcon("flash-outline");
    } else {
      setCameraFlash("off");
      setFlashIcon("flash-off-outline");
    }
  };
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
    console.log("stopRecording");
    await camera.stopRecording();
    setRecording(false);
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
            flashCamera={flashCamera}
            flashIcon={flashIcon}
            currentTimer={currentTimer}
            setCurrentTimer={setCurrentTimer}
            setTimerValue={setTimerValue}
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
          navigation={props.navigation}
        />
      </RNCamera>
    </View>
  );
};

export default CameraScreen;
