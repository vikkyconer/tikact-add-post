import React, { useState, useEffect } from "react";
import CameraRoll from "@react-native-community/cameraroll";
import { hasAndroidPermission } from "../utility";
const {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} = require("react-native");

const LocalVideos = (props) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

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

  const getDuration = () => {
    const playDuration = selectedVideo.node.image.playableDuration;
    const durationMin = Math.floor(playDuration / 60);
    const durationSec = playDuration % 60;
    return `${durationMin}:${durationSec}`;
  };

  return (
    <View>
      <FlatList
        data={videos}
        renderItem={({ item }) => {
          const playDuration = item.node.image.playableDuration;
          const durationMin = Math.floor(playDuration / 60);
          const durationSec = playDuration % 60;

          return (
            <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
              <TouchableOpacity onPress={() => setSelectedVideo(item)}>
                <Image
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                  }}
                  source={{ uri: item.node.image.uri }}
                />
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
      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          padding: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        {selectedVideo ? (
          <View>
            <Image
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 100,
                width: 100,
              }}
              source={{ uri: selectedVideo.node.image.uri }}
            />
            <Text
              style={{
                position: "absolute",
                bottom: '37%',
                color: "white",
                marginRight: 5,
                fontSize: 20,
                marginLeft: 35,
              }}
            >
              {getDuration()}
            </Text>
            <View
              style={{
                marginTop: 5,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                margin: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  paddingTop: 10,
                  color: "grey",
                  fontSize: 15,
                }}
              >
                You can select both videos and photos
              </Text>
              <View style={[{ width: 80 }]}>
                <Button title="Next" />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default LocalVideos;
