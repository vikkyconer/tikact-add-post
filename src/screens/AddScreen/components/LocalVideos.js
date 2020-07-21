import React, { useState, useEffect } from "react";
import CameraRoll from "@react-native-community/cameraroll";
import { hasAndroidPermission } from "../utility";
const { View, Text, FlatList, Image } = require("react-native");

const LocalVideos = (props) => {
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
    });
    console.log("_videos: ", _videos.edges[0]);
    setVideos(_videos.edges);
  };
  const renderVideos = () => {
    return videos.map((video, index) => {
      return <Text key={index}>Video</Text>;
      // const uri = video.node.image.uri;
      // return (
      //   <Video
      //     source={{ uri }} // Can be a URL or a local file.
      //   />
      // );
    });
  };

  return (
    <View>
      <FlatList
        data={videos}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
            <Image
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }}
              source={{ uri: item.node.image.uri }}
            />
          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default LocalVideos;
