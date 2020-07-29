import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextInput from "./TextInputModal";
import TextInputModal from "./TextInputModal";
import CaptionDisplay from "./CaptionDisplay";

const BottomBar = (props) => {
  const [enteredText, setEnteredText] = useState("");
  const [allowEnterText, setAllowEnterText] = useState(false);
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ alignItems: "center", paddingRight: 20 }}>
          <Ionicons
            name="musical-notes-outline"
            style={{ fontSize: 30, color: "white" }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Sounds</Text>
        </View>
        <View style={{ alignItems: "center", paddingRight: 20 }}>
          <Ionicons
            name="hand-left-outline"
            style={{ fontSize: 30, color: "white" }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Effects</Text>
        </View>
        <TouchableOpacity
          style={{ alignItems: "center", paddingRight: 20 }}
          onPress={() => setAllowEnterText(true)}
        >
          <Ionicons
            name="text-outline"
            style={{ fontSize: 30, color: "white" }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Texts</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", paddingRight: 20 }}>
          <Ionicons
            name="happy-outline"
            style={{ fontSize: 30, color: "white" }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>Stickers</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          borderRadius: 5,
          width: 80,
          height: 40,
          marginTop: 20,
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() =>
          props.navigation.navigate("PostScreen", { videoUri: props.videoUri })
        }
      >
        <Text style={{ color: "white" }}>Next</Text>
      </TouchableOpacity>
      {/* {allowEnterText ? (
        <TextInputModal
          enteredText={enteredText}
          setEnteredText={setEnteredText}
          setAllowEnterText={setAllowEnterText}
        />
      ) : null}
      {enteredText !== "" ? <CaptionDisplay enteredText={enteredText} /> : null} */}
    </View>
  );
};

export default BottomBar;
