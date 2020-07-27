import React from "react";
import { View, Text } from "react-native";
import VideoThumbnail from "./VideoThumbnail";
import VideoDescription from "./VideoDescription";
import HorizontalLine from "./HorizontalLine";
import ListTile from "./ListTile";
import Feather from "react-native-vector-icons/Feather";
import CustomButton from "./CustomButton";

const Body = (props) => {
  const unlockIcon = (
    <Feather name="unlock" color="grey" size={20} style={{ marginRight: 10 }} />
  );
  const commentsIcon = (
    <Feather
      name="message-square"
      color="grey"
      size={20}
      style={{ marginRight: 10 }}
    />
  );
  const duetIcon = (
    <Feather name="link" color="grey" size={20} style={{ marginRight: 10 }} />
  );
  const downloadIcon = (
    <Feather
      name="download"
      color="grey"
      size={20}
      style={{ marginRight: 10 }}
    />
  );
  const saveIcon = (
    <Feather name="save" color="grey" size={20} style={{ marginRight: 10 }} />
  );
  const draftIcon = (
    <Feather name="folder" color="grey" size={20} style={{ marginRight: 10 }} />
  );

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "white",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <VideoThumbnail videoUri={props.videoUri} />
        <VideoDescription />
      </View>
      <HorizontalLine />
      <ListTile icon={unlockIcon} title="Video visibility" />
      <HorizontalLine />
      <ListTile icon={commentsIcon} title="Allow comments" switch={true} />
      <ListTile icon={duetIcon} title="Allow duets" switch={true} />
      <ListTile icon={downloadIcon} title="Allow downloads" switch={true} />
      <HorizontalLine />
      <ListTile icon={saveIcon} title="Save to drive" switch={true} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 60,
        }}
      >
        <CustomButton
          title="Save to draft"
          filled={false}
          icon={draftIcon}
          navigation={props.navigation}
        />
        <CustomButton
          title="Post"
          filled={true}
          navigation={props.navigation}
        />
      </View>
    </View>
  );
};

export default Body;
