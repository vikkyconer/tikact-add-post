import React, { useState, useEffect } from "react";
import { style } from "../styles";
import ProfilePic from "./ProfilePic";
import { RNCamera } from "react-native-camera";
const { View } = require("react-native");

const Filters = (props) => {
  const [filters, setFilters] = useState([]);
  // const [selectedFilter, setSelectedFilter] = useState(0);

  useEffect(() => {
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
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 10,
      }}
    >
      <View style={style.background} />
      {renderFilters()}
    </View>
  );
};

export default Filters;
