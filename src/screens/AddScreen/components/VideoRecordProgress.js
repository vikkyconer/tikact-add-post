import React from "react";
import { ProgressBar } from "react-native-paper";
import { View } from "react-native";

const VideoRecordProgress = () => {
  return (
    <View style={{ margin: 10 }}>
      <ProgressBar
        progress={0}
        color="yellow"
        style={{ height: 7, borderRadius: 5 }}
      />
    </View>
  );
};

export default VideoRecordProgress;
