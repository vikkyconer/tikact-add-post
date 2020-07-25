import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

const profilePic = require("../../../assets/images/profile.jpeg");

const ProfilePic = (props) => {
  return (
    <TouchableOpacity onPress={() => props.setSelectedFilter(props.keyIndex)}>
      <View
        style={{
          backgroundColor: props.selected ? "#5395ea" : "transparent",
          height: 60,
          width: 60,
          alignItems: "center",
          borderRadius: 100,
          padding: 5,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Image
            source={profilePic}
            style={{ height: "100%", width: "100%", borderRadius: 100 }}
          />
        </View>
      </View>
      <Text
        style={{
          color: props.selected ? "#5395ea" : "white",
          alignSelf: "center",
        }}
      >
        {props.filter}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfilePic;
