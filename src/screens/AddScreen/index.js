import React from "react";
import { View, Image, Text } from "react-native";
import { RNCamera } from "react-native-camera";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RecordButton } from "./styles";

const uploadIcon = require("../../assets/icons/upload.png");
const cameraFlipIcon = require("../../assets/icons/camera-flip.png");

const AddScreen = () => {
  let camera = null;
  const icon = <Feather name="x" color="white" size={30} />;
  const filterIcon = (
    <Ionicons name="color-filter-outline" color="white" size={30} />
  );
  const speedIcon = (
    <Ionicons name="speedometer-outline" color="white" size={30} />
  );
  const timerIcon = (
    <Ionicons name="stopwatch-outline" color="white" size={30} />
  );
  const flashOffIcon = (
    <Ionicons name="flash-off-outline" color="white" size={30} />
  );

  const soundIcon = (
    <Ionicons name="musical-notes-outline" color="white" size={20} />
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <RNCamera
        ref={(ref) => {
          camera = ref;
        }}
        captureAudio={false}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {icon}
          <View style={{ flexDirection: "row" }}>
            {soundIcon}
            <Text style={{ color: "white" }}>Sounds</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View style={{ marginVertical: 10 }}>
              {filterIcon}
              <Text style={{ color: "white" }}>Filters</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              {speedIcon}
              <Text style={{ color: "white" }}>Speed</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              {timerIcon}
              <Text style={{ color: "white" }}>Timer</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              {flashOffIcon}
              <Text style={{ color: "white" }}>Flash</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            backgroundColor: "black",
            flex: 1,
            justifyContent: "flex-end",
            opacity: 0.3,
            bottom: 0,
            left: 0,
            right: 0,
            height: 180
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <View>
              <Image
                source={uploadIcon}
                style={{
                  padding: 10,
                  width: 40,
                  height: 40,
                  bottom: 5,
                  marginTop: 30,
                }}
              />
              <Text style={{ color: "white", alignSelf: "center" }}>
                Upload
              </Text>
            </View>

            <RecordButton />
            <View>
              <Image
                source={cameraFlipIcon}
                style={{
                  padding: 10,
                  width: 40,
                  height: 40,
                  bottom: 5,
                  marginTop: 30,
                }}
              />
              <Text style={{ color: "white", alignSelf: "center" }}>Flip</Text>
            </View>
          </View>
          <View></View>
        </View>
      </RNCamera>
    </View>
  );
};

export default AddScreen;
