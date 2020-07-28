import React from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BackButton = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <Ionicons
        name="arrow-back-outline"
        style={{ fontSize: 30, color: "white", paddingRight: 20 }}
      />
    </View>
  );
};

export default BackButton;
