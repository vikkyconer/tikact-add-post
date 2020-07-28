import React, { useState, useEffect } from "react";
import { style } from "../styles";
import ProfilePic from "./ProfilePic";
import { RNCamera } from "react-native-camera";
import DeviceBrightness from "react-native-device-brightness";
import Slider from "@react-native-community/slider";
import Feather from "react-native-vector-icons/Feather";
import { bottomContainers } from "../constants";
const { View } = require("react-native");

const Filters = (props) => {
  const [filters, setFilters] = useState([]);
  const [filterBrightness, setFilterBrightness] = useState(1);

  const crossIcon = (
    <Feather
      name="x"
      color="white"
      size={20}
      onPress={() => {
        props.setBottomContainer(bottomContainers.DEFAULT);
      }}
    />
  );

  useEffect(() => {
    DeviceBrightness.setBrightnessLevel(filterBrightness);
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
    <View
      style={{
        ...style.bottomContainer,
        justifyContent: "space-around",
        paddingTop: 10,
      }}
    >
      <View style={style.background} />
      <View style={{ position: "absolute", right: 10, top: 0 }}>
        {crossIcon}
      </View>
      <View>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={filterBrightness}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => {
            setFilterBrightness(value);
          }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {renderFilters()}
      </View>
    </View>
  );
};

export default Filters;
