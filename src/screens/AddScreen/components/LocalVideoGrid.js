import React, { useState, useEffect } from "react";
import CameraRoll from "@react-native-community/cameraroll";
import { hasAndroidPermission } from "../utility";
import { FlatList, View, TouchableOpacity, Image, Text } from "react-native";

const LocalVideoGrid = (props) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getLocalVideos();
  }, []);

  const getLocalVideos = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    const _videos = await CameraRoll.getPhotos({
      first: 20,
      assetType: "Videos",
      groupTypes: "Faces",
      include: ["playableDuration"],
    });
    setVideos(_videos.edges);
  };
  return (
    <FlatList
      data={videos}
      renderItem={({ item }) => {
        const playDuration = item.node.image.playableDuration;
        const durationMin = Math.floor(playDuration / 60);
        const durationSec = playDuration % 60;

        return (
          <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
            <TouchableOpacity
              onPress={() => {
                props.selectedVideo &&
                props.selectedVideo.node.image.uri === item.node.image.uri
                  ? props.setSelectedVideo(null)
                  : props.setSelectedVideo(item);
              }}
            >
              <Image
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 100,
                }}
                source={{ uri: item.node.image.uri }}
              />
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 15,
                  backgroundColor: "black",
                }}
              />
              {props.selectedVideo &&
              props.selectedVideo.node.image.uri === item.node.image.uri ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "blue",
                    opacity: 0.3,
                  }}
                />
              ) : null}

              <Text
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "white",
                  marginRight: 5,
                }}
              >
                {durationMin}:{durationSec}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default LocalVideoGrid;
