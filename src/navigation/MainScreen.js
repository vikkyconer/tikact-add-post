import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTab from "../components/BottomTab";
import VideoPreview from "../components/VideoPreview";
import LocalFiles from "../components/LocalFiles";

const Stack = createStackNavigator();

export default function MainScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LocalFiles"
        component={LocalFiles}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoPreview"
        component={VideoPreview}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
