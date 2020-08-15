import React, { useState, useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

import getFontSize from '../../utils';
import { fetchUsers } from '../../services/apiHandler';
import { normalize } from '../../styles/normalize';

const FollowButton = ({ isFollowing = false }) => (
  <TouchableOpacity
    onPress={() => { }}
    style={{
      width: normalize(90),
      height: normalize(28),
      backgroundColor: isFollowing ? 'white' : '#5395EA',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {isFollowing ? (
      <FontAwesome
        name="paper-plane-o"
        size={getFontSize(20)}
        style={{ transform: [{ rotate: "20deg" }] }}
        color="#5395EA"
      />
    ) : (
        <Text
          style={{
            color: 'white',
            fontSize: getFontSize(14),
          }}
        >
          Follow
        </Text>
      )}
  </TouchableOpacity>
);

const User = ({ item }) => (
  <View
    style={{
      flexDirection: 'row',
      paddingHorizontal: 15,
      alignItems: 'center',
    }}
  >
    <Image
      key={item.id}
      source={{ uri: item.imageUrl }}
      style={{ width: getFontSize(66), height: getFontSize(66), borderRadius: getFontSize(66) / 2 }}
      defaultSource={require('../../assets/defaultImage.png')}
    />
    <View style={{ flexBasis: 100, marginHorizontal: getFontSize(15), flexGrow: 1 }}>
      <Text
        style={{ fontFamily: 'Roboto-Regular', fontSize: getFontSize(18), color: '#313131' }}
      >
        {item.name}
        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: getFontSize(14),
            color: '#B7B8B9',
          }}
        >
          {'  '}
          .
          {' '}
          {item.followerCount}
          {' '}
          followers
        </Text>
      </Text>
      <Text
        style={{ fontFamily: 'Roboto-Regular', fontSize: getFontSize(14), color: '#B7B8B9' }}
      >
        {item.userName}
      </Text>
    </View>

    <FollowButton isFollowing={false} />
  </View>
);

const Users = () => {
  const [users, setUsers] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getUsers = async () => {
        const response = await fetchUsers();
        setUsers(response.data.result);
      };
      getUsers();
    }, [])
  );
  if (!users.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size="large"
          color="grey"
        />
      </View>
    );
  }
  return (
    <FlatList
      // bounces={false}
      // pagingEnabled={true}
      // showsHorizontalScrollIndicator={false}
      // showsVerticalScrollIndicator={false}
      // legacyImplementation={false}
      data={users}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      ListHeaderComponent={() => <View style={{ height: 20 }} />}
      ListFooterComponent={() => <View style={{ height: 15 }} />}
      renderItem={User}
      keyExtractor={(photo) => String(photo.id)}
    />
  );
};

export default Users;
