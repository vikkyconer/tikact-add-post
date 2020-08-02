import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const VideoDurationContainer = (props) => {
  const [justifyContent, setJustifyContent] = useState(
    props.totalVideoDuration === 15 ? "flex-start" : "flex-end"
  );
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: justifyContent,
        alignSelf: "center",
        height: 30,
        width: 180,
      }}
    >
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => {
          setJustifyContent("flex-end");
          props.setTotalVideoDuration(60);
        }}
      >
        <Text style={{ color: "white" }}>60s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => {
          setJustifyContent("flex-start");
          props.setTotalVideoDuration(15);
        }}
      >
        <Text style={{ color: "white" }}>15s</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoDurationContainer;
