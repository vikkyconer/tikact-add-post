import React from "react";
import { View, Text, Dimensions } from "react-native";

const SetRecordTimeBar = () => {
  const window = Dimensions.get("window");
  const renderHorizontalBars = () => {
    const n = parseInt(window.width * 0.18);

    return [...Array(n)].map((e, i) => (
      <Text key={i} style={{ color: "white", height: 10, fontSize: 20 }}>
        |
      </Text>
    ));
  };

  return (
    <View
      style={{
        width: "100%",
        height: 80,
      }}
    >
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ color: "grey", fontSize: 12 }}>0s</Text>
        <Text style={{ color: "white", fontSize: 12 }}>15.0s</Text>
      </View>
      <View
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: 60,
          borderRadius: 2,
          alignItems: "center",
          paddingVertical: 23,
          flexDirection: "row",
        }}
      >
        {renderHorizontalBars()}
        <View style={{ backgroundColor: "red", height: 60, width: 2 }}></View>
      </View>
    </View>
  );
};

export default SetRecordTimeBar;
