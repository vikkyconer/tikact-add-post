import React from "react";
import { View, Text } from "react-native";
import { style } from "../styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LocalVideos from "./LocalVideos";
import LocalImages from "./LocalImages";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();

const LocalFiles = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginVertical: 30,
          marginHorizontal: 5,
          width: "100%",
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          color="black"
          size={20}
          style={{ position: "absolute" }}
          onPress={() => props.setScreen(0)}
        />
        <Text style={{ alignSelf: "center" }}>All Videos</Text>
      </View>

      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "black",
          showLabel: true,
          labelStyle: {
            fontSize: 12,
          },
          style: {
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Videos"
          component={LocalVideos}
          options={{ tabBarLabel: "Videos" }}
        />
        <Tab.Screen
          name="Images"
          component={LocalImages}
          options={{ tabBarLabel: "Images" }}
        />
      </Tab.Navigator>      
    </View>
  );
};

export default LocalFiles;
