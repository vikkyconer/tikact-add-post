import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { style } from "../AddScreen/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const BottomBar = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Ionicons
            name="musical-notes-outline"
            style={{ fontSize: 30, color: "white", paddingRight: 20 }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Sounds</Text>
        </View>
        <View>
          <Ionicons
            name="hand-left-outline"
            style={{ fontSize: 30, color: "white", paddingRight: 20 }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Effects</Text>
        </View>
        <View>
          <Ionicons
            name="text-outline"
            style={{ fontSize: 30, color: "white", paddingRight: 20 }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Texts</Text>
        </View>
        <View>
          <Ionicons
            name="happy-outline"
            style={{ fontSize: 30, color: "white", paddingRight: 20 }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Stickers</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          borderRadius: 5,
          width: 80,
          height: 40,
          marginTop: 20,
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() =>
          props.navigation.navigate("PostScreen", { videoUri: props.videoUri })
        }
      >
        <Text style={{ color: "white" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
