import React from "react";
import { style, StopRecordingButton, RecordButton } from "../styles";
import { View, Text, TouchableOpacity } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { cameraFlipIcon, uploadIcon } from "../constants";
import { hasAndroidPermission } from "../utility";

const BottomContainer = (props) => {
  const getLocalVideos = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    const res = await CameraRoll.getPhotos({ first: 20, assetType: "Videos" });
    console.log("res: ", res.edges[0]);
  };

  return (
    <View style={style.bottomContainer}>
      <View style={style.background} />
      <View style={style.bottomVideoIconsContainer}>
        {!props.recording && !props.showTimer ? (
          <TouchableOpacity onPress={getLocalVideos}>
            {uploadIcon}
            <Text style={{ color: "white", alignSelf: "center" }}>Upload</Text>
          </TouchableOpacity>
        ) : null}

        {props.recording ? (
          <TouchableOpacity onPress={props.stopRecording}>
            <StopRecordingButton />
            <View style={style.stopRecordingSquare} />
          </TouchableOpacity>
        ) : !props.showTimer ? (
          <RecordButton onPress={props.recordVideo} />
        ) : null}

        {!props.recording && !props.showTimer ? (
          <TouchableOpacity
            onPress={() => {
              console.log("Flip");
              props.cameraSide === "front"
                ? props.setCameraSide("back")
                : props.setCameraSide("front");
            }}
          >
            {cameraFlipIcon}
            <Text style={{ color: "white", alignSelf: "center" }}>Flip</Text>
          </TouchableOpacity>
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
