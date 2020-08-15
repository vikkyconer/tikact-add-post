import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import getFontSize from "../../../utils";
import { normalize } from "../../../styles/normalize";

const Like = ({ item }) => {
  const likes = item.likes;
  const nameArray = likes.map((obj) => obj.name);
  const name = nameArray.join(", ");
  const firstTwo = likes.slice(0, 2);
  const imageSize = firstTwo.length === 2 ? normalize(39) : normalize(51);
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: normalize(15),
        alignItems: "center",
      }}
    >
      {firstTwo.map((obj, index) => {
        const imageStyle =
          index === 1
            ? {
              marginTop: normalize(22),
              marginLeft: normalize(-29),
              borderWidth: 2,
              borderColor: "white",
              width: imageSize + 2,
              height: imageSize + 2,
              borderRadius: (imageSize + 2) / 2,
            }
            : {
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
              // borderWidth: StyleSheet.hairlineWidth,
              // borderColor: "#B6B7B8",
            };
        return (
          <Image
            key={obj.id}
            source={{ uri: obj.url }}
            style={imageStyle}
            defaultSource={require("../../../assets/defaultImage.png")}
          />
        );
      })}
      <View
        style={{
          flexDirection: "row",
          flexBasis: 180,
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
          {name}{" "}
          <Text
            style={{
              fontSize: getFontSize(16),
              color: "#99999C",
              fontFamily: "Roboto-Regular",
              marginRight: normalize(5),
            }}
          >
            liked your video.
          </Text>
          <Text
            style={{
              fontSize: getFontSize(15),
              color: "#B7B8B9",
              fontFamily: "Roboto-Regular",
            }}
          >
            47m
          </Text>
        </Text>
      </View>
      <Image
        key={item.id + 1}
        source={{ uri: item.likedPhoto }}
        style={{ width: normalize(45), height: normalize(45) }}
        defaultSource={require("../../../assets/defaultImage.png")}
      />
    </View>
  );
};

export default Like;
