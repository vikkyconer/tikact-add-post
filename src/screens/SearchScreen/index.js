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
import { normalize } from '../../styles/normalize';

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
        textTransform: 'capitalize',
        fontFamily: 'Roboto-Medium',
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
              width: normalize(25),
              height: normalize(25),
              marginTop: Platform.OS === 'android' ? normalize(18) : normalize(10),
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
        marginTop: normalize(10),
        marginLeft: normalize(30),
        marginRight: normalize(30),
        height: normalize(42),
        flexDirection: 'row',
        backgroundColor: '#F1F1F1',
        alignItems:'center',
        borderRadius:normalize(5)
      }}
    >
      <FontAwesome5
        name="search"
        size={normalize(15)}
        style={{ color: '#b7b8b9',marginLeft:normalize(10),marginRight:normalize(5) }}
      />
      <TextInput
        placeholder="Search"
        clearButtonMode="while-editing"
        value={value}
        onChangeText={(text) => setValue(text)}
      />
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
