import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
const { View, Text, Switch } = require("react-native");

const VideoVisibility = (props) => {
  const isEnabled = true;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {props.icon}
        <Text style={{ color: "grey", fontSize: 20 }}>{props.title}</Text>
      </View>
      {props.switch ? (
        <View style={{ flexDirection: "row" }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            value={isEnabled}
          />
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "grey", fontSize: 20 }}>Public</Text>
          <Ionicons name="chevron-forward-outline" color="grey" size={20} />
        </View>
      )}
    </View>
  );
};

export default VideoVisibility;
