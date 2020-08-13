import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AudioPlayer from './Audioplayer';
import getFontSize from '../../utils';
import { fetchSound, fetchSoundVideos } from '../../services/apiHandler';

const Divider = () => (
  <View
    style={{
      // borderStyle: "solid",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#E2E2E2',
      marginHorizontal: 26,
    }}
  />
);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const heightOffset = Platform.OS === 'ios' ? 100 : 30;
const height = windowHeight / 3 - heightOffset;
const width = windowWidth / 3 - 2;

const SoundDetail = ({ route: { params } }) => {
  const [sound, setSound] = useState({});
  const [soundVideos, setSoundVideos] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getSound = async () => {
        const response = await fetchSound(params.soundId);
        setSound(response.data.result);
      };
      const getSoundVideos = async () => {
        const response = await fetchSoundVideos();
        setSoundVideos(response.data.result);
      };
      getSoundVideos();
      getSound();
    }, [])
  );
  if (!sound.sound) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator color="grey" size="large" />
      </View>
    );
  }
  const renderPhoto = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => console.log('video pressed')}
      style={{ marginLeft: 1.5 }}
    >
      <Image
        key={item.id}
        source={{ uri: item.videoUrl }}
        style={{ width, height }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 5,
          left: 5,
          flexDirection: 'row',
        }}
      >
        <FontAwesome5
          name="play"
          size={getFontSize(14)}
          style={{
            color: '#FFFFFF',
            marginRight: 5,
          }}
        />
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'Roboto-Medium',
            fontSize: getFontSize(14),
          }}
        >
          {item.viewCount}
        </Text>
      </View>
      {index === 0 && (
      <View
        style={{
          position: 'absolute',
          top: 5,
          left: 10,
          paddingVertical: 5,
          transform: [{ skewX: '-20deg' }],
          backgroundColor: 'rgba(0, 0, 0, 0.46)',
          paddingHorizontal: 15,
        }}
      >
        <Text style={{ color: 'white', transform: [{ skewX: '20deg' }] }}>
          Original
        </Text>
      </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row' }}
      >
        <Image
          source={{
            uri: sound.sound.coverUrl,
          }}
          defaultSource={require('../../assets/defaultImage.png')}
          style={{
            width: windowWidth / 4, height: windowWidth / 4, borderRadius: 15, marginRight: 15
          }}
        />
        <View>
          <Text
            style={{
              fontSize: getFontSize(21),
              color: '#313131',
              fontFamily: 'Roboto-Medium',
            }}
          >
            {sound.sound.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}
          >
            <View style={{ flexBasis: windowWidth / 3, flexGrow: 1 }}>
              <Text
                style={{
                  fontSize: getFontSize(19),
                  color: '#313131',
                  fontFamily: 'Roboto-Regular',
                  marginBottom: 8,
                }}
              >
                {sound.author.name}
              </Text>
              <Text
                style={{
                  fontSize: getFontSize(17),
                  color: '#B7B8B9',
                  fontFamily: 'Roboto-Regular',
                }}
              >
                {sound.sound.postsCount}
                {' '}
                videos
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#5396EB',
                  // marginLeft: Platform.OS === "android" ? 15 : 55,
                  alignItems: 'center',
                  padding: 8,
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="bookmark"
                  size={getFontSize(18)}
                  style={{ color: 'white' }}
                />
                <Text
                  style={{
                    color: 'white',
                    marginLeft: 10,
                    fontWeight: '500',
                    fontSize: getFontSize(11),
                  }}
                >
                  Add to favorites
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          marginBottom: 10,
          marginLeft: 5,
          alignItems: 'center',
        }}
      >
        <AudioPlayer uri={sound.sound.soundUrl} />
      </View>

      <Divider />
      <FlatList
        numColumns={3}
        // bounces={false}
        // pagingEnabled={true}
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // legacyImplementation={false}
        data={soundVideos}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        ListHeaderComponent={() => <View style={{ paddingTop: 20 }} />}
        ListFooterComponent={() => <View style={{ height: 2 }} />}
        renderItem={(item) => renderPhoto(item)}
        keyExtractor={(photo, index) => String(index)}
      />
    </SafeAreaView>
  );
};

export default SoundDetail;
