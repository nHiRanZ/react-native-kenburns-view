/**
 * Sample KenBurns Image View App
 * Created by Nimila Hiranya Samarasinghe
 * Links: https://github.com/nHiRanZ
 *
 * Version: 1.0.0
 *
 * Description: This reflects the KenBurns effect in a React Native Image
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var KenBurnsImage = require('react-native-kenburns-view');
var Dimensions = require('Dimensions');

class KenBurnsExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Using KenBurns View!
        </Text>
        <View style={styles.imageContainer}>
          <KenBurnsImage tension={6} friction={50} imageWidth={Dimensions.get('window').width} imageHeight={Dimensions.get('window').height / 100 * 30} sourceUri={require('./images/image1.jpg')} placeholderSource={require('./images/placeholder.jpg')}>
          </KenBurnsImage>
        </View>
        <View style={styles.imageContainer}>
          <KenBurnsImage tension={6} friction={50} imageWidth={Dimensions.get('window').width} imageHeight={Dimensions.get('window').height / 100 * 30} sourceUri={require('./images/image2.jpg')} placeholderSource={require('./images/placeholder.jpg')}>
          </KenBurnsImage>
        </View>
        <View style={styles.imageContainer}>
          <KenBurnsImage tension={6} friction={50} imageWidth={Dimensions.get('window').width} imageHeight={Dimensions.get('window').height / 100 * 30} sourceUri={require('./images/image3.jpg')} placeholderSource={require('./images/placeholder.jpg')}>
          </KenBurnsImage>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  innerText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageContainer: {
    overflow: 'hidden',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default KenBurnsExample;
