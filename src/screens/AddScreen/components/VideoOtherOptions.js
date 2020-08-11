import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { soundIcon, bottomContainers } from "../constants";
import VideoEditTools from "./VideoEditTools";

const VideoOtherOptions = (props) => {
  const isVideoNotPlaying = () => {
    return (
      !props.recording &&
      props.remainingVideoDuration === props.totalVideoDuration
    );
  };
  return (
    <View>
      <View
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {props.crossIcon}

        <TouchableOpacity
          onPress={() => {
            if (isVideoNotPlaying()) {
              props.setBottomContainer(bottomContainers.SOUND);
            }
          }}
          style={{
            flexDirection: "row",
            position: "absolute",
            left: "40%",
            top: 10,
          }}
        >
          {soundIcon}
          <Text style={{ color: "white" }}>
            {props.selectedSound ? props.selectedSound.name : "Sounds"}
          </Text>
        </TouchableOpacity>

        <VideoEditTools
          flashCamera={props.flashCamera}
          flashIcon={props.flashIcon}
          setBottomContainer={props.setBottomContainer}
          cameraSide={props.cameraSide}
          setCameraSide={props.setCameraSide}
          setShowSpeedOptions={props.setShowSpeedOptions}
          showSpeedOptions={props.showSpeedOptions}
        />
      </View>
    </View>
  );
};

export default VideoOtherOptions;
