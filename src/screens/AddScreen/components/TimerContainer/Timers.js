import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Timers = (props) => {
  return (
    <View
      style={{
        backgroundColor: "grey",
        width: 80,
        flexDirection: "row",
        borderRadius: 20,
      }}
    >
      <TouchableOpacity
        style={{
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: props.currentTimer === 3 ? "black" : "grey",
          height: "100%",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          paddingVertical: 5,
        }}
        onPress={() => {
          props.setTimerValue(3);
          props.setCurrentTimer(3);
        }}
      >
        <Text
          style={{ color: props.currentTimer === 3 ? "white" : "black", fontSize: 12 }}
        >
          3s
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: props.currentTimer === 10 ? "black" : "grey",
          height: "100%",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          paddingVertical: 5,
        }}
        onPress={() => {
          props.setTimerValue(10);
          props.setCurrentTimer(10);
        }}
      >
        <Text
          style={{ color: props.currentTimer === 10 ? "white" : "black", fontSize: 12 }}
        >
          10s
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Timers;
