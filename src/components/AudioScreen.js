import React, { useEffect, useState } from "react";
import { RNFFmpeg } from "react-native-ffmpeg";
import WaveForm from "react-native-audiowaveform";
var RNFS = require("react-native-fs");
const { View, Text, Image } = require("react-native");

const AudioScreen = (props) => {
  const { videoUri } = props.route.params;
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

    // if (!exist) {
    const result = await RNFS.mkdir(path);
    const sourceFile = videoUri;
    // const audio = await RNFFmpeg.execute(
    //   `-i '${sourceFile}' -af "highpass=f=200, lowpass=f=3000" ${path}output-audio.wav`
    // );
    // }

    // const audioFiles = await RNFS.exists(`${path}output-audio.avi`);
    // console.log("audioFiles here: ", audioFiles);
    // const _audioFile = audioFiles[0].path;
    // await RNFFmpeg.execute(
    //   `-i ${path}output-audio.wav -filter_complex showwavespic -frames:v 1 ${path}output2.png`
    // );
    // const audioFiles = await RNFS.readDir(path);
    // console.log("audioFiles: ", audioFiles[5].path);
    setAudioFile(`${path}output2.png`);
  };
  return (
    <View>
      {/* <WaveForm
        source={{uri: `file://${audioFile}`}}
        waveFormStyle={{ waveColor: "red", scrubColor: "white" }}
      ></WaveForm> */}
      <Image
        source={{ uri: `file://${audioFile}` }}
        style={{ height: 50, width: "100%" }}
      />
    </View>
  );
};

export default AudioScreen;
