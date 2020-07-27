import React from "react";
import { View, Text } from "react-native";
import { soundIcon } from "../constants";
import VideoEditTools from "./VideoEditTools";

const VideoOtherOptions = (props) => {
  return (
    <View
      style={{
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {props.crossIcon}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          left: "45%",
          top: 10,
        }}
      >
        {soundIcon}
        <Text style={{ color: "white" }}>Sounds</Text>
      </View>
      <VideoEditTools
        flashCamera={props.flashCamera}
        flashIcon={props.flashIcon}
        currentTimer={props.currentTimer}
        setCurrentTimer={props.setCurrentTimer}
        setTimerValue={props.setTimerValue}
        setShowFilters={props.setShowFilters}
        showFilters={props.showFilters}
        cameraSide={props.cameraSide}
        setCameraSide={props.setCameraSide}
      />
    </View>
  );
};

export default VideoOtherOptions;
