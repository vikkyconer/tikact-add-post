import React from 'react';
import {
  Text, View, Dimensions, SafeAreaView
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import All from './All';
import Comments from './Comments';
import Likes from './Likes';
import Followers from './Followers';
import Mentions from './Mentions';
import getFontSize from '../../utils';
import { normalize } from '../../styles/normalize';

const activeTintColor = '#313131';
const windowWidth = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();

const Header = () => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: normalize(10),
      paddingHorizontal: normalize(20),
      alignItems: 'center',
    }}
  >
    <FontAwesome5 name="chevron-left" size={normalize(20)} />
    <Text
      style={{
        fontSize: getFontSize(20),
        fontFamily: 'Roboto-Medium',
        color: '#313131',
      }}
    >
      Activities
    </Text>
    <FontAwesome5 name="paper-plane" size={normalize(20)} style={{ color: '#616161', transform: [{ rotate: "20deg" }] }} />
  </View>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="All"
    sceneContainerStyle={{
      backgroundColor: 'white',
    }}
    tabBarOptions={{
      scrollEnabled: true,
      labelStyle: {
        fontSize: getFontSize(16),
        width: normalize(90),
        textTransform: 'capitalize',
        fontFamily: 'Roboto-Regular'
      },
      indicatorStyle: { backgroundColor: 'black', height: normalize(1.5) },
      tabStyle: {
        width: normalize(95),
        marginBottom: normalize(-5)
      },
      activeTintColor,
    }}
  >
    <Tab.Screen name="All" component={All} />
    <Tab.Screen name="Likes" component={Likes} />
    <Tab.Screen name="Comments" component={Comments} />
    <Tab.Screen name="Mentions" component={Mentions} />
    <Tab.Screen name="Followers" component={Followers} />
    <Tab.Screen name="Gift & Letters" component={Followers} />
  </Tab.Navigator>
);
const NotificationScreen = () => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: 'white',
    }}
  >
    <Header />
    <TabNavigator />
  </SafeAreaView>
);

export default NotificationScreen;
