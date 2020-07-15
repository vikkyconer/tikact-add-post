import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import "react-native-gesture-handler";

import BottomTab from "../components/BottomTab";

const MScreens = createStackNavigator();

export default function MainScreen() {
  return (
    <MScreens.Navigator>
      <MScreens.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: false,
          //headerTintColor: '#000'
        }}
      />
    </MScreens.Navigator>
  );
}
