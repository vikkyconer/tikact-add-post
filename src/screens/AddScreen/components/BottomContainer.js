import React from "react";
import { style, StopRecordingButton, RecordButton } from "../styles";
import { View, Text, TouchableOpacity } from "react-native";
import { cameraFlipIcon, uploadIcon } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const BottomContainer = (props) => {
  return (
    <View style={style.bottomContainer}>
      <View style={style.background} />
      <View style={style.bottomVideoIconsContainer}>
        {!props.recording && !props.showTimer && !props.recorded ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("LocalFiles")}
          >
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

        {!props.recording && !props.showTimer && !props.recorded ? (
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
