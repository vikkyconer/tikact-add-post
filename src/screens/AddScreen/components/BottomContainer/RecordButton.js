import React from "react";
import { View, TouchableOpacity } from "react-native";
import { bottomContainers } from "../../constants";
import { promisify } from "../../utility";

const RecordButton = (props) => {
  const playSound = async () => {
    const sound = await promisify(props.selectedSound);
    sound.play();
  };
  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 80,
        borderRadius: 70,
        alignItems: "center",
      }}
      onPress={() => {
        props.recordVideo();
        playSound();
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 70,
          borderColor: "#ed3a50",
          borderWidth: 6,
          opacity: 0.5,
          position: "absolute",
        }}
      />
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 70,
          backgroundColor: "#ed3a50",
          marginTop: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default RecordButton;
