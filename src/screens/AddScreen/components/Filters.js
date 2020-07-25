import React, { useState } from "react";
import { style } from "../styles";
import ProfilePic from "./ProfilePic";
const { View } = require("react-native");

const Filters = (props) => {
  const filters = ["Normal", "F1", "F2", "F3", "F4", "F5"];
  const [selectedFilter, setSelectedFilter] = useState(0);

  const renderFilters = () => {
    return filters.map((filter, index) => {
      return (
        <ProfilePic
          key={index}
          filter={filter}
          selected={selectedFilter === index}
          setSelectedFilter={setSelectedFilter}
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
