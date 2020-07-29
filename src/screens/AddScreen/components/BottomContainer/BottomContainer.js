import React, { useState } from "react";
import { style } from "../../styles";
import { View } from "react-native";

import RecordButton from "./RecordButton";
import SpeedBar from "./SpeedBar";
import StopRecordButton from "./StopRecordButton";
import MiddleContainer from "./MiddleContainer/MiddleContainer";
import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/RightContainer";

const BottomContainer = (props) => {
  
  return (
    <View style={style.bottomContainer}>
      <SpeedBar
        showSpeedOptions={props.showSpeedOptions}
        recording={props.recording}
        setCurrentSpeed={props.setCurrentSpeed}
        currentSpeed={props.currentSpeed}
      />
      <View style={style.bottomVideoIconsContainer}>
        <LeftContainer recording={props.recording} />
        <MiddleContainer
          setRecording={props.setRecording}
          recording={props.recording}
          recordVideo={props.recordVideo}
          stopRecording={props.stopRecording}
        />
        <RightContainer
          recording={props.recording}
          navigation={props.navigation}
          recorded={props.recorded}
          videoUris={props.videoUris}
          setVideoProcessing={props.setVideoProcessing}
          currentSpeed={props.currentSpeed}
          setRecording={props.setRecording}
          setRecorded={props.setRecorded}
          setVideoUris={props.setVideoUris}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          height: 10,
          width: 180,
        }}
      ></View>
    </View>
  );
};

export default BottomContainer;
