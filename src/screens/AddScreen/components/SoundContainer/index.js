import React, { useEffect, useRef } from "react";
import Animated from "react-native-reanimated";
import SoundGrid from "./SoundGrid";

const SoundContainer = (props) => {
  const containerHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(containerHeight, {
      toValue: 500,
      velocity: 5,
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
        // transform: [{ translateY: containerHeight }],
      }}
    >
      <SoundGrid setSelectedSound={props.setSelectedSound} />
    </Animated.View>
  );
};

export default SoundContainer;
