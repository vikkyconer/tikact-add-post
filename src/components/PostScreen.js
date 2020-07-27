import React from "react";
import Header from "../screens/PostScreen.js/Header";
import Body from "../screens/PostScreen.js/Body";
const { View, StatusBar } = require("react-native");

const PostScreen = (props) => {
  const { videoUri } = props.route.params;
  return (
    <View>
      <StatusBar hidden={false} />
      <Header navigation={props.navigation} />
      <Body videoUri={videoUri} navigation={props.navigation} />
    </View>
  );
};

export default PostScreen;
