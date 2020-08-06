import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

export const soundIcon = (
  <Ionicons name="musical-notes-outline" color="white" size={20} />
);

export const checkIcon = (
  <Ionicons name="checkmark-circle-outline" color="blue" size={20} />
);

export const cameraFlipIcon = (
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

export const uploadIcon = (
  <Feather
    name="upload"
    color="white"
    size={30}
    style={{
      marginTop: 20,
    }}
  />
);

export const carouselItems = [
  {
    title: "15s",
  },
  {
    title: "60s",
  },
];

export const speeds = [0.3, 0.5, 1, 2, 3];
export const timers = [10, 3];

export const bottomContainers = {
  DEFAULT: 0,
  FILTER: 1,
  TIMER: 2,
  SOUND: 3
};
