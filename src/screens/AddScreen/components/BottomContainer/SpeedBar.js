import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { speeds } from "../../constants";

const SpeedBar = (props) => {
  const window = Dimensions.get("window");

  const getMultipleOptions = (arr) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginHorizontal: window.width * 0.03,
        }}
      >
        {arr.map((data, key) => {
          const isSelectedValue = data === props.currentSpeed;
          const initialBox = key === 0;
          const lastBox = key === arr.length - 1;
          return (
            <TouchableOpacity
              onPress={() => props.setCurrentSpeed(data)}
              key={key}
              style={{
                width: 68,
                height: 40,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: isSelectedValue ? "white" : "black",
                  opacity: isSelectedValue ? 1 : 0.2,
                  borderTopLeftRadius: isSelectedValue ? 5 : initialBox ? 5 : 0,
                  borderTopRightRadius: isSelectedValue ? 5 : lastBox ? 5 : 0,
                  borderBottomLeftRadius: isSelectedValue
                    ? 5
                    : initialBox
                    ? 5
                    : 0,
                  borderBottomRightRadius: isSelectedValue
                    ? 5
                    : lastBox
                    ? 5
                    : 0,
                }}
              />
              <Text
                style={{
                  color: data === props.currentSpeed ? "black" : "white",
                  fontSize: 15,
                  marginTop: 9,
                }}
              >
                {data}x
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={{
        paddingVertical: 10,
        height: 50,
        marginBottom: 10,
      }}
    >
      {props.showSpeedOptions && props.recording === false
        ? getMultipleOptions(speeds)
        : null}
    </View>
  );
};

export default SpeedBar;
