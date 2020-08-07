import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import SoundGrid from "./SoundGrid";

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
    </Animated.View>
  );
};

export default SoundContainer;
