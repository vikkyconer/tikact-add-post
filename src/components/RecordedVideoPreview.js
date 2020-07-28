import React, { useState } from "react";
import { View, Text } from "react-native";
import Video from "react-native-video";
import BottomBar from "../screens/RecordedVideoPreview/BottomBar";

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
      <BottomBar />
    </View>
  );
};

export default RecordedVideoPreview;
