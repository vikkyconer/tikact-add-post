import React from "react";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const LeftContainer = (props) => {
  const window = Dimensions.get("window");
  return (
    <View
      style={{
        width: window.width / 3,
        paddingVertical: 40,
        alignItems: "center",
      }}
    >
      {!props.recording ? (
        <TouchableOpacity onPress={() => null}>
          <Ionicons name="happy" color="yellow" size={30} />
          <Text
            style={{
              color: "white",
              alignSelf: "center",
            }}
          >
            Effects
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default LeftContainer;
