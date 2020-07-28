import React from "react";
import { View, Text } from "react-native";
import { style } from "../AddScreen/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const BottomBar = () => {
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
            name="musical-notes-outline"
            style={{ fontSize: 30, color: "white", paddingRight: 20 }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Effects</Text>
        </View>
        <View>
          <Ionicons
            name="musical-notes-outline"
            style={{ fontSize: 30, color: "white", paddingRight: 20 }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>
            Texts
          </Text>
        </View>
        <View>
          <Ionicons
            name="musical-notes-outline"
            style={{ fontSize: 30, color: "white", paddingRight: 20 }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Stickers</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "red",
          borderRadius: 5,
          width: 80,
          height: 40,
          marginTop: 20,
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: "white" }}>Next</Text>
      </View>
    </View>
  );
};

export default BottomBar;
