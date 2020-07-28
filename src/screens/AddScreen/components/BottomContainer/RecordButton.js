import React from "react";
import { View } from "react-native";

const RecordButton = () => {
  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 70,
        alignItems: "center",
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
    </View>
  );
};

export default RecordButton;
