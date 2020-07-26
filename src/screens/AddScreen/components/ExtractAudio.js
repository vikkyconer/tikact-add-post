import React, { useEffect, useState } from "react";
import { RNFFmpeg } from "react-native-ffmpeg";
const { View } = require("react-native");

const ExtractAudio = (props) => {
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    getAudio();
  });

  const getAudio = async () => {
    console.log("uri: ", props.uri);
    const splitPath = props.uri.split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/`;
    const exist = await RNFS.exists(path);
    console.log("exist: ", exist);

    if (!exist) {
      const result = await RNFS.mkdir(path);
      const sourceFile = props.uri;
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
      <Text>Hello</Text>
    </View>
  );
};

export default ExtractAudio;
