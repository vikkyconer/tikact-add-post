import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar, Platform } from "react-native";
import { RNCamera } from "react-native-camera";
import CameraRoll from "@react-native-community/cameraroll";
import { RecordButton, StopRecordingButton, style } from "./styles";
import Carousel from "react-native-snap-carousel";
import Feather from "react-native-vector-icons/Feather";
import {
  soundIcon,
  cameraFlipIcon,
  uploadIcon,
  speeds,
  timers,
} from "./constants";
import { getIcon, hasAndroidPermission } from "./utility";

const AddScreen = (props) => {
  const [camera, setCamera] = useState(null);
  let carousel = null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [cameraSide, setCamreraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const [recording, setRecording] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(2);
  const [currentTimer, setCurrentTimer] = useState(1);
  const [timerValue, setTimerValue] = useState(timers[1]);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [showTimerOptions, setShowTimerOptions] = useState(false);

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

  const getMultipleOptions = (arr, unit, currentValue) => {
    return arr.map((data, key) => {
      return (
        <View key={key}>
          {currentValue == key ? (
            <TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: "white",
                }}
              >
                <Text>
                  {data} {unit}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (unit === "x") {
                  setCurrentSpeed(key);
                } else {
                  setCurrentTimer(key);
                  setTimerValue(timers[key]);
                }
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <View style={style.background} />
                <Text style={{ color: "white" }}>
                  {data} {unit}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  const getVideoEditTools = () => {
    return (
      <View
        style={{
          alignItems: "flex-end",
          position: "absolute",
          right: 0,
        }}
      >
        <View style={{ marginVertical: 10 }}>
          {getIcon("color-filter-outline")}
          <Text style={{ color: "white" }}>Filters</Text>
        </View>

        <View style={{ marginVertical: 10, flexDirection: "row" }}>
          {showSpeedOptions ? (
            <View style={{ flexDirection: "row", marginRight: 8 }}>
              {getMultipleOptions(speeds, "x", currentSpeed)}
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() => setShowSpeedOptions(!showSpeedOptions)}
          >
            {getIcon("speedometer-outline")}
            <Text style={{ color: "white" }}>Speed</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 10, flexDirection: "row" }}>
          {showTimerOptions ? (
            <View style={{ flexDirection: "row", marginRight: 8 }}>
              {getMultipleOptions(timers, "s", currentTimer)}
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() => setShowTimerOptions(!showTimerOptions)}
          >
            {getIcon("stopwatch-outline")}
            <Text style={{ color: "white" }}>Timer</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={() => {
            cameraFlash === "off"
              ? setCameraFlash("torch")
              : setCameraFlash("off");
          }}
        >
          {cameraFlash === "off"
            ? getIcon("flash-off-outline")
            : getIcon("flash-outline")}
          <Text style={{ color: "white" }}>Flash</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getOtherOptions = () => {
    return (
      <View
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {crossIcon}
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            left: "45%",
            top: 10,
          }}
        >
          {soundIcon}
          <Text style={{ color: "white" }}>Sounds</Text>
        </View>
        {getVideoEditTools()}
      </View>
    );
  };

  const getLocalVideos = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    const res = await CameraRoll.getPhotos({first: 20, assetType: 'Videos'});
    console.log("res: ", res);
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
        {!recording && !showTimer ? getOtherOptions() : null}

        <View style={style.timer} />
        {showTimer ? <Text style={style.timerValue}>{timerValue}</Text> : null}

        <View style={style.bottomContainer}>
          <View style={style.background} />
          <View style={style.bottomVideoIconsContainer}>
            {!recording && !showTimer ? (
              <TouchableOpacity onPress={() => getLocalVideos()}>
                {uploadIcon}
                <Text style={{ color: "white", alignSelf: "center" }}>
                  Upload
                </Text>
              </TouchableOpacity>
            ) : null}

            {recording ? (
              <View>
                <StopRecordingButton onPress={() => stopRecording()} />
                <View style={style.stopRecordingSquare} />
              </View>
            ) : !showTimer ? (
              <RecordButton onPress={() => recordVideo()} />
            ) : null}

            {!recording && !showTimer ? (
              <TouchableOpacity
                onPress={() => {
                  console.log("Flip");
                  cameraSide === "front"
                    ? setCamreraSide("back")
                    : setCamreraSide("front");
                }}
              >
                {cameraFlipIcon}
                <Text style={{ color: "white", alignSelf: "center" }}>
                  Flip
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              height: 10,
              width: 180,
            }}
          >
            {/* <Carousel
              ref={(c) => {
                carousel = c;
              }}
              layout={"stack"}
              data={carouselItems}
              renderItem={_renderItem}
              sliderWidth={100}
              itemWidth={50}
              inactiveSlideOpacity={1}
              onSnapToItem={(index) => setActiveIndex(index)}
            /> */}
          </View>
        </View>
      </RNCamera>
    </View>
  );
};

export default AddScreen;
