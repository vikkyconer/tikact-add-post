import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
  Picker,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

import getFontSize from "../../../utils";

const FollowButton = ({ isFollowing = false }) => (
  <TouchableOpacity
    onPress={() => {}}
    style={{
      width: 90,
      height: 28,
      backgroundColor: isFollowing ? "white" : "#5395EA",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: isFollowing ? StyleSheet.hairlineWidth : 0,
    }}
  >
    <Text
      style={{
        color: isFollowing ? "black" : "white",
        fontSize: getFontSize(16),
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </Text>
  </TouchableOpacity>
);

const Follower = ({item}) => (
  <View
    style={{
      flexDirection: "row",
      paddingHorizontal: 15,
      alignItems: "center",
    }}
  >
    <Image
      key={item.id}
      source={{ uri: item.url }}
      style={{ width: 50, height: 50, borderRadius: 25 }}
      defaultSource={require("../../../assets/defaultImage.png")}
    />
    <View
      style={{
        flexDirection: "row",
        flexBasis: 150,
        flexGrow: 1,
        marginHorizontal: 15,
        flexWrap: "wrap",
      }}
    >
      <Text
        style={{
          fontSize: getFontSize(16),
          color: "#313131",
          marginRight: 5,
          fontFamily: "Roboto-Medium",
        }}
      >
        {item.name}
      </Text>

      <Text
        style={{
          fontSize: getFontSize(16),
          color: "#B7B8B9",
          fontFamily: "Roboto-Regular",
          marginRight: 3,
        }}
      >
        started following you.
      </Text>
      <Text
        style={{
          fontSize: getFontSize(16),
          color: "#99999C",
          fontFamily: "Roboto-Regular",
        }}
      >
        47m
      </Text>
    </View>
    <FollowButton isFollowing={item.isFollowing} />
  </View>
);

export default Follower;
