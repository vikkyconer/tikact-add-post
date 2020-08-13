import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const DEFAULT_WINDOW_WIDTH = 414;
export default getFontSize = (fontSize) => {
  const scale = windowWidth / DEFAULT_WINDOW_WIDTH;
  if(scale > 1){
    return fontSize
  }
  return fontSize * scale;
};
