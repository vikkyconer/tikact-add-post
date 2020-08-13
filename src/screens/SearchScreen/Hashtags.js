import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import getFontSize from '../../utils';
import { fetchHashTags } from '../../services/apiHandler';

const PlayImage = () => (
  <Image
    style={{
      width: 20,
      height: 20,
      marginRight: 5,
    }}
    source={{
      uri:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAA2klEQVRYhe3WsWpCMRSA4U9FBIeCi4NThz6Bo1tH6eziA/QVfAEHX6Gv4NKxY9/AsUuXdnXoUCgUkepgLtxFuNCaY+X+S0hyQn5IzkmoqfknzNGJFNjhBaNIgR1+8ICrKIHv1L7jLkLgBs+l/hL9nALQwD0+09hH6jdyCRQM8Fiae8J1ToGCCdZp/gsztHIKQM8hO4q4FYY5BQrGeEuxGyz8UQGrKgDdtPE2rXnF7bHg5q/VMnH2RxB6CcPSMKwQhZbi8Mco/DkO/ZCc5EtWNV3amDoUmZqay2IPMYRg6Ys7oGQAAAAASUVORK5CYII=',
    }}
  />
);
// const hashtags = [
//   {
//     id: 1,
//     name: "toptikindia",
//     postCount: "1.2m",
//     playCount: "54.4M",
//   },
//   {
//     id: 2,
//     name: "music",
//     postCount: "1.2m",
//     playCount: "54.4M",
//   },

//   {
//     id: 3,
//     name: "streetstyle",
//     postCount: "1.2m",
//     playCount: "54.4M",
//   },
//   {
//     id: 4,
//     name: "dress",
//     postCount: "1.2m",
//     playCount: "54.4M",
//   },
//   {
//     id: 5,
//     name: "toptik",
//     postCount: "1.2m",
//     playCount: "54.4M",
//   },
//   {
//     id: 6,
//     name: "summer",
//     postCount: "1.2m",
//     playCount: "54.4M",
//   },
//   {
//     id: 7,
//     name: "stylish",
//     postCount: "1.2m",
//     playCount: "54.4M",
//   },

//   {
//     id: 8,
//     name: "summer",
//     postCount: "1.2M",
//     playCount: "54.4M",
//   },
//   {
//     id: 9,
//     name: "summer",
//     postCount: "1.2M",
//     playCount: "54.4M",
//   },
//   {
//     id: 10,
//     name: "night",
//     postCount: "1.2M",
//     playCount: "54.4M",
//   },
//   {
//     id: 11,
//     name: "night",
//     postCount: "1.2M",
//     playCount: "54.4M",
//   },
//   {
//     id: 12,
//     name: "night",
//     postCount: "1.2M",
//     playCount: "54.4M",
//   },
//   {
//     id: 13,
//     name: "last hashtag",
//     postCount: "1.2M",
//     playCount: "54.4M",
//   },
// ];
const Hashtag = ({ navigation }) => {
  const [hashtags, setHashtags] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getHashTags = async () => {
        const response = await fetchHashTags();
        setHashtags(response.data.result);
      };
      getHashTags();
    }, [])
  );
  if (!hashtags.length) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size="large"
        color="grey"
      />
    );
  }
  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('HashtagDetail', { hashtagId: item.id })}
      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontSize: getFontSize(25),
            marginRight: 15,
          }}
        >
          #
        </Text>
        <View>
          <Text
            style={{
              fontSize: getFontSize(18),
              color: '#313131',
              fontFamily: 'Roboto-Regular',
            }}
          >
            {item.hashtag}
          </Text>
          <Text
            style={{
              fontSize: getFontSize(14),
              color: '#B7B8B9',
              fontFamily: 'Roboto-Regular',
              lineHeight: 25,
            }}
          >
            {item.postsCount || 12}
            m posts
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // alignSelf: "center",
        }}
      >
        <PlayImage />
        <Text
          style={{
            fontSize: getFontSize(14),
            color: '#99999C',
            fontFamily: 'Roboto-Regular',
          }}
        >
          {item.viewCount}
          M
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={hashtags}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      ListHeaderComponent={() => <View style={{ height: 20 }} />}
      ListFooterComponent={() => <View style={{ height: 20 }} />}
      renderItem={(item) => renderPhoto(item)}
      keyExtractor={(photo, index) => String(photo.id) + index}
      style={{ paddingHorizontal: 35 }}
    />
  );
};

export default Hashtag;
