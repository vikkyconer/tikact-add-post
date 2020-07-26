import React, { useEffect, useState } from "react";
import { RNFFmpeg } from "react-native-ffmpeg";
import WaveForm from "react-native-audiowaveform";
var RNFS = require("react-native-fs");
const { View, Text } = require("react-native");

const AudioScreen = (props) => {
  const { videoUri } = props.route.params;
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    getAudio();
  });

  const getAudio = async () => {
    const splitPath = videoUri.split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/`;
    const exist = await RNFS.exists(path);
    console.log("exist: ", exist);

    if (!exist) {
      const result = await RNFS.mkdir(path);
      const sourceFile = videoUri;
      const audio = await RNFFmpeg.execute(
        `-i '${sourceFile}' ${path}output-audio.mp3`
      );
    }

    const audioFiles = await RNFS.readDir(path);
    const _audioFile = audioFiles[0].path;
    setAudioFile(_audioFile);
  };
  return (
    <View>
      {/* <WaveForm
        source={audioFile}
        waveFormStyle={{ waveColor: "red", scrubColor: "white" }}
      ></WaveForm> */}
      <Text>H</Text>
    </View>
  );
};

export default AudioScreen;
