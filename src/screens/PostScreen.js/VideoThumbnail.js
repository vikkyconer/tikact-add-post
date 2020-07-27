import React from "react";
import { View, Image, Text } from "react-native";

const VideoThumbnail = (props) => {
  return (
    <View style={{ height: 170, width: 120, marginRight: 20 }}>
      <Image
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
        source={{ uri: props.videoUri }}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 30,
          backgroundColor: "black",
          opacity: 0.3,
        }}
      />
      <Text
        style={{
          position: "absolute",
          color: "white",
          alignSelf: "center",
          bottom: 6,
          fontSize: 15,
        }}
      >
        Change Cover
      </Text>
    </View>
  );
};

export default VideoThumbnail;
