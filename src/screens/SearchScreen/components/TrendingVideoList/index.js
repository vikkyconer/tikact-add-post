import React from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
// const windowWidth = Dimensions.get("window").width;
const height = 109;
const width = 120;
const ItemStyle = { height, width };
const spaceBetweenRows = 3;
const spaceBetweenColumns = 2;
const primaryImageWidth = 164;

const TrendingVideoList = ({ data, onPress }) => {
  const PrimaryImage = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item[0])}>
      <Video
        source={{ uri: item[0].videoUrl }} // Can be a URL or a local file.
          // source={require("../../../../assets/videos/02.mp4")}
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
      renderItem={({ item: subItem }) => (
        <TouchableOpacity onPress={() => onPress(subItem)}>
          <Image
            key={subItem.postId}
            style={ItemStyle}
            source={{ uri: subItem.coverUrl }}
            defaultSource={require('../../../../assets/defaultImage.png')}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(photo) => String(photo.postId)}
      scrollEnabled={false}
    />
  );
  const renderPhoto = ({ item, index }) => {
    const child = index === 0 ? (
      <PrimaryImage item={item} />
    ) : (
      <SecondaryImage item={item} />
    );
    return <View>{child}</View>;
  };
  return (
    <FlatList
      horizontal
      // pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      // legacyImplementation={false}
      data={data}
      ItemSeparatorComponent={() => (
        <View style={{ width: spaceBetweenColumns }} />
      )}
      ListHeaderComponent={() => <View style={{ paddingLeft: 11 }} />}
      ListFooterComponent={() => <View style={{ width: 2 }} />}
      renderItem={(item) => renderPhoto(item)}
      keyExtractor={(photo) => String(photo[0].postId)}
      style={{ height: height * 2 + 15 }}
    />
  );
};

export default TrendingVideoList;
