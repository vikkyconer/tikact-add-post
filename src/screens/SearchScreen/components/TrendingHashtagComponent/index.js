import React from 'react';
import {
  View, Image, FlatList, TouchableOpacity, Text
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
// const windowWidth = Dimensions.get("window").width;
const height = 109;
const width = 120;
const ItemStyle = { height, width };
const spaceBetweenRows = 3;
const spaceBetweenColumns = 2;
const primaryImageWidth = 164;
const textColor = '#313131';

const restructureTrendingVideos = (videos) => {
  if (videos.length === 0) {
    return [];
  }
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

const TrendingHashTagComponent = ({ data, onPress }) => {
  const PrimaryImage = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Video
        source={{ uri: item[0].videoUrl }} // Can be a URL or a local file.
          // source={require("../../../../assets/videos/01.mp4")}
        key={item[0].postId}
          // ref={(ref) => {
          //   this.player = ref;
          // }} // Store reference
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
        style={{
          height: 2 * ItemStyle.height + spaceBetweenRows,
          width: primaryImageWidth,
        }}
        resizeMode="cover"
        muted
        poster={item[0].coverUrl}
        posterResizeMode="cover"
        repeat
      />
    </TouchableOpacity>
  );
  const SecondaryImage = ({ item }) => (
    <FlatList
      data={item}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: spaceBetweenRows }} />
      )}
      renderItem={({ item: SubItem }) => (
        <TouchableOpacity onPress={() => onPress(SubItem)}>
          <Image
            key={SubItem.postId}
            style={ItemStyle}
            source={{ uri: SubItem.coverUrl }}
            defaultSource={require('../../../../assets/defaultImage.png')}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(photo) => String(photo.postId)}
      scrollEnabled={false}
      style={{ width: '100%', height: '100%' }}
    />
  );
  const renderPhoto = (item) => {
    const child = item.length === 1 ? (
      <PrimaryImage item={item} />
    ) : (
      <SecondaryImage item={item} />
    );
    return (
      <View style={{ marginRight: spaceBetweenColumns }} key={item[0].postId}>
        {child}
      </View>
    );
  };
  return data.map((d) => renderPhoto(d));
};

const test = ({ data, onPress }) => (
  <FlatList
    horizontal
    initialNumToRender={1}
      // pagingEnabled={true}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
      // legacyImplementation={false}
    data={data}
    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
    renderItem={({ item }) => (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#F8F8F8',
          padding: 7,
        }}
      >
        <View
          style={{
            justifyContent: 'space-between',
            height: 30,
            marginLeft: 10,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              color: textColor,
              fontFamily: 'Roboto-Medium',
            }}
          >
            {item.hashtag}
          </Text>

          <Text
            style={{
              borderRadius: 2,
              paddingHorizontal: 5,
              color: textColor,
            }}
          >
            {item.viewCount}
            M
            {' '}
            <FontAwesome5
              name="chevron-right"
              size={12}
            />
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <TrendingHashTagComponent
            data={restructureTrendingVideos(item.videos)}
            onPress={onPress}
          />
        </View>
      </View>
    )}
    keyExtractor={(photo, index) => String(index)}
    style={{
      // width: windowWidth - 5,
      height: '100%',
      paddingLeft: 4,
      // paddin: 11,
    }}
  />
);
export default test;
