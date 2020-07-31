import React from "react";
import { View } from "react-native";

const VideoPausedMark = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        marginLeft: props.position,
      }}
    >
      <View
        style={{
          height: "100%",
          width: 5,
          backgroundColor: "black",
        }}
      />
    </View>
  );
};

export default VideoPausedMark;
