import React from "react";
import { Animated } from "react-native";
import SoundGrid from "./SoundGrid";

const SoundContainer = (props) => {
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
        transform: [{ translateY: props.soundsContainerY }],
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
