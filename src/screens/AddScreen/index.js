import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RecordButton } from "./styles";
import Carousel from "react-native-snap-carousel";

const AddScreen = (props) => {
  let camera = null;
  let carousel = null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [cameraSide, setCamreraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const carouselItems = [
    {
      title: "15s",
    },
    {
      title: "60s",
    },
  ];
  const getIcon = (name) => {
    return <Ionicons name={name} color="white" size={30} />;
  };
  const crossIcon = (
    <Feather
      name="x"
      color="white"
      size={30}
      onPress={() => {
        props.navigation.navigate("Home");
      }}
    />
  );

  const soundIcon = (
    <Ionicons name="musical-notes-outline" color="white" size={20} />
  );

  const cameraFlipIcon = (
    <Ionicons
      name="camera-reverse-outline"
      color="white"
      size={30}
      style={{
        padding: 10,
        marginTop: 20,
      }}
    />
  );

  const uploadIcon = (
    <Feather
      name="upload"
      color="white"
      size={30}
      style={{
        padding: 10,
        marginTop: 20,
      }}
    />
  );

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 20 }}>
        <Text style={{ color: "white" }}>{item.title}</Text>
      </View>
    );
  };

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
        type={cameraSide}
        flashMode={cameraFlash}
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
          {crossIcon}
          <View style={{ flexDirection: "row" }}>
            {soundIcon}
            <Text style={{ color: "white" }}>Sounds</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View style={{ marginVertical: 10 }}>
              {getIcon("color-filter-outline")}
              <Text style={{ color: "white" }}>Filters</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              {getIcon("speedometer-outline")}
              <Text style={{ color: "white" }}>Speed</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              {getIcon("stopwatch-outline")}
              <Text style={{ color: "white" }}>Timer</Text>
            </View>
            <TouchableOpacity
              style={{ marginVertical: 10 }}
              onPress={() => {
                cameraFlash === "off"
                  ? setCameraFlash("torch")
                  : setCameraFlash("off");
              }}
            >
              {cameraFlash === "off"
                ? getIcon("flash-off-outline")
                : getIcon("flash-outline")}
              <Text style={{ color: "white" }}>Flash</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            flex: 1,
            justifyContent: "flex-end",
            bottom: 0,
            left: 0,
            right: 0,
            height: 180,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: "black",
              opacity: 0.3,
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
              flexDirection: "row",
              opacity: 1,
            }}
          >
            <View>
              {uploadIcon}
              <Text style={{ color: "white", alignSelf: "center" }}>
                Upload
              </Text>
            </View>

            <RecordButton />
            <TouchableOpacity
              onPress={() => {
                cameraSide === "front"
                  ? setCamreraSide("back")
                  : setCamreraSide("front");
              }}
            >
              {cameraFlipIcon}
              <Text style={{ color: "white", alignSelf: "center" }}>Flip</Text>
            </TouchableOpacity>
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
      </RNCamera>
    </View>
  );
};

export default AddScreen;
