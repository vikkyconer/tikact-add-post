var RNFS = require("react-native-fs");

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
