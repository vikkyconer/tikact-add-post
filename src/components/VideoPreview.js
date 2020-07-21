import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const VideoPreview = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
        height: "100%",
      }}
    >
      <Text style={{ color: "white", alignSelf: "center", fontSize: 50 }}>
        B
      </Text>
      <Ionicons
        name="checkmark-circle-outline"
        color="white"
        size={80}
        onPress={() => props.navigation.goBack(null)}
      />
    </View>
  );
};

export default VideoPreview;
