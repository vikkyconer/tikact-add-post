import React from "react";
import { View, Dimensions, TouchableOpacity, Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const uploadPic = require("../../../../../assets/images/upload.jpg");

const RightContainer = (props) => {
  const window = Dimensions.get("window");
  return (
    <View
      style={{
        width: window.width / 3,
        paddingVertical: 40,
        alignItems: "center",
      }}
    >
      {props.recording ? (
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="backspace"
            style={{ fontSize: 30, color: "white", paddingRight: 30 }}
          />
          <Ionicons
            name="checkmark-circle"
            style={{ fontSize: 30, color: "red" }}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("LocalFiles")}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 5,
              borderColor: "white",
              borderWidth: 2,
            }}
          >
            <Image
              source={uploadPic}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <Text style={{ color: "white" }}>Upload</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RightContainer;
