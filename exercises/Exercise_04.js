import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  TouchableRipple,
} from 'react-native-paper';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableRipple);

class Button extends Component {
  animatedValue = new Animated.Value(0);
  // Define here the interpolation for the scale

  // Use 2 properties from the Touchable to detect when we press in and when we release the touch.
  // Hint: https://facebook.github.io/react-native/docs/touchablewithoutfeedback#props
  // Use 2 handlers attached to those properties to fire 2 different animations based on the above.
  // Hint: You can use either interpolation based on animatedValue changing from 0 to 1
  // Or you can directly animate the scale property. In the case of the latter, initialize the animated value to 1
  // (Initial scale)

  render() {
    const { title } = this.props;

    return (
      <AnimatedTouchable delayPressIn={0} onPress={() => ({})}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
          </View>
        </View>
      </AnimatedTouchable>
    );
  }
}

class Exercise_04 extends Component {
  render() {
    return (
      <PaperProvider theme={DefaultTheme}>
        <View style={styles.fill}>
          <Button title="Press Me" />
        </View>
      </PaperProvider>
    );
  }
}

export default Exercise_04;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    minWidth: 88,
    elevation: 2,
    borderRadius: 4,
    backgroundColor: 'rgb(64,84,177)',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
    fontSize: 16,
    fontFamily:
      Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'sans-serif-medium',
  },
});
