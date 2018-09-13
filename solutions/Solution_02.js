import React from 'react';
import { StyleSheet, View, Dimensions, Animated, Button } from 'react-native';
import { Constants } from 'expo';

const SQUARE_SIDE = 80;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export default class Solution03 extends React.Component {
  constructor(props) {
    super(props);
    this.animatedTranslateX = new Animated.Value(-SQUARE_SIDE);

    this.animatedOpacity = this.animatedTranslateX.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    this.animateRotation = this.animatedTranslateX.interpolate({
      inputRange: [
        0,
        (SCREEN_WIDTH - SQUARE_SIDE) / 2,
        SCREEN_WIDTH - SQUARE_SIDE,
      ],
      outputRange: ['0deg', '90deg', '360deg'],
      extrapolate: 'clamp',
    });
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.animatedTranslateX, {
        toValue: SCREEN_WIDTH,
        duration: 4000,
        useNativeDriver: true,
      }),
      {
        iterations: 4,
      },
    ).start();
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
        <Animated.View
          style={[
            styles.box,
            {
              opacity: this.animatedOpacity,
              transform: [
                { translateX: this.animatedTranslateX },
                {
                  rotate: this.animateRotation,
                },
              ],
            },
          ]}
        />
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
