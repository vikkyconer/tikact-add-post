import React from "react";
import { View, Image, Text } from "react-native";
import VideoThumbnail from "./VideoThumbnail";
import VideoDescription from "./VideoDescription";
import HorizontalLine from "./HorizontalLine";

const Body = (props) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <VideoThumbnail selectedVideo={props.selectedVideo} />
        <VideoDescription />
      </View>
      <HorizontalLine />
    </View>
  );
};

export default Body;
