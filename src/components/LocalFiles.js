import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import LocalVideos from "../screens/LocalFilesScreen/LocalVideos";
import LocalImages from "../screens/LocalFilesScreen/LocalImages";

const Tab = createMaterialTopTabNavigator();

const LocalFiles = (props) => {
  useEffect(() => {}, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar hidden={false} />
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 5,
          width: "100%",
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          color="black"
          size={20}
          style={{ position: "absolute" }}
          onPress={() => props.navigation.goBack()}
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
        {/* <Tab.Screen
          name="Images"
          component={LocalImages}
          options={{ tabBarLabel: "Images" }}
        /> */}
      </Tab.Navigator>
    </View>
  );
};

export default LocalFiles;
