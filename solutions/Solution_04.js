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
  animatedScale = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  handlePressIn = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  handlePressOut = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { title } = this.props;

    return (
      <AnimatedTouchable
        delayPressIn={0}
        onPress={() => ({})}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        style={{
          transform: [{ scale: this.animatedScale }],
        }}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
          </View>
        </View>
      </AnimatedTouchable>
    );
  }
}

class Solution_04 extends Component {
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

export default Solution_04;

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
