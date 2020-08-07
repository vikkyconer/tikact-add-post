import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity, Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RNFFmpeg } from "react-native-ffmpeg";
import DiscardClipModal from "./DiscardClipModal";
import { getVideoSpeed, getPath } from "../../../utility";
var RNFS = require("react-native-fs");
const uploadPic = require("../../../../../assets/images/upload.jpg");

const RightContainer = (props) => {
  const window = Dimensions.get("window");
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const getAllVideoProcessed = async () => {
    return new Promise((resolve, reject) => {
      var interval = setInterval(() => {
        const allProcessed = props.videoUris.every(
          (videoUri) => videoUri.processed
        );

        if (allProcessed) {
          clearInterval(interval);
          resolve(props.processedVideos);
        }
      }, 100);
    });
  };

  const mergeVideos = async (path) => {
    const _processedVideos = await getAllVideoProcessed();
    console.log("processedVideos: ", _processedVideos);
    if (_processedVideos.length === 1) {
      return _processedVideos[0];
    }
    const videos = _processedVideos.map((processedVideo) => {
      return `-i '${processedVideo}'`;
    });
    const videoAudios = _processedVideos.map((processedVideo, index) => {
      return `[${index}:v][${index}:a]`;
    });
    const query = `${videos.join(" ")} -filter_complex "${videoAudios.join(
      ""
    )} concat=n=${_processedVideos.length}:v=1:a=1 [outv] [outa]"`;
    console.log("query: ", query);

    const response = await RNFFmpeg.execute(
      `${query} -q 1 -map "[outv]" -map "[outa]" ${path}final.mp4`
    );
    console.log("response: ", response);
    return `${path}final.mp4`;
  };

  const processVideo = async () => {
    props.setVideoProcessing(true);
    const path = await getPath(props.videoUris[0].uri, "processedVideo", false);

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
          {!props.recording ? (
            <Ionicons
              name="backspace"
              style={{ fontSize: 30, color: "white", paddingRight: 20 }}
              onPress={() => setShowDiscardModal(true)}
            />
          ) : null}

          {!props.recording ? (
            <Ionicons
              name="checkmark-circle"
              style={{ fontSize: 30, color: "red" }}
              onPress={processVideo}
            />
          ) : null}
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
          videoUris={props.videoUris}
          setPausedTimes={props.setPausedTimes}
          pausedTimes={props.pausedTimes}
          progressBarPercent={props.progressBarPercent}
          totalVideoDuration={props.totalVideoDuration}
          setRecordedVideoDuration={props.setRecordedVideoDuration}
          recordedVideoDuration={props.recordedVideoDuration}
          setRemainingVideoDuration={props.setRemainingVideoDuration}
          setProcessedVideos={props.setProcessedVideos}
          processedVideos={props.processedVideos}
          setStartCounter={props.setStartCounter}
          setEndCounter={props.setEndCounter}
          selectedSound={props.selectedSound}
        />
      ) : null}
    </View>
  );
};

export default RightContainer;
