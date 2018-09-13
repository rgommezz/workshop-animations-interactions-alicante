import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Vibration,
  Dimensions,
  Platform,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getHeaderHeight } from '../utils/utils';

const SQUARE_SIDE = 100;
const BIN_SIZE = 50;
const HEADER_HEIGHT = getHeaderHeight();
// There is a bug on iOS with native driver, where the final animation don't work as expected.
const USE_NATIVE_DRIVER = Platform.OS === 'android';

export class DraggableBox extends Component {
  translateX = new Animated.Value(0);
  translateY = new Animated.Value(0);
  scale = new Animated.Value(1);
  lastOffset = { x: 0, y: 0 };

  shouldComponentUpdate() {
    return false;
  }

  onHandlerStateChange = event => {
    if (
      event.nativeEvent.oldState === State.ACTIVE &&
      event.nativeEvent.state === State.END
    ) {
      // We finished dragging the box.
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateY.setValue(0);

      this.props.onGestureEnd({
        id: this.props.id,
        scale: this.scale,
        translateX: this.translateX,
        translateY: this.translateY,
      });
    }
  };

  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={Animated.event(
          [
            {
              nativeEvent: {
                translationX: this.translateX,
                translationY: this.translateY,
              },
            },
          ],
          { useNativeDriver: Platform.OS === 'android' },
        )}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          ref={this.props.getRef}
          style={[
            this.props.style,
            {
              transform: [
                { translateX: this.translateX },
                { translateY: this.translateY },
                { scale: this.scale },
              ],
            },
          ]}
        />
      </PanGestureHandler>
    );
  }
}

export default class Solution08 extends Component {
  state = {
    isDeleting: false,
  };
  binLayout = {
    x: 0,
    y: 0,
  };

  box1 = null;
  box2 = null;

  calculateBinLayout = ({
    nativeEvent: {
      layout: { x, y },
    },
  }) => {
    this.binLayout = {
      x,
      y: y + HEADER_HEIGHT,
    };
  };

  /**
   * We define the drop zone as the area where the two boundingRects (bin and square) intersect
   * If we drop the square inside the drop zone, we simulate the Instagram story animation
   * @param x
   * @param y
   * @returns {boolean}
   */
  isInDropZone(x, y) {
    return (
      ((this.binLayout.y - y <= SQUARE_SIDE && this.binLayout.y - y > 0) ||
        Math.abs(y - this.binLayout.y) < BIN_SIZE) &&
      ((this.binLayout.x - x <= SQUARE_SIDE && this.binLayout.x - x > 0) ||
        Math.abs(x - this.binLayout.x) < BIN_SIZE)
    );
  }

  snapToDeletionAnimation({ translateX, translateY, scale, x, y }) {
    this.setState(
      {
        isDeleting: true,
      },
      () => {
        Vibration.vibrate(200);
        Animated.stagger(100, [
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: this.binLayout.x - x - BIN_SIZE / 2,
              duration: 300,
              useNativeDriver: USE_NATIVE_DRIVER,
            }),
            Animated.timing(translateY, {
              toValue: this.binLayout.y - y - BIN_SIZE / 2,
              duration: 300,
              useNativeDriver: USE_NATIVE_DRIVER,
            }),
          ]),
          Animated.timing(scale, {
            toValue: 0,
            duration: 200,
            useNativeDriver: USE_NATIVE_DRIVER,
          }),
        ]).start(() => {
          this.setState({
            isDeleting: false,
          });
        });
      },
    );
  }

  handleGestureEnd = ({ id, scale, translateX, translateY }) => {
    const boxToMeasure = id === 'BOX1' ? this.box1 : this.box2;
    boxToMeasure._component.measureInWindow((x, y) => {
      if (this.isInDropZone(x, y)) {
        this.snapToDeletionAnimation({ translateX, translateY, scale, x, y });
      }
    });
  };

  render() {
    const { isDeleting } = this.state;
    return (
      <View style={styles.fill}>
        <DraggableBox
          id="BOX1"
          style={styles.box}
          onGestureEnd={this.handleGestureEnd}
          getRef={ref => (this.box1 = ref)}
        />
        <DraggableBox
          id="BOX2"
          style={styles.box2}
          onGestureEnd={this.handleGestureEnd}
          getRef={ref => (this.box2 = ref)}
        />
        <View
          style={[
            styles.iconWrapper,
            { borderColor: isDeleting ? 'red' : '#BDBDBD' },
          ]}
          onLayout={this.calculateBinLayout}
        >
          <Icon
            name="delete"
            size={30}
            color={isDeleting ? 'red' : 'black'}
            style={styles.icon}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: SQUARE_SIDE,
    height: SQUARE_SIDE,
    backgroundColor: 'plum',
    zIndex: 1,
  },
  box2: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: SQUARE_SIDE,
    height: SQUARE_SIDE,
    backgroundColor: 'green',
    zIndex: 2,
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 100,
    left: (Dimensions.get('screen').width - 30) / 2,
    width: BIN_SIZE,
    height: BIN_SIZE,
    borderRadius: BIN_SIZE / 2,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
});
