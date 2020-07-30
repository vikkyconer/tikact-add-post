import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

const profilePic = require("../../../../assets/images/profile.jpeg");

const ProfilePic = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setSelectedFilter(props.keyIndex);
        props.setWhiteBalance(props.filter.value);
      }}
    >
      <View
        style={{
          borderColor: props.selected ? "red" : "transparent",
          height: 45,
          width: 45,
          alignItems: "center",
          borderRadius: 100,
          borderWidth: props.selected ? 2 : 0,
        }}
      >
        <Image
          source={profilePic}
          style={{ height: "100%", width: "100%", borderRadius: 100 }}
        />
      </View>
      <Text
        style={{
          color: props.selected ? "red" : "white",
          alignSelf: "center",
        }}
      >
        {props.filter.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfilePic;
