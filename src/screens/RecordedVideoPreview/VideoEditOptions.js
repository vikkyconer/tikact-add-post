import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const VideoEditOptions = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        justifyContent: "space-between",
        padding: 20,
        height: 200,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Ionicons
          name="color-filter-outline"
          style={{ fontSize: 30, color: "white" }}
        />
        <Text style={{ color: "white", fontSize: 10 }}>Filters</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Ionicons
          name="recording-outline"
          style={{ fontSize: 30, color: "white" }}
        />
        <Text style={{ color: "white", fontSize: 10 }}>Adjust Clips</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Ionicons
          name="mic-outline"
          style={{ fontSize: 30, color: "white" }}
        />
        <Text style={{ color: "white", fontSize: 10 }}>Voice effects</Text>
      </View>
    </View>
  );
};

export default VideoEditOptions;
