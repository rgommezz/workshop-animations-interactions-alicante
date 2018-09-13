import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  Alert,
} from 'react-native';
import { Constants } from 'expo';

const SQUARE_SIDE = 160;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const RED = '#C60B1E';
const YELLOW = '#FFC400';

export default class Solution04 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
    this.animatedValue = new Animated.Value(0);
    this.animatedBackgroundColor = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [RED, YELLOW, RED],
      extrapolate: 'clamp',
    });
  }

  componentDidMount() {
    this.animatedValue.addListener(({ value }) => {
      this.setState({
        progress: value,
      });
    });

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 3000,
    }).start(() => {
      Alert.alert(null, 'Animation completed!');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.progress}</Text>
        <Animated.View
          style={[
            styles.box,
            {
              backgroundColor: this.animatedBackgroundColor,
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
