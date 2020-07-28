import React from "react";
import { View, Dimensions, TouchableOpacity, Image, Text } from "react-native";
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
      <TouchableOpacity onPress={() => props.navigation.navigate("LocalFiles")}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 5,
            borderColor: "white",
            borderWidth: 2,
          }}
        >
          <Image source={uploadPic} style={{ height: "100%", width: "100%" }} />
        </View>
        <Text style={{ color: "white" }}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RightContainer;
