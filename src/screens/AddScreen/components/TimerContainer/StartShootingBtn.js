import React from "react";
import { View, Text } from "react-native";

const StartShootingBtn = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        backgroundColor: "red",
        marginTop: 20,
        alignSelf: "center",
        alignItems: "center",
        paddingTop: 15,
      }}
    >
      <Text style={{ color: "white" }}>Start shooting</Text>
    </View>
  );
};

export default StartShootingBtn;
