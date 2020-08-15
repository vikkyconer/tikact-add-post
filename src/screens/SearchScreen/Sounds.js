import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import getFontSize from '../../utils';
import { fetchSounds } from '../../services/apiHandler';
import { normalize } from '../../styles/normalize';

const windowWidth = Dimensions.get('window').width;
// const height = windowHeight / 2 - 120;
// const width = windowWidth / 2 - 2;

const Sounds = ({ navigation }) => {
  const [sounds, setSounds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const getSounds = async () => {
        const response = await fetchSounds();
        setSounds(response.data.result);
        setRefreshing(false);
      };
      if (refreshing || !sounds.length) getSounds();
    }, [refreshing])
  );
  if (!sounds.length) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size="large"
        color="grey"
      />
    );
  }
  // const handleRefresh = async () => {
  //   setRefreshing(true);
  //   // const response = await fetchSounds();
  //   // setSounds(response.data.result);
  //   // setRefreshing(false);
  // };
  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SoundsDetail', { soundId: item.id })}
      style={{ flexDirection: 'row', paddingLeft: normalize(20) }}
    >
      <View style={{ marginEnd: normalize(10) }}>
        <Image
          key={item.id}
          source={{ uri: item.name }}
          style={{ width: normalize(70), height: normalize(70) }}
          defaultSource={require('../../assets/defaultImage.png')}
        />
        <FontAwesome5
          name="play"
          size={normalize(23)}
          style={{
            color: '#FFFFFF',
            position: 'absolute',
            left: normalize(25),
            top: normalize(25),
            opacity:0.9
          }}
        />
      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        <Text
          style={{
            fontSize: getFontSize(18),
            color: '#313131',
            fontFamily: 'Roboto-Regular',
            marginBottom: normalize(10),
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: getFontSize(14),
            color: '#B7B8B9',
            fontFamily: 'Roboto-Regular',
          }}
        >
          {item.postsCount}
          K videos
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      // bounces={false}
      // pagingEnabled={true}
      // showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      // legacyImplementation={false}
      data={sounds}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      ListHeaderComponent={() => <View style={{ height: 15 }} />}
      ListFooterComponent={() => <View style={{ height: 15 }} />}
      renderItem={(item) => renderPhoto(item)}
      keyExtractor={(photo, index) => String(index)}
      style={{ width: windowWidth }}
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
    />
  );
};

export default Sounds;
