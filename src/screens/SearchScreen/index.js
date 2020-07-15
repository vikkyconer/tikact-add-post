import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
  PermissionsAndroid,
  Image,
  Platform,
  ActivityIndicator,
  Picker,
  SafeAreaView,
} from "react-native";

class SearchScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{"Hello SeARCH.....!"}</Text>
      </View>
    );
  }
}

export default SearchScreen;
