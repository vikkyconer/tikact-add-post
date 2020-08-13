import React from 'react';
import {
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import getFontSize from '../../../../utils';

const windowWidth = Dimensions.get('window').width;
const height = 60;
const width = 60;
const textColor = '#313131';

const TopActorList = ({ data, onPress }) => {
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
          source={{ uri: item.imageUrl }}
          style={{ width, height, borderRadius: height / 2 }}
          defaultSource={require('../../../../assets/defaultImage.png')}
        />
        {!item.isFollowing && (
        <View
          style={{
            width: 18,
            height: 16,
            borderRadius: 16 / 2,
            backgroundColor: 'white',
            marginTop: -11,
          }}
        >
          <FontAwesome5
            name="plus-circle"
            size={18}
            style={{
              color: '#5396EB',
              marginTop: -2,
              marginLeft: 0,
              borderColor: 'black',
            }}
          />
        </View>
        )}
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            color: textColor,
            fontSize: getFontSize(14),
          }}
        >
          {item.name}
        </Text>
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
      ListHeaderComponent={() => <View style={{ paddingLeft: 18.45 }} />}
      ListFooterComponent={() => <View style={{ width: 10 }} />}
      // legacyImplementation={false}
      data={data}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      renderItem={(item) => renderPhoto(item)}
      keyExtractor={(photo) => String(photo.id)}
      style={{ width: windowWidth, height: 80 }}
    />
  );
};

export default TopActorList;
