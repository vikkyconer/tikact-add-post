import React from 'react';
import {View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Feather from 'react-native-vector-icons/Feather';
import {RecordButton} from './styles';

const uploadIcon = require('../../assets/icons/upload.png');
const cameraFlipIcon = require('../../assets/icons/camera-flip.png');

const AddScreen = () => {
  let camera = null;
  const icon = <Feather name="x" color="white" size={30} />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <RNCamera
        ref={(ref) => {
          camera = ref;
        }}
        captureAudio={false}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <View style={{margin: 10}}>{icon}</View>
        <View
          style={{
            marginTop: 550,
            backgroundColor: 'black',
            flex: 1,
            justifyContent: 'flex-end',
            opacity: 0.3,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <Image
              source={uploadIcon}
              style={{
                padding: 10,
                width: 40,
                height: 40,
                bottom: 5,
                marginTop: 40,
              }}
            />
            <RecordButton />
            <Image
              source={cameraFlipIcon}
              style={{
                padding: 10,
                width: 40,
                height: 40,
                bottom: 5,
                marginTop: 40,
              }}
            />
          </View>
          <View></View>
        </View>
      </RNCamera>
    </View>
  );
};

export default AddScreen;
