import React, { useState } from "react";
import { View } from "react-native";
import CameraScreen from "./components/CameraScreen";

const AddScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <CameraScreen navigation={props.navigation} />
    </View>
  );
};

export default AddScreen;
