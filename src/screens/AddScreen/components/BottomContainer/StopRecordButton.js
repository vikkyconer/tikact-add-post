import React from "react";
import { View, TouchableOpacity } from "react-native";

const StopRecordButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 80,
        borderRadius: 70,
        alignItems: "center",
        marginTop: -20,
      }}
      onPress={() => {
        props.setRecording(false);
        props.stopRecording();
        // props.setRecordingPaused(true);
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 70,
          borderColor: "#ed3a50",
          borderWidth: 20,
          opacity: 0.5,
          position: "absolute",
        }}
      />
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: "#ed3a50",
          marginTop: 40,
        }}
      />
    </TouchableOpacity>
  );
};

export default StopRecordButton;
