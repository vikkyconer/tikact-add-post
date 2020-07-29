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
    }
  };

  const processVideo = async () => {
    props.setVideoProcessing(true);
    const splitPath = props.videoUri.split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/processedVideo/`;
    const exist = await RNFS.exists(path);
    const result = !exist ? await RNFS.mkdir(path) : null;
    const _processedVideo = await RNFFmpeg.execute(
      `-i '${
        props.videoUri
      }' -filter:v "setpts=${getVideoSpeed()}*PTS" ${path}output.mp4`
    );
    props.setVideoProcessing(false);
    props.navigation.navigate("RecordedVideoPreview", {
      videoUri: `${path}output.mp4`,
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
        />
      ) : null}
    </View>
  );
};

export default RightContainer;
