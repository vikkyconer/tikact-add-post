import React from "react";
import { style, StopRecordingButton } from "../styles";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { effectsIcon, uploadIcon } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import RecordButton from "./RecordButton";
import SpeedBar from "./SpeedBar";
const uploadPic = require("../../../assets/images/upload.jpg");

const BottomContainer = (props) => {
  return (
    <View style={style.bottomContainer}>
      <SpeedBar showSpeedOptions={props.showSpeedOptions} />
      <View style={style.bottomVideoIconsContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("LocalFiles")}
          style={{ alignItems: "center" }}
        >
          {effectsIcon}
          <Text style={{ color: "white", alignSelf: "center" }}>Upload</Text>
        </TouchableOpacity>

        {props.recording ? (
          <TouchableOpacity onPress={props.stopRecording}>
            <StopRecordingButton />
            <View style={style.stopRecordingSquare} />
          </TouchableOpacity>
        ) : !props.showTimer ? (
          <RecordButton />
        ) : null}

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

        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate("LocalFiles")}
          style={{ alignItems: "center" }}
        >
          {uploadIcon}
          <Text style={{ color: "white", alignSelf: "center" }}>Upload</Text>
        </TouchableOpacity> */}
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
      >
        {/* <Carousel
      ref={(c) => {
        carousel = c;
      }}
      layout={"stack"}
      data={carouselItems}
      renderItem={_renderItem}
      sliderWidth={100}
      itemWidth={50}
      inactiveSlideOpacity={1}
      onSnapToItem={(index) => setActiveIndex(index)}
    /> */}
      </View>
    </View>
  );
};

export default BottomContainer;
