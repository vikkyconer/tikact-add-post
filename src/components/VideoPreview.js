import React, { useState, useEffect } from "react";
import { View, Text, Button, Dimensions, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { getIcon } from "../utility";
import { style } from "../screens/AddScreen/styles";
import Video from "react-native-video";
import { speeds } from "../screens/AddScreen/constants";
import VideoFrames from "../screens/VideoPreview/VideoFrames";

const VideoPreview = (props) => {
  const { videoUri, totalVideoDuration } = props.route.params;

  const [videoPlayer, setVideoPlayer] = useState(null);
  const [paused, setPaused] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [showSpeeds, setShowSpeeds] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);

  const getMultipleOptions = (arr, unit, currentValue) => {
    return arr.map((data, key) => {
      return (
        <View key={key}>
          {currentValue === data ? (
            <TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 27,
                  backgroundColor: "white",
                }}
              >
                <Text>
                  {data} {unit}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setCurrentSpeed(data);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 27,
                }}
              >
                <View style={style.background} />
                <Text style={{ color: "white" }}>
                  {data} {unit}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  const window = Dimensions.get("window");
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={{ height: window.height, width: window.width }}>
        <Video
          ref={(ref) => setVideoPlayer(ref)}
          pictureInPicture={true}
          fullscreen={true}
          volume={0}
          rate={currentSpeed}
          filter={"CIPhotoEffectInstant"}
          muted={false}
          seek={videoStartTime}
          filterEnabled={true}
          onProgress={({ currentTime }) => {
            const _currentPosition = (currentTime / totalVideoDuration) * 100;
            setCurrentPosition(_currentPosition);
          }}
          repeat={true}
          paused={paused}
          resizeMode={"cover"}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            transform: [{ rotate: `${rotation}deg` }],
          }}
          source={{ uri: videoUri }}
        />
        {paused ? (
          <Ionicons
            name="play-circle-outline"
            color="white"
            size={80}
            style={{ position: "absolute", alignSelf: "center", top: "40%" }}
            onPress={() => {
              setPaused(false);
            }}
          />
        ) : (
          <Ionicons
            name="pause-circle-outline"
            color="white"
            size={80}
            style={{ position: "absolute", alignSelf: "center", top: "40%" }}
            onPress={() => {
              setPaused(true);
            }}
          />
        )}
      </View>
      <View
        style={[
          {
            position: "absolute",
            width: "100%",
            alignSelf: "flex-end",
            marginTop: 20,
            justifyContent: "space-between",
            flexDirection: "row",
            left: 10,
          },
        ]}
      >
        <Ionicons
          name="arrow-back-outline"
          color="white"
          size={20}
          onPress={() => props.navigation.goBack(null)}
        />
        <View style={{ width: 80, marginRight: 10, paddingRight: 10 }}>
          <Button
            title="Next"
            onPress={() =>
              props.navigation.navigate("PostScreen", { videoUri })
            }
          />
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          flex: 1,
          bottom: 0,
          left: 0,
          right: 0,
          height: 220,
          padding: 10,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 70,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "black",
            opacity: 0.3,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: window.width,
            top: 0,
            right: 0,
            left: 0,
            height: 50,
            paddingHorizontal: 20,
            flexDirection: "row",
          }}
        >
          {showSpeeds ? getMultipleOptions(speeds, "x", currentSpeed) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 70,
          }}
        >
          <Text style={{ color: "white" }}>59.0s selected</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="speedometer-outline"
              color="white"
              size={30}
              onPress={() => setShowSpeeds(!showSpeeds)}
            />

            <Feather
              name="rotate-ccw"
              color="white"
              size={30}
              style={{ marginHorizontal: 20 }}
              onPress={() => setRotation(rotation + 90)}
            />
          </View>
        </View>

        <VideoFrames
          uri={videoUri}
          currentPosition={currentPosition}
          length={totalVideoDuration}
          setVideoStartTime={setVideoStartTime}
        />
      </View>
    </View>
  );
};

export default VideoPreview;
