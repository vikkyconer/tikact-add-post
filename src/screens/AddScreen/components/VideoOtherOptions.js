import React from "react";
import { View, Text } from "react-native";
import { soundIcon } from "../constants";
import VideoEditTools from "./VideoEditTools";
import { ProgressBar, Colors } from "react-native-paper";

const VideoOtherOptions = (props) => {
  return (
    <View>
      <View style={{ margin: 10 }}>
        <ProgressBar
          progress={0}
          color="yellow"
          style={{ height: 7, borderRadius: 5 }}
        />
      </View>
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
