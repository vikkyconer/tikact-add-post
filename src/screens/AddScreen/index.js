import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Icon, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

function AddScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [recording, setRecording] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [ratio, setRatio] = useState("16:9");

  useEffect(() => {
    getCameraPermissions();
    getAspectRation();
  }, []);

  const getAspectRation = async () => {
    // const ratios = await Camera.getSupportedRatiosAsync();
  };

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        autoFocus={true}
        whiteBalance={"auto"}
        ratio={ratio}
        maxDuration={10}
        ref={(ref) => setCameraRef(ref)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons name={"md-reverse-camera"} size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={async () => {
                if (!recording) {
                  setRecording(true);
                  let video = await cameraRef.recordAsync();
                  console.log("video", video);
                } else {
                  setRecording(false);
                  cameraRef.stopRecording();
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "red",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: recording ? "blue" : "red",
                    height: 40,
                    width: 40,
                    backgroundColor: recording ? "blue" : "red",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

export default AddScreen;
