import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "./navigation/MainScreen";

const Index = () => {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
};

export default Index;
