import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import Slider from "react-native-slider";
const checked = require("../../../../assets/icons/checked.png");

const SetRecordTimeBar = (props) => {
  useEffect(() => {
    props.setPartVideoDuration(props.remainingVideoDuration);
  }, []);

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
          {props.totalVideoDuration}s
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

        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
          }}
        >
          <Animated.View
            style={{ width: props.progressBarPercent, height: "100%" }}
          />
          <Slider
            style={{
              flex: 1,
              height: "100%",
            }}
            minimumValue={0}
            maximumValue={15}
            value={15}
            onValueChange={(value) => {
              console.log("value: ", value);
              props.setPartVideoDuration(value);
            }}
            maximumTrackTintColor="transparent"
            trackStyle={{
              height: 65,
              opacity: 0.3,
            }}
            thumbStyle={{
              width: 5,
              height: 65,
              backgroundColor: "red",
              borderRadius: 5,
            }}
          />
        </View>
        {/* <View style={{ backgroundColor: "red", height: 60, width: 2 }}></View> */}
      </View>
    </View>
  );
};

export default SetRecordTimeBar;
