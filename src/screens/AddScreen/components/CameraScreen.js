import React, { useState, useRef } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
  Platform,
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
import { getVideoSpeed, getPath, getAudioSpeed } from "../utility";
import SoundContainer from "./SoundContainer";
var RNFS = require("react-native-fs");

const CameraScreen = (props) => {
  const [camera, setCamera] = useState(null);
  const [cameraSide, setCameraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const [recording, setRecording] = useState(false);
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
  const [soundPlayer, setSoundPlayer] = useState(null);
  const [startCounter, setStartCounter] = useState(0);
  const [endCounter, setEndCounter] = useState(0);
  const [initiatedCameraTime, setInitatedCameraTime] = useState(null);
  const [audioDelay, setAudioDelay] = useState(0);

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
        autoFocus={RNCamera.Constants.AutoFocus.on}
        videoStabilizationMode="auto"
        useNativeZoom={true}
        onRecordingStart={startedRecording}
        onRecordingEnd={endedRecording}
        onTap={(event) => setBottomContainer(bottomContainers.DEFAULT)}
        onCameraReady={() => {
          console.log("camera ready");
        }}
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
              cameraSide={cameraSide}
              setCameraSide={setCameraSide}
              setShowSpeedOptions={setShowSpeedOptions}
              showSpeedOptions={showSpeedOptions}
              setBottomContainer={setBottomContainer}
              selectedSound={selectedSound}
              recording={recording}
              remainingVideoDuration={remainingVideoDuration}
              totalVideoDuration={totalVideoDuration}
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
            setStartCounter={setStartCounter}
            setEndCounter={setEndCounter}
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
            setSoundPlayer={setSoundPlayer}
          />
        );
    }
  };

  const applyFilters = async (videoUris, lastVideo) => {
    const videoUri = videoUris[0].uri;
    const audioVideoPath = await getPath(videoUri, "audioVideo", true);
    const processedPath = await getPath(videoUri, "processedVideo", false);
    const _videoUris = videoUris;
    const lastVideoIndex = _videoUris.indexOf(lastVideo);
    let audioVideoFile = "";
    const processedVideoFile = `${processedPath}output_${lastVideoIndex}.mp4`;

    // if no sound and no speed -- working
    // if sound and no speed -- working
    // if no sound and speed -- working
    // if sound and speed -- working

    if (!selectedSound && lastVideo.currentSpeed === 1) {
      setProcessedVideos([...processedVideos, processedVideoFile]);
      await RNFS.copyFile(lastVideo.uri, processedVideoFile);
    } else if (selectedSound && lastVideo.currentSpeed === 1) {
      audioVideoFile = `${audioVideoPath}audio_video_${lastVideoIndex}.mp4`;
      setProcessedVideos([...processedVideos, processedVideoFile]);
      console.log("startAudio: ", lastVideo.startAudio);
      console.log("endAudio: ", lastVideo.endAudio);

      // const audioDelay = Platform.Version < 27 ? 3 : 0;
      await RNFFmpeg.execute(
        `-ss ${lastVideo.startAudio} -t ${lastVideo.endAudio} -i '${lastVideo.uri}' -ss ${lastVideo.startAudio} -t ${lastVideo.endAudio} -i '${selectedSound.url}' -c copy -map 0:v:0 -map 1:a:0 -shortest -q 1 ${processedVideoFile}`
      );
      // if(Platform.Version < 27) {
      //   await RNFFmpeg.execute(
      //     `-ss ${lastVideo.startAudio} -t ${lastVideo.endAudio} -i '${lastVideo.uri}' -ss ${lastVideo.startAudio} -t ${lastVideo.endAudio} -i '${selectedSound.url}' -c copy -map 0:v:0 -map 1:a:0 -shortest -q 1 ${processedVideoFile}`
      //   );
      // } else {
      //   await RNFFmpeg.execute(
      //     `-i '${lastVideo.uri}' -ss ${lastVideo.startAudio} -t ${lastVideo.endAudio} -i '${selectedSound.url}' -c copy -map 0:v:0 -map 1:a:0 -shortest -q 1 ${processedVideoFile}`
      //   );
      // }
      // if (audioDelay > 0) {
      //   // await RNFFmpeg.execute(
      //   //   `-ss ${lastVideo.startAudio} -t ${lastVideo.endAudio} -i '${selectedSound.url}' ${audioVideoFile}`
      //   // );

        
      // } else {
        
      // }
    } else if (!selectedSound && lastVideo.currentSpeed !== 1) {
      setProcessedVideos([...processedVideos, processedVideoFile]);

      audioVideoFile = `${lastVideo.uri}`;

      await RNFFmpeg.execute(
        `-i '${audioVideoFile}' -filter_complex "[0:v]setpts=${getVideoSpeed(
          lastVideo.currentSpeed
        )}*PTS[v];[0:a]${getAudioSpeed(
          lastVideo.currentSpeed
        )}[a]" -q 1 -map "[v]" -map "[a]" ${processedVideoFile}`
      );
    } else if (selectedSound && lastVideo.currentSpeed !== 1) {
      audioVideoFile = `${audioVideoPath}audio_video_${lastVideoIndex}.mp4`;
      setProcessedVideos([...processedVideos, processedVideoFile]);

      const audioDelay = Platform.Version < 27 ? 3 : 0;

      await RNFFmpeg.execute(
        `-i '${lastVideo.uri}' -ss ${lastVideo.startAudio} -t ${
          lastVideo.endAudio
        } -itsoffset ${audioDelay} -i '${
          selectedSound.url
        }' -filter_complex "[0:v]setpts=${getVideoSpeed(
          lastVideo.currentSpeed
        )}*PTS[v];[1:a]atempo=1[a]" -map "[v]" -map "[a]" -q 1 -shortest ${processedVideoFile}`
      );
    }

    const existingFiles = await RNFS.readDir(processedPath);
    console.log("cameraScreen existing Files: ", existingFiles);

    _videoUris[lastVideoIndex] = { ...lastVideo, processed: true };
    setVideoUris(_videoUris);
    console.log("_videoUris: ", _videoUris);
  };

  const endedRecording = async () => {
    const now = new Date();
    setEndTime(now);

    const diffTime = Math.abs(now - startTime);
    const _recordedVideoDuration = recordedVideoDuration + diffTime / 1000;
    const _endCounter = diffTime / 1000 / currentSpeed;
    setEndCounter(_recordedVideoDuration);

    if (soundPlayer) {
      if (_recordedVideoDuration >= totalVideoDuration) {
        await soundPlayer.stop();
      } else {
        await soundPlayer.pause();
      }
    }

    const lastVideo = {
      uri: lastVideoUri,
      currentSpeed,
      videoDuration: diffTime / 1000,
      processed: false,
      startAudio: startCounter,
      endAudio: _endCounter,
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

  const startedRecording = async () => {
    console.log("started:");
    const now = new Date();
    if (initiatedCameraTime) {
      const diffTime = Math.abs(now - initiatedCameraTime);
      const secondsDiff = diffTime / 1000;
      setAudioDelay(secondsDiff);
      console.log("secondsDiff: ", secondsDiff);
    }
    if (selectedSound && endCounter) {
      console.log("endCounter");
      setStartCounter(endCounter);
    }
    setStartTime(now);
    console.log("startAudioCounter endCounter: ", endCounter);
    if (soundPlayer) {
      await soundPlayer.setSpeed(1 / currentSpeed).play();
    }

    changeProgressBarPercent();
    setRecording(true);
  };

  const recordVideo = async () => {
    try {
      const _videoDuration =
        remainingVideoDuration > partVideoDuration
          ? partVideoDuration
          : remainingVideoDuration;

      if (remainingVideoDuration > 0) {
        const now = new Date();
        await setInitatedCameraTime(now);
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
