import React from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import Slider from "react-native-slider";
const checked = require("../../../../assets/icons/checked.png");

const SetRecordTimeBar = (props) => {
  const window = Dimensions.get("window");
  const renderHorizontalBars = () => {
    const n = parseInt(window.width * 0.21);

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
        <Text style={{ color: "white", fontSize: 12 }}>
          {props.videoDuration}s
        </Text>
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
        <Animated.View
          style={{
            backgroundColor: "white",
            width: props.progressBarPercent,
            height: 60,
            borderRadius: 2,
            alignItems: "center",
            paddingVertical: 23,
            flexDirection: "row",
            opacity: 0.3,
            position: "absolute",
          }}
        />
        {/* {renderHorizontalBars()} */}
        <Slider
          style={{ width: "100%", height: "100%" }}
          minimumValue={0}
          maximumValue={50}
          value={20}
          onValueChange={(value) => {}}
          maximumTrackTintColor="transparent"
          trackStyle={{
            height: 65,
          }}
          thumbStyle={{
            width: 5,
            height: 65,
            backgroundColor: "red",
            borderRadius: 5,
          }}
          // minimumTrackTintColor="transparent"
        />
        {/* <View style={{ backgroundColor: "red", height: 60, width: 2 }}></View> */}
      </View>
    </View>
  );
};

export default SetRecordTimeBar;
