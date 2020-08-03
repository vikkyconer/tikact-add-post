import React, { useState, useRef } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
  Text,
} from "react-native";
import { RNCamera } from "react-native-camera";
import VideoOtherOptions from "./VideoOtherOptions";
import BottomContainer from "./BottomContainer/BottomContainer";
import Feather from "react-native-vector-icons/Feather";
import { bottomContainers } from "../constants";
import { RNFFmpeg } from "react-native-ffmpeg";
import Filters from "./FilterContainer/Filters";
import TimerContainer from "./TimerContainer/TimerContainer";
import VideoRecordProgress from "./VideoRecordProgress/VideoRecordProgress";
import TimerDisplay from "./TimerContainer/TimerDisplay";
import { getVideoSpeed } from "../utility";
var RNFS = require("react-native-fs");

const CameraScreen = (props) => {
  const [camera, setCamera] = useState(null);
  const [cameraSide, setCameraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const [recording, setRecording] = useState(false);
  const [flashIcon, setFlashIcon] = useState("flash-off-outline");
  const [whiteBalance, setWhiteBalance] = useState(
    RNCamera.Constants.WhiteBalance.auto
  );
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [videoUris, setVideoUris] = useState([]);
  const [recorded, setRecorded] = useState(false);
  const [totalVideoDuration, setTotalVideoDuration] = useState(15);
  const [partVideoDuration, setPartVideoDuration] = useState(15);
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
  const [timerValue, setTimerValue] = useState(3);
  const [showCameraTimer, setShowCameraTimer] = useState(false);
  const timerContainerY = useRef(new Animated.Value(220)).current;
  const [remainingVideoDuration, setRemainingVideoDuration] = useState(15);

  // video params
  const [lastVideoUri, setLastVideoUri] = useState(null);
  const [processedVideos, setProcessedVideos] = useState([]);

  // video recording params
  const [recordedVideoDuration, setRecordedVideoDuration] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

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
      duration: remainingVideoDuration * 1000,
      useNativeDriver: false,
    }).start();
  };

  const changeTimerContainerY = () => {
    Animated.spring(timerContainerY, {
      toValue: 0,
      velocity: 20,
      tension: 1,
      friction: 5,
      useNativeDriver: true,
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
        autoFocus={RNCamera.Constants.AutoFocus.on}
        useNativeZoom={true}
        onRecordingStart={startedRecording}
        onRecordingEnd={endedRecording}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {showCameraTimer ? <TimerDisplay timer={timerValue} /> : null}

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
              changeTimerContainerY={changeTimerContainerY}
            />
          ) : null}
        </View>

        {!showCameraTimer ? getBottomContainer() : null}
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
            setTotalVideoDuration={setTotalVideoDuration}
            setPartVideoDuration={setPartVideoDuration}
            totalVideoDuration={totalVideoDuration}
            setPausedTimes={setPausedTimes}
            pausedTimes={pausedTimes}
            progressBarPercent={progressBarPercent}
            remainingVideoDuration={remainingVideoDuration}
            setRemainingVideoDuration={setRemainingVideoDuration}
            setRecordedVideoDuration={setRecordedVideoDuration}
            recordedVideoDuration={recordedVideoDuration}
            processedVideos={processedVideos}
            setProcessedVideos={setProcessedVideos}
            processedVideos={processedVideos}
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
        return (
          <TimerContainer
            setTimerValue={setTimerValue}
            setRecording={setRecording}
            setShowCameraTimer={setShowCameraTimer}
            totalVideoDuration={totalVideoDuration}
            setBottomContainer={setBottomContainer}
            recordVideo={recordVideo}
            timerContainerY={timerContainerY}
            progressBarPercent={progressBarPercent}
            setPartVideoDuration={setPartVideoDuration}
            remainingVideoDuration={remainingVideoDuration}
          />
        );
    }
  };

  const startedRecording = () => {
    console.log("started:");
    const now = new Date();
    setStartTime(now);
    changeProgressBarPercent();
    setRecording(true);
  };

  const getPath = (videoPath) => {
    const splitPath = videoPath.split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/processedVideo/`;
    return path;
  };

  const applyFilters = async (videoUris, lastVideo, index) => {
    const videoUri = videoUris[0].uri;
    const path = getPath(videoUri);
    const exist = await RNFS.exists(path);
    console.log("exist: ", exist);
    const result = !exist ? await RNFS.mkdir(path) : null;
    const _exist = await RNFS.exists(path);
    console.log("now exist: ", _exist);

    // apply filter
    await RNFFmpeg.execute(
      `-i '${lastVideo.uri}' -filter:v "setpts=${getVideoSpeed(
        lastVideo.currentSpeed
      )}*PTS" ${path}output_${index}.mp4`
    );
    const _videoUris = videoUris;
    const lastVideoIndex = _videoUris.indexOf(lastVideo);
    _videoUris[lastVideoIndex] = { ...lastVideo, processed: true };
    setVideoUris(_videoUris);
    console.log("_videoUris: ", _videoUris);
    setProcessedVideos([...processedVideos, `${path}output_${index}.mp4`]);
  };

  const endedRecording = () => {
    const now = new Date();
    setEndTime(now);

    const diffTime = Math.abs(now - startTime);
    const _recordedVideoDuration = recordedVideoDuration + diffTime / 1000;
    console.log("ended");
    const lastVideo = {
      uri: lastVideoUri,
      currentSpeed,
      videoDuration: diffTime / 1000,
      processed: false,
    };
    const _videoUris = [...videoUris, lastVideo];
    setVideoUris(_videoUris);
    console.log("_recordedVideoDuration: ", _recordedVideoDuration);
    setRecordedVideoDuration(_recordedVideoDuration);

    progressBarPercent.stopAnimation((value) =>
      setPausedTimes([...pausedTimes, parseInt(value)])
    );
    const _remainingVideoDuration = totalVideoDuration - _recordedVideoDuration;

    applyFilters(_videoUris, lastVideo, _videoUris.length - 1);

    setRemainingVideoDuration(_remainingVideoDuration);
    setRecorded(true);
    setRecording(false);
  };

  const recordVideo = async () => {
    try {
      const _videoDuration =
        remainingVideoDuration > partVideoDuration
          ? partVideoDuration
          : remainingVideoDuration;

      if (remainingVideoDuration > 0) {
        const { uri, codec = "mp4" } = await camera.recordAsync({
          maxDuration: _videoDuration,
        });
        setLastVideoUri(uri);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const stopRecording = async () => {
    await camera.stopRecording();
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
            setTotalVideoDuration={setTotalVideoDuration}
            setPartVideoDuration={setPartVideoDuration}
            totalVideoDuration={totalVideoDuration}
            setPausedTimes={setPausedTimes}
            pausedTimes={pausedTimes}
            progressBarPercent={progressBarPercent}
            remainingVideoDuration={remainingVideoDuration}
            setRemainingVideoDuration={setRemainingVideoDuration}
            setRecordingVideoDuration={setRecordingVideoDuration}
            recordedVideoDuration={recordedVideoDuration}
            processedVideos={processedVideos}
            setProcessedVideos={setProcessedVideos}
            processedVideos={processedVideos}
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
