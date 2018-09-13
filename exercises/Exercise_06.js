import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Appbar,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Constants } from 'expo';

import LongParagraph from '../utils/LongParagraph';
import { getHeaderHeight } from '../utils/utils';

const imageRatio = 1000 / 600;
const screenWidth = Dimensions.get('window').width;
const imageHeight = screenWidth / imageRatio;
// const toolbarHeight = 56 + Constants.statusBarHeight; // Use it for your solution

export default class Exercise06 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // Define your interpolations as part of instance variables

  _goBack = () => {
    this.props.navigation.goBack(null);
  };

  // Several components will need to use Animated
  // Hints: play with absolute position + ScrollView's padding top
  render() {
    return (
      <PaperProvider theme={DefaultTheme}>
        {/* We need to extract Appbar.Header and change it to an Animated View */}
        <Appbar.Header style={styles.toolbar}>
          {/* We need to extract back action outside of Appbar.Header. We can wrap it in TouchableRipple
          from react-native-paper */}
          <Appbar.BackAction onPress={this._goBack} />
          {/* We need to extract the content too, we can use the Text from react-native-paper
          and wrap it with Animated */}
          <Appbar.Content title="Exercise 06" />
        </Appbar.Header>
        {/* Image needs to be Animated */}
        <Image
          style={styles.image}
          source={{ uri: 'https://picsum.photos/1000/600/?image=435' }}
        />
        {/* ScrollView needs to be Animated */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
        >
          <LongParagraph />
        </ScrollView>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  image: {
    height: imageHeight,
    width: screenWidth,
  },
  toolbar: {
    ...Platform.select({
      ios: {
        height: getHeaderHeight(),
        paddingTop: Constants.statusBarHeight,
      },
    }),
  },
});
