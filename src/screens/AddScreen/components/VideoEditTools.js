import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { timers, speeds, cameraFlipIcon } from "../constants";
import { style } from "../styles";
import { getIcon } from "../../../utility";

const VideoEditTools = (props) => {
  const [currentSpeed, setCurrentSpeed] = useState(2);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [showTimerOptions, setShowTimerOptions] = useState(false);

  const getMultipleOptions = (arr, unit, currentValue) => {
    return arr.map((data, key) => {
      return (
        <View key={key}>
          {currentValue == key ? (
            <TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: "white",
                }}
              >
                <Text>
                  {data} {unit}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (unit === "x") {
                  setCurrentSpeed(key);
                } else {
                  props.setCurrentTimer(key);
                  props.setTimerValue(timers[key]);
                }
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <View style={style.background} />
                <Text style={{ color: "white" }}>
                  {data} {unit}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  return (
    <View
      style={{
        alignItems: "flex-end",
        position: "absolute",
        right: 5,
        height: 320,
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity style={{ alignItems: "center" }}>
        {getIcon("camera-reverse-outline")}
        <Text style={{ color: "white" }}>Flip</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => setShowSpeedOptions(!showSpeedOptions)}
      >
        {getIcon("speedometer-outline")}
        <Text style={{ color: "white" }}>Speed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => props.setShowFilters(true)}
      >
        {getIcon("color-filter-outline")}
        <Text style={{ color: "white" }}>Filters</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => setShowTimerOptions(!showTimerOptions)}
      >
        {getIcon("stopwatch-outline")}
        <Text style={{ color: "white" }}>Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoEditTools;
