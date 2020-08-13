import React, { useState } from 'react';
import {
  View, TextInput, Text, Image, Platform, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchHome from './Home';
import Hashtags from './Hashtags';
import Sounds from './Sounds';
import Users from './Users';
import Videos from './Videos';
import getFontSize from '../../utils';

const windowWidth = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();
const activeTintColor = '#313131';
const TabMenu = ({ setShowSearch }) => (
  <Tab.Navigator
    initialRouteName="Home"
    sceneContainerStyle={{
      backgroundColor: 'white',
    }}
    tabBarOptions={{
      showIcon: true,
      labelStyle: {
        fontSize: getFontSize(16),
        width: windowWidth / 5,
        // width:100,
        textTransform: 'capitalize',
        fontFamily: 'Roboto-Regular',
      },
      indicatorStyle: { backgroundColor: 'black', height: 0.75 },
      tabStyle: {
        paddingVertical: 0,
        marginBottom: -7,
      },
      activeTintColor,
    }}
  >
    <Tab.Screen
      name="Home"
      component={SearchHome}
      listeners={{
        focus: () => {
          setShowSearch(false);
        },
        blur: () => {
          setShowSearch(true);
        },
      }}
      options={{
        tabBarLabel: '',
        tabBarIcon: () => (
          <Image
            source={require('../../assets/icons/tabmenu.png')}
            style={{
              width: 25,
              height: 25,
              marginTop: Platform.OS === 'android' ? 18 : 10,
              tintColor: activeTintColor,
            }}
          />
        )
        ,
      }}
    />
    <Tab.Screen name="Users" component={Users} />
    <Tab.Screen name="Videos" component={Videos} />
    <Tab.Screen name="Hashtags" component={Hashtags} />
    <Tab.Screen name="Sounds" component={Sounds} />
  </Tab.Navigator>
);

const SearchBar = () => {
  const [value, setValue] = useState('');
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 33,
      }}
    >
      <TextInput
        // placeholder="Search"
        clearButtonMode="while-editing"
        style={{
          height: 45,
          backgroundColor: '#F1F1F1',
          padding: 10,
          borderRadius: 2,
        }}
        value={value}
        onChangeText={(text) => setValue(text)}
      />

      {!value && (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome5
            name="search"
            size={18}
            style={{ marginTop: -32, marginHorizontal: 12, color: '#616161' }}
          />
          <Text
            style={{
              marginTop: -34,
              color: '#616161',
              fontSize: getFontSize(19),
              fontWeight: '300',
              fontFamily: 'Roboto-Regular',
            }}
          >
            Search
          </Text>
        </View>
      )}
    </View>
  );
};
const SearchScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      {showSearch && <SearchBar />}
      <TabMenu setShowSearch={setShowSearch} />
    </SafeAreaView>
  );
};

export default SearchScreen;
