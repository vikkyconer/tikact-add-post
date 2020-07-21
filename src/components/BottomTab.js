import React from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import AddScreen from "../screens/AddScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import { Image } from "react-native";

const homeIcon = require("../assets/icons/home.png");
const searchIcon = require("../assets/icons/discover.png");
const addIcon = require("../assets/icons/plus-circle.png");
const notificationIcon = require("../assets/icons/heart.png");
const profileIcon = require("../assets/icons/profile.png");

const Tab = createBottomTabNavigator();

const Index = () => {
  const tabBarOptions = {
    activeTintColor: "#e91e63",
    showLabel: false,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: "white",
    },
  };

  const tabScreenOption = (name, icon) => {
    return {
      tabBarLabel: name,
      tabBarIcon: ({ color, size }) => (
        <Image source={icon} style={{ width: 30, height: 30 }} />
      ),
    };
  };

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => tabScreenOption("Home", homeIcon)}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={() => tabScreenOption("Search", searchIcon)}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={() => {
          return { ...tabScreenOption("Add", addIcon), tabBarVisible: false };
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={() => tabScreenOption("Notification", notificationIcon)}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => tabScreenOption("Profile", profileIcon)}
      />
    </Tab.Navigator>
  );
};

export default Index;
