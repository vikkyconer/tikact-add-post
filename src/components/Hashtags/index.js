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
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import getFontSize from '../../utils';
import { fetchHashTag, fetchHashTagVideos } from '../../services/apiHandler';

const Divider = () => (
  <View
    style={{
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

const AddtoFavourites = () => (
  <TouchableOpacity
    onPress={() => {}}
    style={{
      flexDirection: 'row',
      backgroundColor: '#5396EB',
      // marginLeft: Platform.OS === "android" ? 20 : 55,
      padding: 10,
      //   marginTop: 10,
      alignItems: 'center',
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
        fontSize: getFontSize(12),
      }}
    >
      Add to favorites
    </Text>
  </TouchableOpacity>
);

const HashtagDetails = ({ route: { params } }) => {
  const [hashtag, setHashtag] = useState({});
  const [hashtagVideos, setHashtagVideos] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getHashTags = async () => {
        const response = await fetchHashTag(params.hashtagId);
        setHashtag(response.data.result ? response.data.result : {});
      };
      const getHashTagVideos = async () => {
        const response = await fetchHashTagVideos(params.hashtagId);
        setHashtagVideos(response.data.result ? response.data.result : []);
      };
      getHashTagVideos();
      getHashTags();
    }, [])
  );
  if (!hashtagVideos.length) {
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
  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      onPress={() => console.log('video pressed')}
      style={{ marginLeft: 1.5 }}
    >
      <Image
        key={item.id}
        source={{ uri: item.videoUrl }}
        style={{ width, height }}
        defaultSource={require('../../assets/defaultImage.png')}
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <Divider />

      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: getFontSize(90),
            color: 'lightgrey',
            fontFamily: 'Roboto-Medium',
            marginRight: 20,
          }}
        >
          #
        </Text>
        <View
          style={{
            flexBasis: 100,
            flexGrow: 1,
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(18),
              color: '#313131',
              fontFamily: 'Roboto-Medium',
            }}
          >
            #tikact_india
          </Text>
          <Text
            style={{
              fontSize: getFontSize(14),
              color: '#B7B8B9',
              marginLeft: 5,
              fontFamily: 'Roboto-Medium',
            }}
          >
            1234 videos
          </Text>
        </View>
        <AddtoFavourites />
      </View>

      <Divider />
      <FlatList
        numColumns={3}
        // bounces={false}
        // pagingEnabled={true}
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // legacyImplementation={false}
        data={hashtagVideos}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        ListHeaderComponent={() => <View style={{ paddingTop: 10 }} />}
        ListFooterComponent={() => <View style={{ height: 2 }} />}
        renderItem={(item) => renderPhoto(item)}
        keyExtractor={(photo, index) => String(index)}
      />
    </SafeAreaView>
  );
};

export default HashtagDetails;
