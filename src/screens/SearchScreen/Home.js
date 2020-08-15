import React, { useCallback, useState } from 'react';
import {
  Text, View, ScrollView, StyleSheet
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import TrendingVideoList from './components/TrendingVideoList';
import TopActorList from './components/TopActorList';
import TrendingHashTagComponent from './components/TrendingHashtagComponent';
import TopTracks from './components/TopTracks';
import { normalize } from '../../styles/normalize'

import getFontSize from '../../utils';
import {
  fetchTrendingVideos,
  fetchTrendingActors,
  fetchTrendingHashtags,
  fetchTrendingTracks,
} from '../../services/apiHandler';

const textColor = '#313131';
const textStyle = {
  fontSize: getFontSize(18),
  color: textColor,
  fontFamily: 'Roboto-Medium',
};
const iconStyle = {
  color: textColor,
  marginRight: normalize(10),
};
const iconFontSize = normalize(20);
const headerStyle = {
  marginBottom: normalize(10),
  paddingLeft: normalize(11),
  flexDirection: 'row',
};
const containerStyle = {
  marginVertical: 10,
};
const Divider = () => (
  <View
    style={{
      // borderStyle: "solid",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#E2E2E2',
      marginRight: 15,
      marginLeft: 4,
    }}
  />
);
const TopTrackContainer = ({ navigation }) => {
  const [tracks, setTracks] = useState([]);
  console.log('track render');
  useFocusEffect(
    useCallback(() => {
      const fetchTracks = async () => {
        const response = await fetchTrendingTracks();
        setTracks(response.data.result);
      };
      if (tracks.length) return;
      fetchTracks();
    })
  );
  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <FontAwesome5
          name="music"
          size={iconFontSize}
          style={{ ...iconStyle, marginTop: 3 }}
        />
        <Text style={textStyle}>Top Tik Tracks</Text>
      </View>

      <TopTracks
        data={tracks}
        onPress={(item) => {
          navigation.navigate('SoundsDetail', { soundId: item.id });
        }}
      />
    </View>
  );
};

const TrendingHashTagContainer = ({ navigation }) => {
  console.log('hashtag render');
  const [hashtags, setHashtags] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchHashtags = async () => {
        const response = await fetchTrendingHashtags();
        setHashtags(response.data.result);
      };
      if (hashtags.length) return;
      fetchHashtags();
    })
  );
  return (
    <View style={{ ...containerStyle, height: 290 }}>
      <View style={headerStyle}>
        <FontAwesome5 name="fire" size={iconFontSize} style={iconStyle} />
        <Text style={textStyle}>Trending Hashtags</Text>
      </View>
      <TrendingHashTagComponent
        data={hashtags}
        onPress={(item) => {
          navigation.navigate('HashtagDetail', { hashTagId: item.hashtag });
        }}
      />
    </View>
  );
};

const TopActorsContainer = () => {
  console.log('actor render');
  const [actors, setActors] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchActors = async () => {
        const response = await fetchTrendingActors();
        if (response.data.result) setActors(response.data.result);
      };
      if (actors.length) return;
      fetchActors();
    })
  );
  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <FontAwesome5
          name="theater-masks"
          size={iconFontSize}
          style={iconStyle}
        />
        <Text style={textStyle}>Top Tik Actors</Text>
      </View>
      <TopActorList
        data={actors}
        onPress={(item) => {
          console.log('actor clicked', item);
        }}
      />
    </View>
  );
};

const restructureTrendingVideos = (videos) => {
  if (!videos.length) return [];
  const result = [[videos[0]]];
  for (let i = 1; i < videos.length; i += 2) {
    if (videos[i + 1]) {
      result.push([videos[i], videos[i + 1]]);
    } else {
      result.push([videos[i]]);
    }
  }
  return result;
};

const TopVideosContainer = () => {
  console.log('video render');
  const [videos, setVideos] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchVideos = async () => {
        const response = await fetchTrendingVideos();
        if (response.data.result) setVideos(response.data.result);
      };
      if (videos.length) return;
      fetchVideos();
    })
  );
  return (
    <>
      <View
        style={{
          ...headerStyle,
          marginTop: normalize(15),
        }}
      >
        <FontAwesome5 name="video" size={iconFontSize} style={iconStyle} />
        <Text style={textStyle}>Trending Videos</Text>
      </View>
      <TrendingVideoList
        data={restructureTrendingVideos(videos)}
        onPress={(item) => {
          console.log('video clicked', item);
        }}
      />
    </>
  );
};
const SearchHome = ({ navigation }) => {
  console.log('---------home render---------');
  return (
    <ScrollView>
      <TopVideosContainer />

      <Divider />

      <TopActorsContainer />

      <Divider />

      <TrendingHashTagContainer navigation={navigation} />

      <Divider />

      <TopTrackContainer navigation={navigation} />
    </ScrollView>
  );
};

export default SearchHome;
