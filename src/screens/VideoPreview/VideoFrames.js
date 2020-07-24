import React, { useEffect, useState } from "react";
import { RNFFmpeg } from "react-native-ffmpeg";
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import VideoProgressbar from "./VideoProgressbar";
const { View, Text, Image, Dimensions, StyleSheet } = require("react-native");
var RNFS = require("react-native-fs");

const VideoFrames = (props) => {
  const [frames, setFrames] = useState([]);
  const [perFrameWidth, setPerFrameWidth] = useState(0);
  const [progressStatus, setProgressStatus] = useState(50);
  const window = Dimensions.get("window");

  useEffect(() => {
    getFrames();
  }, []);

  const getFrames = async () => {
    console.log("uri: ", props.uri);
    const result = await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/frames/`);
    const sourceFile = props.uri;
    const images = await RNFFmpeg.execute(
      `-i ${sourceFile} -vf fps=1/20 ${RNFS.DocumentDirectoryPath}/frames/output%d.png`
    );
    const createdImages = await RNFS.readDir(
      `${RNFS.DocumentDirectoryPath}/frames`
    );
    const _frames = createdImages.map((images) => {
      return images.path;
    });
    setPerFrameWidth(window.width / _frames.length);
    setFrames(_frames);
  };

  return (
    <View
      style={{
        flex: 1,
        width: window.width - 20,
        flexDirection: "row",
        opacity: frames && frames.length ? 1 : 0,
        backgroundColor: "#5395ea",
        paddingTop: 8,
        paddingLeft: 10
      }}
    >
      {frames.map((frame, index) => {
        return (
          <Image
            key={index}
            source={{ uri: `file://${frame}` }}
            style={{ width: perFrameWidth - 2.5, height: 80 }}
          />
        );
      })}

      <VideoProgressbar currentPosition={props.currentPosition} />
    </View>
  );
};

export default VideoFrames;
