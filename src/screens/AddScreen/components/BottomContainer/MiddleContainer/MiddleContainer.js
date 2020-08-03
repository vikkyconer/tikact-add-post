import React from "react";
import { View, Dimensions } from "react-native";
import RecordButton from "../RecordButton";
import StopRecordButton from "../StopRecordButton";

const MiddleContainer = (props) => {
  const window = Dimensions.get("window");
  return (
    <View
      style={{
        width: window.width / 3,
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      {props.recording ? (
        <StopRecordButton stopRecording={props.stopRecording} />
      ) : (
        <RecordButton recordVideo={props.recordVideo} />
      )}
    </View>
  );
};

export default MiddleContainer;
