import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const VideoDescription = () => {
  const [tags, setTags] = useState(["Hashtags", "friends"]);
  const renderTags = () => {
    return tags.map((tag, index) => {
      return (
        <Text
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "grey",
            padding: 8,
            color: "grey",
          }}
        >
          #{tag}
        </Text>
      );
    });
  };
  return (
    <View style={{ width: "65%" }}>
      <TextInput
        placeholder="Video description"
        multiline={true}
        numberOfLines={7}
      ></TextInput>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {renderTags()}
        </View>
      </View>
    </View>
  );
};

export default VideoDescription;
