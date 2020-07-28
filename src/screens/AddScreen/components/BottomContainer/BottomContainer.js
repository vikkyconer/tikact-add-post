import React from "react";
import { style } from "../../styles";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { effectsIcon, uploadIcon } from "../../constants";

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
      />
      <View style={style.bottomVideoIconsContainer}>
        <LeftContainer recording={props.recording} />
        <MiddleContainer
          setRecording={props.setRecording}
          recording={props.recording}
        />
        <RightContainer />
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

{
  /* 
        <View>
          {props.recording ? (
            <StopRecordButton
              setRecordingPaused={props.setRecordingPaused}
              
            />
          ) : (
            
          )}
        </View>
        <View>
          {!props.recording ? (
            
          ) : (
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 20,
                width: 80,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onPress={() => props.navigation.navigate("LocalFiles")}
            >
              <Ionicons
                name="backspace"
                style={{ fontSize: 30, color: "white" }}
              />
              <Ionicons
                name="checkmark-circle"
                style={{ fontSize: 30, color: "red" }}
              />
            </TouchableOpacity>
          )}
        </View>
        {props.recorded ? (
          <Ionicons
            name="checkmark-circle-outline"
            color="#5395ea"
            size={40}
            style={{ top: 45, position: "absolute", right: 40 }}
            onPress={() => {
              console.log("uri: ", props.videoUri);
              props.navigation.navigate("AudioScreen", {
                videoUri: props.videoUri,
                videoDuration: props.videoDuration,
              });
            }}
          />
        ) : null} */
}
