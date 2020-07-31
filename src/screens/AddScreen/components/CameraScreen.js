import React, { useState, useRef } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";
import { RNCamera } from "react-native-camera";
import VideoOtherOptions from "./VideoOtherOptions";
import BottomContainer from "./BottomContainer/BottomContainer";
import Feather from "react-native-vector-icons/Feather";
import { timers, bottomContainers } from "../constants";
import { style } from "../styles";
import Filters from "./FilterContainer/Filters";
import TimerContainer from "./TimerContainer/TimerContainer";
import VideoRecordProgress from "./VideoRecordProgress/VideoRecordProgress";

const CameraScreen = (props) => {
  const [camera, setCamera] = useState(null);
  const [cameraSide, setCameraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const [recording, setRecording] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(1);
  const [timerValue, setTimerValue] = useState(timers[1]);
  const [flashIcon, setFlashIcon] = useState("flash-off-outline");
  const [whiteBalance, setWhiteBalance] = useState(
    RNCamera.Constants.WhiteBalance.auto
  );
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [videoUris, setVideoUris] = useState([]);
  const [recorded, setRecorded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(15);
  const [showSpeedOptions, setShowSpeedOptions] = useState(true);
  const [recordingPaused, setRecordingPaused] = useState(false);
  const [videoProcessing, setVideoProcessing] = useState(false);
  const [bottomContainer, setBottomContainer] = useState(
    bottomContainers.DEFAULT
  );
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const window = Dimensions.get("window");
  const progressBarPercent = useRef(new Animated.Value(0)).current;
  const [pausedTimes, setPausedTimes] = useState([]);

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

  const changeProgressBarPercent = () => {
    const window = Dimensions.get("window");
    Animated.timing(progressBarPercent, {
      toValue: window.width * 0.9,
      duration: videoDuration * 1000,
      useNativeDriver: false,
    }).start();
  };

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

  const getCamera = () => {
    return (
      <RNCamera
        ref={(ref) => {
          setCamera(ref);
        }}
        whiteBalance={whiteBalance}
        style={{ flex: 1 }}
        captureAudio={true}
        type={cameraSide}
        flashMode={cameraFlash}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {!recording && !videoProcessing ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            onPress={() => setBottomContainer(bottomContainers.DEFAULT)}
          />
        ) : null}

        {videoProcessing ? (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              paddingVertical: window.width / 2,
            }}
          >
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : null}

        <View>
          <VideoRecordProgress
            progressBarPercent={progressBarPercent}
            pausedTimes={pausedTimes}
          />
          {bottomContainer === bottomContainers.DEFAULT &&
          recording === false ? (
            <VideoOtherOptions
              crossIcon={crossIcon}
              flashCamera={flashCamera}
              flashIcon={flashIcon}
              cameraSide={cameraSide}
              setCameraSide={setCameraSide}
              setShowSpeedOptions={setShowSpeedOptions}
              showSpeedOptions={showSpeedOptions}
              setBottomContainer={setBottomContainer}
            />
          ) : null}
        </View>

        {getBottomContainer()}
      </RNCamera>
    );
  };

  const getBottomContainer = () => {
    switch (bottomContainer) {
      case bottomContainers.DEFAULT:
        return (
          <BottomContainer
            recordVideo={recordVideo}
            stopRecording={stopRecording}
            recording={recording}
            navigation={props.navigation}
            showSpeedOptions={showSpeedOptions}
            setBottomContainer={setBottomContainer}
            setRecording={setRecording}
            setRecordingPaused={setRecordingPaused}
            recordingPaused={recordingPaused}
            recorded={recorded}
            videoUris={videoUris}
            setVideoProcessing={setVideoProcessing}
            setRecorded={setRecorded}
            setVideoUris={setVideoUris}
            setCurrentSpeed={setCurrentSpeed}
            currentSpeed={currentSpeed}
            setVideoDuration={setVideoDuration}
            videoDuration={videoDuration}
          />
        );
      case bottomContainers.FILTER:
        return (
          <Filters
            setWhiteBalance={setWhiteBalance}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setBottomContainer={setBottomContainer}
          />
        );
      case bottomContainers.TIMER:
        return <TimerContainer />;
    }
  };

  const recordVideo = async () => {
    try {
      console.log("recording");
      changeProgressBarPercent();
      const { uri, codec = "mp4" } = await camera.recordAsync({
        maxDuration: videoDuration,
      });
      console.log("uri: ", videoUris);
      setVideoUris([...videoUris, { uri, currentSpeed }]);
      setRecorded(true);
      setRecording(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const stopRecording = async () => {
    console.log("stopRecording");
    progressBarPercent.stopAnimation((value) =>
      setPausedTimes([...pausedTimes, parseInt(value)])
    );
    await camera.stopRecording();
    setRecording(false);
  };

  const getCameraOptions = () => {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        {/* <Image source={{ uri: videoUri }} style={{ flex: 1 }} /> */}
        <View style={{ position: "absolute", width: "100%", height: "100%" }}>
          <VideoOtherOptions
            crossIcon={crossIcon}
            flashCamera={flashCamera}
            flashIcon={flashIcon}
            setBottomContainer={setBottomContainer}
            cameraSide={cameraSide}
            setCameraSide={setCameraSide}
            setShowSpeedOptions={setShowSpeedOptions}
            showSpeedOptions={showSpeedOptions}
          />
          <BottomContainer
            recordVideo={recordVideo}
            stopRecording={stopRecording}
            recording={recording}
            navigation={props.navigation}
            showSpeedOptions={showSpeedOptions}
            setBottomContainer={setBottomContainer}
            setRecording={setRecording}
            setRecordingPaused={setRecordingPaused}
            recordingPaused={recordingPaused}
            recorded={recorded}
            videoUris={videoUris}
            setVideoProcessing={setVideoProcessing}
            setRecorded={setRecorded}
            setVideoUris={setVideoUris}
            setCurrentSpeed={setCurrentSpeed}
            currentSpeed={currentSpeed}
            setVideoDuration={setVideoDuration}
            videoDuration={videoDuration}
          />
        </View>
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
      <StatusBar hidden={true} />
      {getCamera()}
      {/* {!recorded ? getCamera() : getCameraOptions()} */}
    </View>
  );
};

export default CameraScreen;
