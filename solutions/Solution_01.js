import React from 'react';
import { StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
import { Constants } from 'expo';

const SQUARE_SIDE = 80;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export default class Solution02 extends React.Component {
  animatedValue = new Animated.Value(20);

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: SCREEN_WIDTH - SQUARE_SIDE - 16,
      duration: 2000,
      easing: Easing.elastic(1),
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{ translateX: this.animatedValue }],
            },
          ]}
        />
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
    top: (SCREEN_HEIGHT - Constants.statusBarHeight) / 2 - SQUARE_SIDE / 2,
    height: SQUARE_SIDE,
    width: SQUARE_SIDE,
    backgroundColor: 'red',
  },
});
