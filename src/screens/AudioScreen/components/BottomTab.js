import React from "react";
const { View, Text, Image, TouchableOpacity } = require("react-native");
const { style } = require("../../AddScreen/styles");

const BottomTab = (props) => {
  return (
    <View
      style={{
        width: "100%",
        height: 250,
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <View style={style.background} />
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ color: "white" }}>Drag to set recording limit</Text>
      </View>
      <View
        style={{
          backgroundColor: "#555555",
          height: 90,
          marginVertical: 10,
        }}
      >
        <Image
          source={{ uri: props.audioFile }}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <TouchableOpacity
        style={{
          height: 60,
          marginTop: 10,
          alignItems: "center",
          backgroundColor: "#5395ea",
        }}
        onPress={() => {
          props.navigation.navigate("RecordAudio", {
            videoUri: props.videoUri,
            videoDuration: props.videoDuration,
          });
        }}
      >
        <Text style={{ color: "white", fontSize: 20, paddingTop: 15 }}>
          Start Countdown
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
