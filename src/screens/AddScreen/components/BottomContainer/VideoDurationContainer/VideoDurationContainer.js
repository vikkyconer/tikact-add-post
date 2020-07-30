import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const VideoDurationContainer = () => {
  const [justifyContent, setJustifyContent] = useState("flex-start");
  useEffect(() => {}, [justifyContent]);
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
        onPress={() => setJustifyContent("flex-end")}
      >
        <Text style={{ color: "white" }}>60s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => setJustifyContent("flex-start")}
      >
        <Text style={{ color: "white" }}>15s</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoDurationContainer;
