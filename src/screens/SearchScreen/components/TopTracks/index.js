import React from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// const windowWidth = Dimensions.get("window").width;
const height = 120;
const width = 117;

const TopTracks = ({ data, onPress }) => {
  const renderPhoto = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          key={item.id}
          source={{ uri: item.coverUrl }}
          style={{ width, height }}
          defaultSource={require('../../../../assets/defaultImage.png')}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      horizontal
      // bounces={false}
      // pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      // legacyImplementation={false}
      data={data}
      ListHeaderComponent={() => <View style={{ paddingLeft: 11 }} />}
      ListFooterComponent={() => <View style={{ width: 4 }} />}
      ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
      renderItem={(item) => renderPhoto(item)}
      keyExtractor={(photo) => String(photo.id)}
      style={{ height: 130 }}
    />
  );
};

export default TopTracks;
