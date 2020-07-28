import React from "react";
import { View, Text } from "react-native";

const SetRecordTimeBar = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 80,
      }}
    >
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ color: "white", fontSize: 12 }}>0s</Text>
        <Text style={{ color: "white", fontSize: 12 }}>15.0s</Text>
      </View>
      <View
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: 60,
          borderRadius: 2,
        }}
      ></View>
    </View>
  );
};

export default SetRecordTimeBar
