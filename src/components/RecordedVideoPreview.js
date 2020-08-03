import React, { useState } from "react";
import { View, Text } from "react-native";
import Video from "react-native-video";
import BottomBar from "../screens/RecordedVideoPreview/BottomBar/BottomBar";
import VideoEditOptions from "../screens/RecordedVideoPreview/VideoEditOptions";
import BackButton from "../screens/RecordedVideoPreview/BackButton";
import Filters from "../screens/RecordedVideoPreview/FilterContainer/Filters";

const RecordedVideoPreview = (props) => {
  const { videoUri, totalVideoDuration } = props.route.params;

  const [videoPlayer, setVideoPlayer] = useState(null);
  return (
    <View>
      <Video
        ref={(ref) => setVideoPlayer(ref)}
        pictureInPicture={true}
        fullscreen={true}
        volume={0}
        repeat={true}
        filterEnable={true}
        filter={'CIFalseColor'}
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
      <BottomBar navigation={props.navigation} videoUri={videoUri} />
      {/* <Filters /> */}
    </View>
  );
};

export default RecordedVideoPreview;
