import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { timers, speeds } from "../constants";
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
        right: 0,
      }}
    >
      <View style={{ marginVertical: 10 }}>
        {getIcon("color-filter-outline")}
        <Text style={{ color: "white" }}>Filters</Text>
      </View>

      <View style={{ marginVertical: 10, flexDirection: "row" }}>
        {showSpeedOptions ? (
          <View style={{ flexDirection: "row", marginRight: 8 }}>
            {getMultipleOptions(speeds, "x", currentSpeed)}
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() => setShowSpeedOptions(!showSpeedOptions)}
        >
          {getIcon("speedometer-outline")}
          <Text style={{ color: "white" }}>Speed</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: 10, flexDirection: "row" }}>
        {showTimerOptions ? (
          <View style={{ flexDirection: "row", marginRight: 8 }}>
            {getMultipleOptions(timers, "s", props.currentTimer)}
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() => setShowTimerOptions(!showTimerOptions)}
        >
          {getIcon("stopwatch-outline")}
          <Text style={{ color: "white" }}>Timer</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ marginVertical: 10 }}
        onPress={props.flashCamera}
      >
        {getIcon(props.flashIcon)}
        <Text style={{ color: "white" }}>Flash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoEditTools;
