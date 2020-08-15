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
import { normalize } from "../../../styles/normalize";

const FollowButton = ({ isFollowing = false }) => (
  <TouchableOpacity
    onPress={() => { }}
    style={{
      width: normalize(85),
      height: normalize(28),
      backgroundColor: isFollowing ? "white" : "#5395EA",
      borderRadius: normalize(5),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: isFollowing ? StyleSheet.hairlineWidth : 0,
    }}
  >
    <Text
      style={{
        color: isFollowing ? "black" : "white",
        fontSize: getFontSize(15),
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </Text>
  </TouchableOpacity>
);

const Follower = ({ item }) => (
  <View
    style={{
      flexDirection: "row",
      paddingHorizontal: normalize(15),
      alignItems: "center",
    }}
  >
    <Image
      key={item.id}
      source={{ uri: item.url }}
      style={{ width: normalize(50), height: normalize(50), borderRadius: normalize(50 / 2) }}
      defaultSource={require("../../../assets/defaultImage.png")}
    />
    <View
      style={{
        flexDirection: "row",
        flexBasis: 150,
        flexGrow: 1,
        marginHorizontal: normalize(10),
        flexWrap: "wrap",
      }}
    >
      <Text
        style={{
          fontSize: getFontSize(16),
          color: "#313131",
          marginRight: normalize(5),
          fontFamily: "Roboto-Medium",
        }}
      >
        {item.name}
        <Text
          style={{
            fontSize: getFontSize(16),
            color: "#99999C",
            fontFamily: "Roboto-Regular",
            marginRight: normalize(3),
          }}
        >{' '}started following you.{' '}
        </Text>
        <Text
          style={{
            fontSize: getFontSize(16),
            color: "#B7B8B9",
            fontFamily: "Roboto-Regular",
          }}
        >
          47m
      </Text>
      </Text>
    </View>
    <FollowButton isFollowing={item.isFollowing} />
  </View>
);

export default Follower;
