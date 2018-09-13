import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../utils/utils';

const SQUARE_SIDE = 80;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export default class Exercise02 extends React.Component {
  // You need to create a new Animated Value in the constructor.
  // It's recommended for separation of concerns to create it as an instance variable

  componentDidMount() {
    // Here we start the animation. Use the timing driver and a duration of 2 seconds. Move it to the other end of the screen
    // You can play with other durations and easing functions to see different outcomes on the animation run.
    // Experiment with Easing.back(), Easing.bounce(), Easing.elastic(), Easing.inOut(Easing.quad), Easing.inOut(Easing.exp)
    // Hint: You need to call start() on the static driver for the animation to fire up.
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Bind the animated value to the view.
          Remember you need to use a different kind of View, to understand animated values as styles */}
        <View style={styles.box} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  box: {
    position: 'absolute',
    top: (SCREEN_HEIGHT - STATUS_BAR_HEIGHT) / 2 - SQUARE_SIDE / 2,
    height: SQUARE_SIDE,
    width: SQUARE_SIDE,
    backgroundColor: 'red',
  },
});
