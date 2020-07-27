import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { speeds } from "../constants";
import { style } from "../styles";

const SpeedBar = () => {
  const getMultipleOptions = (arr, unit, currentValue) => {
    return (
      <View style={{ flexDirection: "row", width: "100%" }}>
        {arr.map((data, key) => {
          return (
            <View key={key} style={{ width: 10, backgroundColor: key%2 ? "grey" : 'white' }}>
              <Text>{data}x</Text>
            </View>
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
      {getMultipleOptions(speeds, "x", 0)}
    </View>
  );
};

export default SpeedBar;
