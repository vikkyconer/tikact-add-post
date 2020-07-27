import React, { useEffect, useState } from "react";
import { RNFFmpeg } from "react-native-ffmpeg";
import BottomTab from "../screens/AudioScreen/components/BottomTab";
var RNFS = require("react-native-fs");
const { View, Text, Image } = require("react-native");

const AudioScreen = (props) => {
  const { videoUri, videoDuration } = props.route.params;
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    getAudio();
  });

  const getAudio = async () => {
    console.log("videoUril: ", videoUri);
    const splitPath = videoUri.split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/`;
    const exist = await RNFS.exists(path);
    console.log("exist: ", exist);

    // if (exist) {
    //   await RNFS.unlink(`${path}${fileNameWithoutExtension}.wav`);
    //   await RNFS.unlink(`${path}${fileNameWithoutExtension}.png`);
    // }

    const result = await RNFS.mkdir(path);
    const sourceFile = videoUri;
    const audio = await RNFFmpeg.execute(
      `-i '${sourceFile}' -af "highpass=f=200, lowpass=f=3000" ${path}${fileNameWithoutExtension}.wav`
    );
    await RNFFmpeg.execute(
      `-i ${path}${fileNameWithoutExtension}.wav -filter_complex showwavespic=colors=#bababa -frames:v 1 ${path}${fileNameWithoutExtension}.png`
    );
    setAudioFile(`${path}${fileNameWithoutExtension}.png`);
  };

  return (
    <View>
      <Image
        source={{ uri: videoUri }}
        style={{ height: "100%", width: "100%" }}
      />
      <BottomTab
        audioFile={`file://${audioFile}`}
        navigation={props.navigation}
        videoUri={videoUri}
        videoDuration={videoDuration}
      />
    </View>
  );
};

export default AudioScreen;
