import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTab from "../components/BottomTab";
import VideoPreview from "../components/VideoPreview";
import LocalFiles from "../components/LocalFiles";
import PostScreen from "../components/PostScreen";
import AudioScreen from "../components/AudioScreen";
import RecordAudio from "../components/RecordAudio";
import RecordedVideoPreview from "../components/RecordedVideoPreview";
import SoundsDetail from "../components/Sounds";
import HashtagsDetails from "../components/Hashtags";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import getFontSize from "../utils.js";

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
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AudioScreen"
        component={AudioScreen}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecordAudio"
        component={RecordAudio}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecordedVideoPreview"
        component={RecordedVideoPreview}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="SoundsDetail"
        component={SoundsDetail}
        options={({ navigation }) => ({
          title: "Sound track",
          headerTitleStyle: {
            fontSize: getFontSize(22),
            color: "#313131",
            fontFamily: "Roboto-Medium",
            alignSelf: "center",
            marginRight: 40,
          },
          headerLeft: () => (
            <FontAwesome5
              onPress={() => navigation.pop()}
              name="chevron-left"
              size={getFontSize(26)}
              style={{
                paddingHorizontal: 20,
                color: "#616161",
              }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="HashtagDetail"
        component={HashtagsDetails}
        options={({ navigation }) => ({
          title: "#hashtags",
          headerTitleStyle: {
            fontSize: getFontSize(22),
            color: "#313131",
            fontFamily: "Roboto-Medium",
            alignSelf: "center",
            marginRight: 40,
          },
          headerLeft: () => (
            <FontAwesome5
              onPress={() => navigation.pop()}
              name="chevron-left"
              size={getFontSize(26)}
              style={{
                paddingHorizontal: 20,
                color: "#616161",
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
