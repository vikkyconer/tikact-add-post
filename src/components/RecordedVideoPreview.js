import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Video from "react-native-video";
import BottomBar from "../screens/RecordedVideoPreview/BottomBar/BottomBar";
import VideoEditOptions from "../screens/RecordedVideoPreview/VideoEditOptions";
import BackButton from "../screens/RecordedVideoPreview/BackButton";
import Filters from "../screens/RecordedVideoPreview/FilterContainer/Filters";

const RecordedVideoPreview = (props) => {
  const { videoUri } = props.route.params;
  const [videoPlayer, setVideoPlayer] = useState(null);
  const [paused, setPaused] = useState(false);

  return (
    <View>
      <Video
        ref={(ref) => setVideoPlayer(ref)}
        pictureInPicture={true}
        fullscreen={true}
        volume={1}
        repeat={true}
        paused={paused}
        filterEnable={true}
        filter={"CIFalseColor"}
        resizeMode={"cover"}
        muted={false}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
        source={{ uri: videoUri }}
      />
      <BackButton navigation={props.navigation} />
      <VideoEditOptions />
      <BottomBar
        navigation={props.navigation}
        videoUri={videoUri}
        setPaused={setPaused}
      />
      {/* <Filters /> */}
    </View>
  );
};

export default RecordedVideoPreview;
