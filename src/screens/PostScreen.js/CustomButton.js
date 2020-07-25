import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        borderColor: props.filled ? "blue" : "grey",
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: "49%",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: props.filled ? "#5395ea" : "white",
      }}
      onPress={() => props.navigation.navigate('BottomTab')}
    >
      <View style={{ flexDirection: "row" }}>
        {props.icon}
        <Text style={{ color: props.filled ? "white" : "#949494", fontSize: 20 }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
