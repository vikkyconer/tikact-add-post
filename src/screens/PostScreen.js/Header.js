import React from "react";
const { View, Text } = require("react-native");
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = (props) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Ionicons
          name="arrow-back-outline"
          color="black"
          size={25}
          onPress={() => props.navigation.goBack()}
        />
        <Text
          style={{
            alignSelf: "center",
            position: "absolute",
            left: "42%",
            fontSize: 30,
          }}
        >
          Post
        </Text>
      </View>
      <View
        style={{
          marginTop: 5,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

export default Header;
