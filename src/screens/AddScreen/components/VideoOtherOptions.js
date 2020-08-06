import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { soundIcon, bottomContainers } from "../constants";
import VideoEditTools from "./VideoEditTools";

const VideoOtherOptions = (props) => {
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
          onPress={() => props.setBottomContainer(bottomContainers.SOUND)}
          style={{
            flexDirection: "row",
            position: "absolute",
            left: "45%",
            top: 10,
          }}
        >
          {soundIcon}
          <Text style={{ color: "white" }}>Sounds</Text>
        </TouchableOpacity>
        <VideoEditTools
          flashCamera={props.flashCamera}
          flashIcon={props.flashIcon}
          setBottomContainer={props.setBottomContainer}
          cameraSide={props.cameraSide}
          setCameraSide={props.setCameraSide}
          setShowSpeedOptions={props.setShowSpeedOptions}
          showSpeedOptions={props.showSpeedOptions}
          changeTimerContainerY={props.changeTimerContainerY}
        />
      </View>
    </View>
  );
};

export default VideoOtherOptions;
