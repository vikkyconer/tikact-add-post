import React from "react";
import Header from "../screens/PostScreen.js/Header";
const { View, StatusBar } = require("react-native");

const PostScreen = (props) => {
  return (
    <View>
      <StatusBar hidden={false} />
      <Header navigation={props.navigation} />
    </View>
  );
};

export default PostScreen;
