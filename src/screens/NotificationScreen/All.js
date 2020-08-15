import React from 'react';
import {
  Text,
  View,
  SectionList,
} from 'react-native';

import Comment from './components/Comment';
import Follower from './components/Follower';
import Like from './components/Like';
import Mention from './components/Mention';
import { normalize } from '../../styles/normalize';

const allNotifications = [
  {
    id: 1,
    type: 'likes',
    data: {
      likedPhoto: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
      likes: [
        {
          id: 5,
          url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
          name: 'Rihana',
        },
        {
          id: 6,
          url: 'https://homepages.cae.wisc.edu/~ece533/images/boat.png',
          name: 'justin',
        },
      ],
    },
  },
  {
    id: 2,
    type: 'followers',
    data: {
      id: 5,
      url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
      name: 'Rihana',
    },
  },
  {
    id: 3,
    type: 'comments',
    data: {
      id: 5,
      url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
      name: 'Rihana',
    },
  },
  {
    id: 4,
    type: 'mentions',
    data: {
      id: 5,
      url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
      name: 'Rihana',
    },
  },
];

const DATA = [
  {
    title: 'This week',
    data: [...allNotifications, ...allNotifications],
  },
  {
    title: 'This month',
    data: allNotifications,
  },
];
const componentMap = {
  likes: Like,
  comments: Comment,
  mentions: Mention,
  followers: Follower,
};

const renderPhoto = ({ item }) => {
  const NotificationComponent = componentMap[item.type];
  return <NotificationComponent item={item.data} />;
};

const AllNotifications = () => (
  <SectionList
    stickySectionHeadersEnabled={false}
    sections={DATA}
    keyExtractor={(item, index) => item + index}
    SectionSeparatorComponent={() => (
      <View style={{ marginBottom: 10 }} />
    )}
    renderItem={(item) => renderPhoto(item)}
    ItemSeparatorComponent={() => <View style={{ height: normalize(15) }} />}
    renderSectionHeader={({ section: { title } }) => (
      <Text
        style={{
          marginLeft: normalize(15),
          marginTop: normalize(10),
          color: '#b2b2b2',
          fontFamily: 'Roboto-Medium',
        }}
      >
        {title}
      </Text>
    )}
  />
);

export default AllNotifications;
