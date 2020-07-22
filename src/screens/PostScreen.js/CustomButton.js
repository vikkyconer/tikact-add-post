import React from "react";
import { View, Text } from "react-native";

const CustomButton = (props) => {
  return (
    <View
      style={{
        borderColor: props.filled ? "blue" : "grey",
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: "49%",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: props.filled ? "blue" : "white",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {props.icon}
        <Text style={{ color: props.filled ? "white" : "black", fontSize: 20 }}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default CustomButton;
