import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import Like from './components/Like';

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;
const likeNotifications = [
  {
    id: 5,
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
  {
    id: 1,
    likedPhoto: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    likes: [
      {
        id: 5,
        url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
        name: 'Rihana',
      },
    ],
  },
  {
    id: 2,
    likedPhoto: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    likes: [
      {
        id: 5,
        url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
        name: 'Rihana',
      },
    ],
  },

  {
    id: 3,
    likedPhoto: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    likes: [
      {
        id: 5,
        url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
        name: 'Rihana',
      },
    ],
  },
  {
    id: 4,
    likedPhoto: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    likes: [
      {
        id: 5,
        url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
        name: 'Rihana',
      },
    ],
  },

  {
    id: 6,
    likedPhoto: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    likes: [
      {
        id: 5,
        url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
        name: 'Rihana',
      },
    ],
  },
  {
    id: 7,
    likedPhoto: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    likes: [
      {
        id: 5,
        url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
        name: 'Rihana',
      },
    ],
  },

  {
    id: 8,
    likedPhoto: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    likes: [
      {
        id: 5,
        url: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
        name: 'Rihana',
      },
    ],
  },
];

const Likes = () => (
  <FlatList
    // bounces={false}
    // pagingEnabled={true}
    // showsHorizontalScrollIndicator={false}
    // showsVerticalScrollIndicator={false}
    // legacyImplementation={false}
    data={likeNotifications}
    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
    ListHeaderComponent={() => <View style={{ height: 20 }} />}
    ListFooterComponent={() => <View style={{ height: 15 }} />}
    renderItem={Like}
    keyExtractor={(photo) => String(photo.id)}
    // style={{ width: windowWidth }}
  />
);

export default Likes;
