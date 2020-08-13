import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import getFontSize from '../../utils';

import { fetchVideos } from '../../services/apiHandler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const heightOffset = Platform.OS === 'ios' ? 120 : 50;
const height = windowHeight / 2 - heightOffset;
const width = windowWidth / 2 - 2;

const renderPhoto = ({ item }) => (
  <TouchableOpacity
    onPress={() => console.log('video pressed')}
    style={{ marginLeft: 1.5 }}
  >
    <Image
      key={item.author.id}
      source={{ uri: item.post.coverUrl }}
      style={{ width, height }}
      defaultSource={require('../../assets/defaultImage.png')}
    />
    <View
      style={{
        position: 'absolute',
        top: 10,
        right: 15,
        flexDirection: 'row',
      }}
    >
      <FontAwesome5
        name="play"
        size={12}
        style={{
          color: '#FFFFFF',
          marginRight: 5,
        }}
      />
      <Text
        style={{
          color: '#FFFFFF',
          fontFamily: 'Roboto-Medium',
          fontSize: getFontSize(12),
        }}
      >
        {item.post.viewCount}
      </Text>
    </View>
    <View
      style={{
        width: '100%',
        height: height - height / 1.5,
        position: 'absolute',
        bottom: 0,
        padding: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.31)',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          key={item.author.id + 2}
          source={{
            uri: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            marginHorizontal: 10,
          }}
        />
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'Roboto-Medium',
            fontSize: getFontSize(12),
          }}
        >
          {item.author.name}
          {'\n'}
          {item.post.description}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const paginationRef = useRef({ limit: 8, offset: 0 });
  useFocusEffect(
    useCallback(() => {
      const fetchVideosList = async () => {
        paginationRef.current = { limit: 8, offset: 0 };
        const response = await fetchVideos('', paginationRef.current);
        setVideos(response.data.result);
      };
      if (videos.length) {
        return;
      }
      fetchVideosList();
    })
  );
  if (!videos.length) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        color="grey"
        size="large"
      />
    );
  }
  const loadMore = async ({ distanceFromEnd }) => {
    console.log('end reached', distanceFromEnd);
    if (isLoading) return;

    paginationRef.current.offset += 1;
    setLoading(true);
    const response = await fetchVideos('', paginationRef.current);
    setVideos([...videos, ...response.data.result]);
    setLoading(false);
  };

  return (
    <FlatList
      numColumns={2}
      // bounces={false}
      // pagingEnabled={true}
      // showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      // legacyImplementation
      data={videos}
      ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      ListHeaderComponent={() => <View style={{ height: 5 }} />}
      ListFooterComponent={() => (isLoading ? (
        <ActivityIndicator style={{ marginVertical: 15 }} size="large" color="grey" />
      ) : (
        <View style={{ height: 2 }} />
      ))}
      renderItem={(item) => renderPhoto(item)}
      keyExtractor={(photo, index) => String(index)}
      style={{ width: windowWidth }}
      onEndReachedThreshold={1}
      onEndReached={loadMore}
    />
  );
};

export default Videos;
