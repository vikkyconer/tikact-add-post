import React from "react";
import { View, Modal, Text, TouchableOpacity, Animated } from "react-native";
var RNFS = require("react-native-fs");

const DiscardClipModal = (props) => {
  const discardClip = async () => {
    const splitPath = props.videoUris[0].uri.split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/processedVideo/`;
    const exist = await RNFS.exists(path);

    const lastClip = props.videoUris[props.videoUris.length - 1];

    await RNFS.unlink(lastClip.uri);
    console.log("lastClip.videoDuration: ", lastClip.videoDuration);
    const _recordedVideoDuration =
      props.recordedVideoDuration - lastClip.videoDuration;
    props.setRemainingVideoDuration(
      props.totalVideoDuration - _recordedVideoDuration
    );
    console.log(
      "discard remaining Video duration: ",
      props.totalVideoDuration - _recordedVideoDuration
    );
    console.log("discard _recordedVideoDuration: ", _recordedVideoDuration);
    props.setRecordedVideoDuration(_recordedVideoDuration);
    props.videoUris.pop();
    props.setVideoUris(props.videoUris);

    props.pausedTimes.pop();
    props.setPausedTimes(props.pausedTimes);

    if (props.pausedTimes.length) {
      props.progressBarPercent.setValue(
        props.pausedTimes[props.pausedTimes.length - 1]
      );
    } else {
      props.progressBarPercent.setValue(0);
    }

    if (!props.videoUris.length) {
      props.setRecording(false);
      props.setRecorded(false);
    }
    props.setShowDiscardModal(false);
  };
  return (
    <View>
      <Modal animationType="slide" transparent={true}>
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            width: "90%",
            height: 100,
            marginTop: 340,
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 5,
            padding: 20,
          }}
        >
          <View style={{ width: "100%", height: "80%", paddingHorizontal: 15 }}>
            <Text style={{ color: "grey", fontSize: 15 }}>
              Discard the last clip?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{ marginHorizontal: 30 }}
              onPress={() => props.setShowDiscardModal(false)}
            >
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: 15 }}
              onPress={discardClip}
            >
              <Text>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DiscardClipModal;
