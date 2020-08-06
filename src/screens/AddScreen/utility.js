var RNFS = require("react-native-fs");
var Sound = require("react-native-sound");

export const getVideoSpeed = (currentSpeed) => {
  switch (currentSpeed) {
    case 0.3:
      return 3;
    case 0.5:
      return 2;
    case 1:
      return 1;
    case 2:
      return 0.5;
    case 3:
      return 0.3;
    default:
      return 1;
  }
};

export const getAudioSpeed = (currentSpeed) => {
  switch (currentSpeed) {
    case 0.3:
      return "atempo=0.5,atempo=0.5";
    case 0.5:
      return "atempo=0.5";
    case 1:
      return "atempo=1.0";
    case 2:
      return "atempo=2.0";
    case 3:
      return "atempo=1.5,atempo=1.5";
    default:
      return "atempo=1.0";
  }
};

export const getPath = async (videoPath) => {
  const splitPath = videoPath.split("/");
  const fileName = splitPath[splitPath.length - 1];
  const fileNameWithoutExtension = fileName.split(".")[0];
  console.log("fileNameWithoutExtension: ", fileNameWithoutExtension);
  const path = `${RNFS.DocumentDirectoryPath}/${fileNameWithoutExtension}/processedVideo/`;
  const exist = await RNFS.exists(path);
  console.log("exist: ", exist);
  if (exist) {
    await RNFS.unlink(path);
  }
  const result = await RNFS.mkdir(path);
  return path;
};

export const promisify = (url) => {
  return new Promise((resolve, reject) => {
    const sound = new Sound(url, null, (error) => {
      if (error) {
        console.log("error: ", error);
      }
      resolve(sound);
    });
  });
};
