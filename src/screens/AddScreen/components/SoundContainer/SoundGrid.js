import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
var Sound = require("react-native-sound");

const SoundGrid = () => {
  const [sounds, setSounds] = useState([]);
  const [activeSound, setActiveSound] = useState(null);

  useEffect(() => {
    getSounds();
  }, []);

  const promisify = (url) => {
    return new Promise((resolve, reject) => {
      const sound = new Sound(url, null, (error) => {
        if (error) {
          console.log("error: ", error);
        }
        resolve(sound);
      });
    });
  };

  const playSound = async (_activeSound) => {
    console.log("playSound");
    const sound = await promisify(_activeSound.url);
    console.log("sound fetched");
    setActiveSound({ ..._activeSound, loader: false });
    sound.play();
  };

  const getSounds = () => {
    setSounds([
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
      },
    ]);
  };

  return (
    <FlatList
      style={{ padding: 10 }}
      data={sounds}
      renderItem={({ item, index }) => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 1,
              backgroundColor: "black",
              height: 150,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            {activeSound && activeSound.index === index ? (
              activeSound.loader ? (
                <ActivityIndicator
                  style={{ position: "absolute", top: "45%" }}
                  color="#00ff00"
                />
              ) : (
                <Ionicons
                  name="pause-circle-outline"
                  color="white"
                  size={40}
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: "40%",
                  }}
                  onPress={() => {
                    setActiveSound(null);
                  }}
                />
              )
            ) : (
              <Ionicons
                name="play-circle-outline"
                color="white"
                size={40}
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  top: "40%",
                }}
                onPress={() => {
                  playSound({ index, url: item.url, loader: true });
                  setActiveSound({ index, url: item.url, loader: true });
                }}
              />
            )}

            <Text style={{ color: "white", fontSize: 20 }}>{item.name}</Text>
          </View>
        );
      }}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default SoundGrid;
