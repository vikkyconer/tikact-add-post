import React, { useState } from "react";
import VideoSelector from "./VideoSelector";
import LocalVideoGrid from "./LocalVideoGrid";
const { View } = require("react-native");

const LocalVideos = (props) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <View>
      <LocalVideoGrid
        setSelectedVideo={setSelectedVideo}
        selectedVideo={selectedVideo}
      />
      <VideoSelector
        selectedVideo={selectedVideo}
        navigation={props.navigation}
      />
    </View>
  );
};

export default LocalVideos;
