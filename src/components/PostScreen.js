import React from "react";
import Header from "../screens/PostScreen.js/Header";
import Body from "../screens/PostScreen.js/Body";
const { View, StatusBar } = require("react-native");

const PostScreen = (props) => {
  const { selectedVideo } = props.route.params;
  return (
    <View>
      <StatusBar hidden={false} />
      <Header navigation={props.navigation} />
      <Body selectedVideo={selectedVideo} />
    </View>
  );
};

export default PostScreen;
