import React from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";

const DiscardClipModal = (props) => {
  const discardClip = () => {
    props.setVideoUris([]);
    props.setRecording(false);
    props.setRecorded(false);
    props.setShowDiscardModal(false);
  };
  return (
    <View>
      <Modal animationType="slide" transparent={true}>
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            width: "90%",
            height: 100,
            marginTop: 340,
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 5,
            padding: 20,
          }}
        >
          <View style={{ width: "100%", height: "80%", paddingHorizontal: 15 }}>
            <Text style={{ color: "grey", fontSize: 15 }}>
              Discard the last clip?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{ marginHorizontal: 30 }}
              onPress={() => props.setShowDiscardModal(false)}
            >
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: 15 }}
              onPress={discardClip}
            >
              <Text>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DiscardClipModal;
