import React, { useState } from "react";
import { View } from "react-native";
import CameraScreen from "./components/CameraScreen";
import LocalFiles from "./components/LocalFiles";

const AddScreen = (props) => {
  const [screen, setScreen] = useState(0);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      {screen === 0 ? (
        <CameraScreen setScreen={setScreen} />
      ) : (
        <LocalFiles setScreen={setScreen} />
      )}
    </View>
  );
};

export default AddScreen;
