import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Constants } from 'expo';

const SQUARE_SIDE = 160;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export default class Exercise04 extends React.Component {
  constructor(props) {
    super(props);
    // 1. Set up the animated values you'll need

    // Same as numbers, strings can be interpolated as well, provided that they contain at least one number or its a color.
    // Colors can be expressed in their named version, rgba or hex.

    // We want to see the color of the box transitioning from red to yellow during the first 1.5 seconds
    // And transitioning back to red from 1.5 till 3 seconds
  }

  componentDidMount() {
    // 3. Fire the animation when the component mounts

    // Listen to the animated value change and display the current value in a Text component
    // Hint: just use setState

    // When the animation finishes, show an alert with some random text
    // Hint: start() can receive a parameter
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>I should show the progress of the animation here :)</Text>
        {/* 2. Bind the animated values to the view */}
        <View style={[styles.box]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  box: {
    position: 'absolute',
    top: (SCREEN_HEIGHT - Constants.statusBarHeight - SQUARE_SIDE) / 2,
    left: (SCREEN_WIDTH - SQUARE_SIDE) / 2,
    height: SQUARE_SIDE,
    width: SQUARE_SIDE,
  },
});
