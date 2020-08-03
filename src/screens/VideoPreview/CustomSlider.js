import React from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { View, Dimensions } from "react-native";

const CustomSlider = (props) => {
  return (
    <View style={{ position: "absolute", left: 20, top: 15 }}>
      <MultiSlider
        trackStyle={{ height: 70, opacity: 0 }}
        selectedStyle={{
          borderColor: "blue",
          borderWidth: 5,
          opacity: 1,
          backgroundColor: "none",
        }}
        markerContainerStyle={{
          backgroundColor: "blue",
          height: 70,
          width: 20,
        }}
        markerStyle={{ backgroundColor: "red", height: 20, width: 5 }}
        markerOffsetY={23}
        values={[0, props.length]}
        sliderLength={Dimensions.get("window").width - 70}
        onValuesChange={(values) => {
          console.log("values: ", values);
          props.setVideoStartTime(values[0]);
        }}
        min={0}
        max={props.length}
        step={1}
        allowOverlap={false}
        snapped={true}
      />
    </View>
  );
};

export default CustomSlider;
