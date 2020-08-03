import React, { useEffect, useState } from "react";
import { RNFFmpeg } from "react-native-ffmpeg";
import VideoProgressbar from "./VideoProgressbar";
import CustomSlider from "./CustomSlider";
const {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} = require("react-native");
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
    const splitPath = props.uri.split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
    setFrames([]);
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/frames/`;
    const exist = await RNFS.exists(path);
    console.log("exist: ", exist);

    if (!exist) {
      const result = await RNFS.mkdir(path);
      const staleImages = await RNFS.readDir(path);
      console.log("staleImages: ", staleImages);
      const sourceFile = props.uri;
      console.log("sourceFile: ", sourceFile);
      const fps = props.length / 10;
      const images = await RNFFmpeg.execute(
        `-i '${sourceFile}' -vf fps=1/${fps} ${path}output%d.png`
      );
    }

    const createdImages = await RNFS.readDir(path);
    console.log("createdImages: ", createdImages);
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
        // backgroundColor: "#5395ea",
        paddingTop: 8,
        paddingLeft: 10,
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
      <CustomSlider />
      {/* <VideoProgressbar currentPosition={props.currentPosition} /> */}
    </View>
  );
};

export default VideoFrames;
