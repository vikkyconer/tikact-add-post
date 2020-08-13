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

const activeTintColor = '#313131';
const windowWidth = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();

const Header = () => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
    }}
  >
    <FontAwesome5 name="chevron-left" size={23} />
    <Text
      style={{
        fontSize: getFontSize(24),
        fontFamily: 'Roboto-Medium',
        color: '#313131',
      }}
    >
      Activities
    </Text>
    <FontAwesome5 name="paper-plane" size={25} style={{ color: '#616161' }} />
  </View>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="All"
    sceneContainerStyle={{
      backgroundColor: 'white',
    }}
    tabBarOptions={{
      labelStyle: {
        fontSize: getFontSize(16),
        width: windowWidth / 5,
        textTransform: 'capitalize',
        fontFamily: 'Roboto-Regular',
      },
      indicatorStyle: { backgroundColor: 'black', height: 0.75 },
      tabStyle: {
        // paddingVertical: 0,
        marginBottom: -7,
      },
      activeTintColor,
    }}
  >
    <Tab.Screen name="All" component={All} />
    <Tab.Screen name="Likes" component={Likes} />
    <Tab.Screen name="Comments" component={Comments} />
    <Tab.Screen name="Mentions" component={Mentions} />
    <Tab.Screen name="Followers" component={Followers} />
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
