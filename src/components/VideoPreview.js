import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { getIcon } from "../utility";

const VideoPreview = (props) => {
  const { selectedVideo } = props.route.params;
  const [rotation, setRotation] = useState(0);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View>
        <Image
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            transform: [{ rotate: `${rotation}deg` }],
          }}
          source={{ uri: selectedVideo.node.image.uri }}
        />
        <Ionicons
          name="play-circle-outline"
          color="white"
          size={80}
          style={{ position: "absolute", alignSelf: "center", top: "45%" }}
        />
      </View>
      <View
        style={[
          {
            position: "absolute",
            width: "100%",
            alignSelf: "flex-end",
            marginTop: 20,
            justifyContent: "space-between",
            flexDirection: "row",
            left: 10,
          },
        ]}
      >
        <Ionicons
          name="arrow-back-outline"
          color="white"
          size={20}
          onPress={() => props.navigation.goBack(null)}
        />
        <View style={{ width: 80, marginRight: 10, paddingRight: 10 }}>
          <Button title="Next" />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          flex: 1,
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          padding: 10,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "black",
            opacity: 0.3,
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "white" }}>59.0s selected</Text>
          <View style={{ flexDirection: "row" }}>
            {getIcon("speedometer-outline")}

            <Feather
              name="rotate-ccw"
              color="white"
              size={30}
              style={{ marginHorizontal: 20 }}
              onPress={() => setRotation(rotation + 90)}
            />
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default VideoPreview;
