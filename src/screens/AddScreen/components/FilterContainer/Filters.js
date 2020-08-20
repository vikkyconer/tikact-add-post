import React, { useState, useEffect, useRef } from "react";
import ProfilePic from "./ProfilePic";
import { RNCamera } from "react-native-camera";
// import DeviceBrightness from "react-native-device-brightness";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { bottomContainers } from "../../constants";
const { View, TouchableOpacity, Animated } = require("react-native");

const Filters = (props) => {
  const [filters, setFilters] = useState([]);
  const [filterBrightness, setFilterBrightness] = useState(1);
  const yScale = useRef(new Animated.Value(220)).current;

  useEffect(() => {
    Animated.spring(yScale, {
      toValue: 0,
      velocity: 20,
      tension: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    // DeviceBrightness.setBrightnessLevel(filterBrightness);
    const normal = RNCamera.Constants.WhiteBalance.auto;
    const f1 = RNCamera.Constants.WhiteBalance.sunny;
    const f2 = RNCamera.Constants.WhiteBalance.cloudy;
    const f3 = RNCamera.Constants.WhiteBalance.shadow;
    const f4 = RNCamera.Constants.WhiteBalance.incandescent;
    const f5 = RNCamera.Constants.WhiteBalance.fluorescent;
    const _filters = [
      { name: "Normal", value: normal },
      { name: "F1", value: f1 },
      { name: "F2", value: f2 },
      { name: "F3", value: f3 },
      { name: "F4", value: f4 },
      { name: "F5", value: f5 },
    ];
    setFilters(_filters);
  }, []);

  const renderFilters = () => {
    return filters.map((filter, index) => {
      return (
        <ProfilePic
          key={index}
          filter={filter}
          selected={props.selectedFilter === index}
          setSelectedFilter={props.setSelectedFilter}
          setWhiteBalance={props.setWhiteBalance}
          keyIndex={index}
        />
      );
    });
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 220,
        transform: [{ translateY: yScale }],
      }}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.8,
          marginTop: 50,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 5,
          top: 55,
          width: 25,
          height: 25,
        }}
        onPress={() => props.setBottomContainer(bottomContainers.DEFAULT)}
      >
        <Ionicons name="close-outline" color="white" size={25} />
      </TouchableOpacity>

      <View>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={filterBrightness}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => {
            setFilterBrightness(value);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 50,
        }}
      >
        {renderFilters()}
      </View>
    </Animated.View>
  );
};

export default Filters;
