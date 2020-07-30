import React, { useRef, useEffect } from "react";
import { View, Animated, Dimensions } from "react-native";

const VideoRecordProgress = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const window = Dimensions.get("window");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: window.width * 0.9,
      duration: 15000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <View
      style={{
        margin: 10,
        height: 7,
        width: "90%",
        alignItems: "center",
        borderRadius: 5,
        alignSelf: "center",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 5,
        }}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "grey",
            borderRadius: 5,
          }}
        />
        <Animated.View
          style={{
            height: "100%",
            width: fadeAnim,
            backgroundColor: "yellow",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopRightRadius: fadeAnim === window.width * 0.9 ? 5 : 0,
            borderBottomRightRadius: fadeAnim === window.width * 0.9 ? 5 : 0,
          }}
        />
        <View
          style={{
            position: "absolute",
            height: "100%",
            marginLeft: "50%",
          }}
        >
          <View
            style={{
              height: "100%",
              width: 5,
              backgroundColor: "black",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default VideoRecordProgress;
