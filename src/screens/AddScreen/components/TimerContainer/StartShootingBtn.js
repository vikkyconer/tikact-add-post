import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const StartShootingBtn = (props) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 50,
        backgroundColor: "red",
        marginTop: 20,
        alignSelf: "center",
        alignItems: "center",
        paddingTop: 15,
      }}
      onPress={() => {
        props.setShowCameraTimer(true);
        props.runCounter();
      }}
    >
      <Text style={{ color: "white" }}>Start shooting</Text>
    </TouchableOpacity>
  );
};

export default StartShootingBtn;
