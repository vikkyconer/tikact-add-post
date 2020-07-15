import React, { Component } from "react";

import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "../../src/navigation/MainScreen";

export default class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    );
  }
}
