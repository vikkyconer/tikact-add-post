import React, { useEffect } from "react";
import { View, Animated } from "react-native";
import VideoPausedMark from "./VideoPausedMark";

const VideoRecordProgress = (props) => {
  useEffect(() => {}, [props.progressBarPercent]);

  const renderPausedMarks = () => {
    return props.pausedTimes.map((pausedTime, index) => {
      return <VideoPausedMark key={index} position={pausedTime} />;
    });
  };

  return (
    <View
      style={{
        margin: 10,
        height: 7,
        width: "90%",
        alignItems: "center",
        borderRadius: 5,
        alignSelf: "center",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 5,
        }}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "grey",
            borderRadius: 5,
          }}
        />
        <Animated.View
          style={{
            height: "100%",
            width: props.progressBarPercent,
            backgroundColor: "yellow",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopRightRadius:
              props.progressBarPercent === window.width * 0.9 ? 5 : 0,
            borderBottomRightRadius:
              props.progressBarPercent === window.width * 0.9 ? 5 : 0,
          }}
        />
        {renderPausedMarks()}
      </View>
    </View>
  );
};

export default VideoRecordProgress;
