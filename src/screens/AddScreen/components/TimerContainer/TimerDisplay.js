import React from "react";
import { View, Text } from "react-native";

const TimerDisplay = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingVertical: "35%",
      }}
    >
      <Text style={{ fontSize: 250, color: "white" }}>{props.timer}</Text>
    </View>
  );
};

export default TimerDisplay;
