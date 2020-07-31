import React from "react";
import { View, Modal, Text, TouchableOpacity, Animated } from "react-native";
var RNFS = require("react-native-fs");

const DiscardClipModal = (props) => {
  const discardClip = async () => {
    console.log("uris: ", props.videoUris);
    const splitPath = props.videoUris[0].uri.split("/");
    const fileName = splitPath[splitPath.length - 1];
    const fileNameWithoutExtension = fileName.split(".")[0];
    console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
    const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/processedVideo/`;
    const exist = await RNFS.exists(path);
    // if(exist) {
    //   await RNFS.unlink(path)
    // }
    // await Promise.all(props.videoUris.map(async(video) => {
    //   await RNFS.unlink(video.uri)
    // }))
    // props.setVideoUris([]);
    const lastClip = props.videoUris[props.videoUris.length - 1];

    await RNFS.unlink(lastClip.uri);
    props.videoUris.pop();
    props.setVideoUris(props.videoUris);

    props.pausedTimes.pop();
    props.setPausedTimes(props.pausedTimes);

    // setProgressBarPercent(
    //   Animated.Value(props.pausedTimes[props.pausedTimes.length - 1])
    // );
    props.progressBarPercent.setValue(
      props.pausedTimes[props.pausedTimes.length - 1]
    );

    if (!props.videoUris.length) {
      props.setRecording(false);
      props.setRecorded(false);
    }
    console.log("pausedTimesDiscard: ", props.pausedTimes);
    console.log("videoUris: ", props.videoUris);
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
