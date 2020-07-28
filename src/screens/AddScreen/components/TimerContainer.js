import React from "react";
import { View, Text } from "react-native";
import Timers from "./Timers";

const TimerContainer = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
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
      <View
        style={{
          width: "100%",
          height: 10,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 30,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "white" }}>Drag to set recording limit</Text>
          <Timers />
        </View>
        <View>
          <Text style={{ color: "white" }}>Drag to set recording limit</Text>
        </View>
      </View>
    </View>
  );
};

export default TimerContainer;
