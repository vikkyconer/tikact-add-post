import React from "react";
import { View, Text } from "react-native";

const CaptionDisplay = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <Text>{props.enteredText}</Text>
    </View>
  );
};

export default CaptionDisplay;
