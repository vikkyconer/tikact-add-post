import React from "react";
import { style } from "../../styles";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { effectsIcon, uploadIcon } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import RecordButton from "./RecordButton";
import SpeedBar from "./SpeedBar";
import StopRecordButton from "./StopRecordButton";
const uploadPic = require("../../../../assets/images/upload.jpg");

const BottomContainer = (props) => {
  return (
    <View style={style.bottomContainer}>
      <SpeedBar
        showSpeedOptions={props.showSpeedOptions}
        recording={props.recording}
      />
      <View style={style.bottomVideoIconsContainer}>
        <TouchableOpacity
          onPress={() => null}
          style={{ alignItems: "center", marginTop: 15 }}
        >
          <Ionicons
            name="happy-outline"
            color="yellow"
            size={30}
            style={{ opacity: props.recording ? 0 : 1 }}
          />
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              opacity: props.recording ? 0 : 1,
            }}
          >
            Effects
          </Text>
        </TouchableOpacity>
        <View>
          {props.recording ? (
            <StopRecordButton
              setRecordingPaused={props.setRecordingPaused}
              setRecording={props.setRecording}
            />
          ) : (
            <RecordButton setRecording={props.setRecording} />
          )}
        </View>
        <TouchableOpacity
          style={{ alignItems: "center", marginTop: 20 }}
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
        {props.recorded ? (
          <Ionicons
            name="checkmark-circle-outline"
            color="#5395ea"
            size={40}
            style={{ top: 45, position: "absolute", right: 40 }}
            onPress={() => {
              console.log("uri: ", props.videoUri);
              props.navigation.navigate("AudioScreen", {
                videoUri: props.videoUri,
                videoDuration: props.videoDuration,
              });
            }}
          />
        ) : null}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          height: 10,
          width: 180,
        }}
      ></View>
    </View>
  );
};

export default BottomContainer;
