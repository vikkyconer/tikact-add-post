import React, { useState } from "react";
import { View, Modal, Text, TextInput } from "react-native";

const TextInputModal = (props) => {
  const [_enteredText, _setEnteredText] = useState(props.enteredText);
  return (
    <View>
      <Modal animationType="slide" transparent={true}>
        <View
          style={{
            position: "absolute",
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
            <TextInput
              maxLength={40}
              style={{ fontSize: 30, fontWeight: "bold", color: "blue" }}
              placeholder="Enter Caption"
              value={_enteredText}
              onChange={(val) => _setEnteredText(val)}
              onEndEditing={() => {}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TextInputModal;
