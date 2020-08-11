import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SoundGrid from "./SoundGrid";
import { bottomContainers } from "../../constants";

const SoundContainer = (props) => {
  const soundsContainerY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.spring(soundsContainerY, {
      toValue: 0,
      velocity: 20,
      tension: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

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
        transform: [{ translateY: soundsContainerY }],
      }}
    >
      <SoundGrid
        setSelectedSound={props.setSelectedSound}
        setBottomContainer={props.setBottomContainer}
        setSoundPlayer={props.setSoundPlayer}
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
        <Ionicons name="close-outline" color="black" size={25} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SoundContainer;
