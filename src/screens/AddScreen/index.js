import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StatusBar } from "react-native";
import { RNCamera } from "react-native-camera";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RecordButton, StopRecordingButton, style } from "./styles";
import Carousel from "react-native-snap-carousel";
import { crossIcon, soundIcon, cameraFlipIcon, uploadIcon } from "./constants";
import { getIcon } from "./utility";

const AddScreen = (props) => {
  const [camera, setCamera] = useState(null);
  let carousel = null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [cameraSide, setCamreraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const [recording, setRecording] = useState(false);
  const [timerValue, setTimerValue] = useState(3);
  const [showTimer, setShowTimer] = useState(false);
  var timeLeft = 3;

  const runCounter = async () => {
    return new Promise((resolve, reject) => {
      var interval = setInterval(() => {
        timeLeft -= 1;
        setTimerValue(timeLeft);
        if (timeLeft <= 0) {
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
      setTimerValue(3);
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

  const getVideoEditTools = () => {
    return (
      <View style={{ alignSelf: "center" }}>
        <View style={{ marginVertical: 10 }}>
          {getIcon("color-filter-outline")}
          <Text style={{ color: "white" }}>Filters</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          {getIcon("speedometer-outline")}
          <Text style={{ color: "white" }}>Speed</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          {getIcon("stopwatch-outline")}
          <Text style={{ color: "white" }}>Timer</Text>
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
        <View style={{ flexDirection: "row" }}>
          {soundIcon}
          <Text style={{ color: "white" }}>Sounds</Text>
        </View>
        {getVideoEditTools()}
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
        {!recording && !showTimer ? getOtherOptions() : null}

        <View style={style.timer} />
        {showTimer ? <Text style={style.timerValue}>{timerValue}</Text> : null}

        <View style={style.bottomContainer}>
          <View style={style.bottomBackground} />
          <View style={style.bottomVideoIconsContainer}>
            {!recording && !showTimer ? (
              <View>
                {uploadIcon}
                <Text style={{ color: "white", alignSelf: "center" }}>
                  Upload
                </Text>
              </View>
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
