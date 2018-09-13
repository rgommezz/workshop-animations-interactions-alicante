import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import {
  Appbar,
  DefaultTheme,
  TouchableRipple,
  Text,
  Provider as PaperProvider,
  withTheme,
} from 'react-native-paper';

import LongParagraph from '../utils/LongParagraph';
import { STATUS_BAR_HEIGHT } from '../utils/utils';

const AnimatedText = Animated.createAnimatedComponent(Text);

const imageRatio = 1000 / 600;
const screenWidth = Dimensions.get('window').width;
const imageHeight = screenWidth / imageRatio;
const toolbarHeight = 56 + STATUS_BAR_HEIGHT;

class Solution05 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  scrollY = new Animated.Value(0);

  imageTranslate = this.scrollY.interpolate({
    inputRange: [0, imageHeight],
    outputRange: [0, -imageHeight],
    extrapolate: 'clamp',
  });

  toolbarOpacity = this.scrollY.interpolate({
    inputRange: [imageHeight - toolbarHeight - 24, imageHeight - toolbarHeight],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  titleTranslateY = this.scrollY.interpolate({
    inputRange: [0, imageHeight - toolbarHeight],
    outputRange: [0, -imageHeight + toolbarHeight + 14.5],
    extrapolate: 'clamp',
  });

  titleScale = this.scrollY.interpolate({
    inputRange: [0.0, imageHeight - toolbarHeight],
    outputRange: [1.5, 1.0],
    extrapolate: 'clamp',
  });

  goBack = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    const { theme } = this.props;

    return (
      <PaperProvider theme={DefaultTheme}>
        <Animated.View
          style={[
            styles.toolbar,
            {
              backgroundColor: theme.colors.primary,
              opacity: this.toolbarOpacity,
            },
          ]}
        />
        <TouchableRipple
          onPress={this.goBack}
          rippleColor="white"
          style={styles.backButton}
        >
          <Appbar.BackAction color="white" />
        </TouchableRipple>
        <AnimatedText
          style={[
            styles.title,
            {
              fontFamily: theme.fonts.medium,
              transform: [
                { translateY: this.titleTranslateY },
                { scale: this.titleScale },
              ],
            },
          ]}
        >
          Solution 05
        </AnimatedText>
        <Animated.Image
          style={[
            styles.image,
            { transform: [{ translateY: this.imageTranslate }] },
          ]}
          source={{ uri: 'https://picsum.photos/1000/600/?image=435' }}
        />
        <Animated.ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <LongParagraph />
        </Animated.ScrollView>
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
    paddingTop: imageHeight + 8,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: imageHeight,
    width: screenWidth,
  },
  toolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    elevation: 3,
    height: toolbarHeight,
  },
  backButton: {
    position: 'absolute',
    zIndex: 4,
    top: STATUS_BAR_HEIGHT - 10 + 16 - 2,
    left: 4,
    elevation: 4,
  },
  title: {
    position: 'absolute',
    top: imageHeight - toolbarHeight + STATUS_BAR_HEIGHT,
    left: 16,
    paddingLeft: 56.5,
    zIndex: 3,
    elevation: 3,
    color: 'white',
    fontSize: 20,
  },
});

export default withTheme(Solution05);
