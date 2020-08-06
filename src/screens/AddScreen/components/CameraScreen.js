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
import { getVideoSpeed, getPath, promisify } from "../utility";
import { PinchGestureHandler } from "react-native-gesture-handler";
import SoundContainer from "./SoundContainer";

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
  const [zoom, setZoom] = useState(0);
  const [selectedSound, setSelectedSound] = useState("");

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

  const setZoomLevel = (nativeEvent) => {
    if (nativeEvent.scale > 1) {
      if (zoom < 1) {
        setZoom(zoom + 0.1);
      } else {
        setZoom(1);
      }
    } else if (nativeEvent.scale < 1) {
      if (zoom > 0) {
        setZoom(zoom - 0.1);
      } else {
        setZoom(0);
      }
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
        captureAudio={selectedSound ? false : true}
        type={cameraSide}
        flashMode={cameraFlash}
        zoom={zoom}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        videoStabilizationMode="auto"
        // useNativeZoom={true}
        onRecordingStart={startedRecording}
        onRecordingEnd={endedRecording}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        <PinchGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            setZoomLevel(nativeEvent);
          }}
        >
          <View
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </PinchGestureHandler>

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
            selectedSound={selectedSound}
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
      case bottomContainers.SOUND:
        return (
          <SoundContainer
            setSelectedSound={setSelectedSound}
            setBottomContainer={setBottomContainer}
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

  const applyFilters = async (videoUris, lastVideo) => {
    const videoUri = videoUris[0].uri;
    const path = await getPath(videoUri);
    const _videoUris = videoUris;
    const lastVideoIndex = _videoUris.indexOf(lastVideo);

    setProcessedVideos([
      ...processedVideos,
      `${path}output_${lastVideoIndex}.mp4`,
    ]);

    await RNFFmpeg.execute(
      `-i '${lastVideo.uri}' -i ${selectedSound} -c copy -map 0:v:0 -map 1:a:0 ${path}audio_video_${lastVideoIndex}.mp4`
    );

    // apply filter
    await RNFFmpeg.execute(
      `-i '${path}audio_video_${lastVideoIndex}.mp4' -filter:v "setpts=${getVideoSpeed(
        lastVideo.currentSpeed
      )}*PTS" -q 1 ${path}output_${lastVideoIndex}.mp4`
    );

    _videoUris[lastVideoIndex] = { ...lastVideo, processed: true };
    setVideoUris(_videoUris);
    console.log("_videoUris: ", _videoUris);
  };

  const endedRecording = () => {
    console.log(
      "endedRecording**************************************************"
    );
    const now = new Date();
    setEndTime(now);

    const diffTime = Math.abs(now - startTime);
    const _recordedVideoDuration = recordedVideoDuration + diffTime / 1000;

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

    applyFilters(_videoUris, lastVideo);

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <StatusBar hidden={true} />
      {getCamera()}
    </View>
  );
};

export default CameraScreen;
