import React, { Component } from 'react';
import { AppRegistry, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
     View, 
     Alert,
     BackHandler,
     PermissionsAndroid,
     Image,
     Platform,
     ActivityIndicator,
     Picker,
     SafeAreaView } from 'react-native';

     import { connect } from 'react-redux';
import { videoList} from '../../actions/homeVideoList'


class Home extends Component {

    componentDidMount() {

        this.props.videoList();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>{'Hello Home.....!'}</Text>
            </View>
        )
    }
}

const mapStateToProps = store => {
    return {
      vList: store.videoList,
  
        
    }
  }
  
  export default connect(mapStateToProps, {videoList} )(Home);