import React, { useState } from "react";
import { View, Text } from "react-native";
import Video from "react-native-video";
import BottomBar from "../screens/RecordedVideoPreview/BottomBar";
import VideoEditOptions from "../screens/RecordedVideoPreview/VideoEditOptions";
import BackButton from "../screens/RecordedVideoPreview/BackButton";

const RecordedVideoPreview = (props) => {
  const { videoUri, videoDuration } = props.route.params;

  const [videoPlayer, setVideoPlayer] = useState(null);
  return (
    <View>
      <Video
        ref={(ref) => setVideoPlayer(ref)}
        pictureInPicture={true}
        fullscreen={true}
        volume={0}
        repeat={true}
        resizeMode={"cover"}
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
    </View>
  );
};

export default RecordedVideoPreview;
