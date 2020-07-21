import React from "react";
import { View, StatusBar, Text } from "react-native";
import { RNCamera } from "react-native-camera";
import VideoOtherOptions from "./VideoOtherOptions";
import BottomContainer from "./BottomContainer";

const CameraScreen = (props) => {
  return (
    <View>
      <View>
        <StatusBar hidden={true} />
      </View>
      <RNCamera
        ref={(ref) => {
          setCamera(ref);
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
        {!recording && !showTimer ? (
          <VideoOtherOptions
            crossIcon={crossIcon}
            flashCamera={flashCamera}
            flashIcon={flashIcon}
            currentTimer={currentTimer}
            setCurrentTimer={setCurrentTimer}
            setTimerValue={setTimerValue}
          />
        ) : null}

        <View style={style.timer} />
        {showTimer ? <Text style={style.timerValue}>{timerValue}</Text> : null}
        <BottomContainer
          recordVideo={recordVideo}
          stopRecording={stopRecording}
          recording={recording}
          showTimer={showTimer}
          cameraSide={cameraSide}
          setCameraSide={setCameraSide}
        />
      </RNCamera>
    </View>
  );
};

export default CameraScreen;
