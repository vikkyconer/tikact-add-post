import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import Timers from "./Timers";
import SetRecordTimeBar from "./SetRecordTimeBar";
import StartShootingBtn from "./StartShootingBtn";
import Ionicons from "react-native-vector-icons/Ionicons";
import { bottomContainers } from "../../constants";

const TimerContainer = (props) => {
  const timerContainerY = useRef(new Animated.Value(220)).current;
  const [currentTimer, setCurrentTimer] = useState(3);

  useEffect(() => {
    Animated.spring(timerContainerY, {
      toValue: 0,
      velocity: 20,
      tension: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const runCounter = async () => {
    return new Promise((resolve, reject) => {
      let _currentTimer = currentTimer;
      var interval = setInterval(() => {
        _currentTimer -= 1;
        props.setTimerValue(_currentTimer);
        if (_currentTimer <= 0) {
          clearInterval(interval);
          props.setTimerValue(currentTimer);
          // props.setRecording(true);
          props.recordVideo();
          props.setBottomContainer(bottomContainers.DEFAULT);
          props.setShowCameraTimer(false);
          resolve();
        }
      }, 1000);
    });
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 280,
        transform: [{ translateY: timerContainerY }],
      }}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.8,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 5,
          top: 5,
          width: 25,
          height: 25,
        }}
        onPress={() => props.setBottomContainer(bottomContainers.DEFAULT)}
      >
        <Ionicons name="close-outline" color="white" size={25} />
      </TouchableOpacity>

      <View
        style={{
          width: "100%",
          height: 10,
          paddingHorizontal: 20,
          paddingVertical: 45,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 25,
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "white" }}>Drag to set recording limit</Text>
          <Timers
            setTimerValue={props.setTimerValue}
            setCurrentTimer={setCurrentTimer}
            currentTimer={currentTimer}
          />
        </View>
        <SetRecordTimeBar
          totalVideoDuration={props.totalVideoDuration}
          progressBarPercent={props.progressBarPercent}
          setPartVideoDuration={props.setPartVideoDuration}
          remainingVideoDuration={props.remainingVideoDuration}
        />
        <StartShootingBtn
          setRecording={props.setRecording}
          setShowCameraTimer={props.setShowCameraTimer}
          runCounter={runCounter}
        />
      </View>
    </Animated.View>
  );
};

export default TimerContainer;
