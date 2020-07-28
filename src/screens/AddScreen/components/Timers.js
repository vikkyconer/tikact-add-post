import React from "react";
import { View, Text } from "react-native";

const Timers = () => {
  return (
    <View
      style={{
        backgroundColor: "grey",
        width: 100,
        flexDirection: "row",
        borderRadius: 20,
      }}
    >
      <View
        style={{
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "black",
          height: "100%",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          paddingVertical: 5,
        }}
      >
        <Text style={{ color: "white" }}>3s</Text>
      </View>
      <View
        style={{
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "none",
          height: "100%",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          paddingVertical: 5,
        }}
      >
        <Text style={{ color: "black" }}>10s</Text>
      </View>
    </View>
  );
};

export default Timers;
