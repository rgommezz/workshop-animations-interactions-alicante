import React from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import { Constants } from 'expo';

const SQUARE_SIDE = 80;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export default class Exercise03 extends React.Component {
  constructor(props) {
    super(props);
    // 1. Set up the animated values you'll need
    // We need 3 animated values: one for defining the square X position,
    // another for specifying how opacity will change over time
    // and last but not least one for determining when and how the box will rotate
    // Hint: opacity and rotate values can be derived from the 1st one.

    // The initial xPos of the square should be -SQUARE_SIDE (offscreen) and the final one SCREEN_WIDTH

    // For rotation, it should not rotate as long as xPos < 0 and xPos > SCREEN_WIDTH - SQUARE_SIDE.
    // Then, from xPos = 0, till xPos = xCenter, it should rotate from 0 degrees to 90 degrees.
    // Finally, from xPos = xCenter till xPos = SCREEN_WIDTH - SQUARE_SIDE, it should rotate from 90 degrees to 360 degrees

    // The opacity should change from 1 to 0 during the travel of the box

    // The animation should loop 4 times, lasting 4 seconds per loop
  }

  componentDidMount() {
    // 3. Fire the animation when the component mounts and make it loop 4 times
    // Hint: use Animated.loop to repeat an animation periodically.
    // Check https://facebook.github.io/react-native/docs/animated#loop
  }

  blockJS = () => {
    const start = new Date();
    let end = new Date();
    while (end - start < 4000) {
      end = new Date();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* 2. Bind the animated values to the view */}
        <View style={[styles.box]} />
        <View style={styles.button}>
          <Button title="Block JS" onPress={this.blockJS} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  box: {
    position: 'absolute',
    top: (SCREEN_HEIGHT - Constants.statusBarHeight) / 2 - SQUARE_SIDE / 2,
    height: SQUARE_SIDE,
    width: SQUARE_SIDE,
    backgroundColor: 'red',
  },
  button: {
    width: 100,
    alignSelf: 'center',
  },
});
