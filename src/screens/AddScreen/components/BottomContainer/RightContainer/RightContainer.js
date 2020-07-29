import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity, Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RNFFmpeg } from "react-native-ffmpeg";
import DiscardClipModal from "./DiscardClipModal";
var RNFS = require("react-native-fs");
const uploadPic = require("../../../../../assets/images/upload.jpg");

const RightContainer = (props) => {
  const window = Dimensions.get("window");
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const getVideoSpeed = () => {
    switch (props.currentSpeed) {
      case 0.3:
        return 3;
      case 0.5:
        return 2;
      case 1:
        return 1;
      case 2:
        return 0.5;
      case 3:
        return 0.3;
      default:
        return 1;
    }
  };

  const mergeVideos = async (path) => {
    const processedVideos = await Promise.all(
      props.videoUris.map(async (videoUri, index) => {
        const _processedVideo = await RNFFmpeg.execute(
          `-i '${videoUri}' -filter:v "setpts=${getVideoSpeed()}*PTS" ${path}output_${index}.mp4`
        );
        return `${path}output_${index}.mp4`;
      })
    );
    // const videos = processedVideos.map((processedVideo) => {
    //   return `'${processedVideo}'`;
    // });
    const query = processedVideos.join("|");
    console.log("query: ", query);

    const response = await RNFFmpeg.execute(
      `-i ${processedVideos[0]} -i ${processedVideos[1]} -filter_complex "[0:v][0:a][1:v][1:a] concat=n=2:v=1:a=1 [outv] [outa]" -map "[outv]" -map "[outa]" ${path}final.mp4`
    );
    console.log("response: ", response);
    return `${path}final.mp4`;
  };

  const processVideo = async () => {
    props.setVideoProcessing(true);
    console.log("uris: ", props.videoUris);
    const splitPath = props.videoUris[0].split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/processedVideo/`;
    const exist = await RNFS.exists(path);
    console.log("exist: ", exist);
    const result = !exist ? await RNFS.mkdir(path) : null;
    const videoPath = await mergeVideos(path);
    const files = await RNFS.readDir(path);
    console.log("files: ", files);

    props.setVideoProcessing(false);
    props.navigation.navigate("RecordedVideoPreview", {
      videoUri: videoPath,
    });
  };

  return (
    <View
      style={{
        width: window.width / 3,
        paddingVertical: 40,
        alignItems: "center",
      }}
    >
      {props.recording || props.recorded ? (
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="backspace"
            style={{ fontSize: 30, color: "white", paddingRight: 20 }}
            onPress={() => setShowDiscardModal(true)}
          />
          <Ionicons
            name="checkmark-circle"
            style={{ fontSize: 30, color: "red" }}
            onPress={processVideo}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("LocalFiles")}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 5,
              borderColor: "white",
              borderWidth: 2,
            }}
          >
            <Image
              source={uploadPic}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <Text style={{ color: "white" }}>Upload</Text>
        </TouchableOpacity>
      )}
      {showDiscardModal ? (
        <DiscardClipModal
          setShowDiscardModal={setShowDiscardModal}
          setRecorded={props.setRecorded}
          setRecording={props.setRecording}
          setVideoUris={props.setVideoUris}
        />
      ) : null}
    </View>
  );
};

export default RightContainer;
