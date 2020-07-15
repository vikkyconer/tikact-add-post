import React, { Component } from "react";
import { Text, View, Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../screens/Home";
import AddScreen from "../../screens/AddScreen";
import NotificationScreen from "../../screens/NotificationScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen";

const Tab = createBottomTabNavigator();

class BottomTab extends Component {
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#e91e63",
          showLabel: false,
          labelStyle: {
            fontSize: 12,
          },
          style: {
            backgroundColor: "black",
          },
        }}
      >
        <Tab.Screen
          name="Exit"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/icons/home.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({}) => (
              <Image
                source={require("../../assets/icons/discover.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarLabel: "Add",
            tabBarIcon: ({}) => (
              <View
                style={{
                  backgroundColor: "white",
                  width: 30,
                  height: 25,
                  borderWidth: 1,
                  borderRadius: 6,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {"+"}
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: "Notification",
            tabBarIcon: ({}) => (
              <Image
                source={require("../../assets/icons/message.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({}) => (
              <Image
                source={require("../../assets/icons/profile.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTab;
