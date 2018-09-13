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
// There is a bug on iOS with native driver, where the final snapping animation don't work as expected.
// Optionally, use this to leverage native driver on Android
const USE_NATIVE_DRIVER = Platform.OS === 'android';

export class DraggableBox extends Component {
  // 1. Initialise the appropriate animated values needed to model the (x,y) position of the box
  scale = new Animated.Value(1); // This will be used for the final snapping animation (deleting the square)
  lastOffset = { x: 0, y: 0 }; // Needed to keep track of the previous release positions

  shouldComponentUpdate() {
    return false;
  }

  onHandlerStateChange = event => {
    if (
      event.nativeEvent.oldState === State.ACTIVE &&
      event.nativeEvent.state === State.END
    ) {
      // 3. When we finished dragging the box, we need to update the animated values defined above.
      // Hint: the amount dragged on each coordinate can be obtained via event.nativeEvent.translationX (for X i.e)
      // Hint: you should use both setOffset and setValue(0) on the animated values you defined
      // Hint: I.e. offset on the coordinate X would be accumulated as (this.lastOffset.x += event.nativeEvent.translationX)

      this.props.onGestureEnd({
        id: this.props.id,
        scale: this.scale,
        // 4. After the animated values have been updated correctly, We'll pass them up to the parent,
        // so that it can trigger animations using static drivers
        // in case the box has been released inside the dropping area,
        // (replicating what Instagram does when dragging a widget to the bottom to remove it from a story)
      });
    }
  };

  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        {/* 2. Use onGestureEvent and Animated.event to wire up the native events translationX and translationY */}
        <Animated.View ref={this.props.getRef} style={[this.props.style]} />
      </PanGestureHandler>
    );
  }
}

// Once you complete steps 1,2,3 and 4, where you should be able to move the box around the screen,
// you can proceed with the remaining tasks for animating the drop zone
export default class Exercise_08 extends Component {
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

  /**
   * Triggers the animation for snapping and removing the box
   */
  snapToDeletionAnimation({ translateX, translateY, scale, x, y }) {
    this.setState(
      {
        isDeleting: true,
      },
      () => {
        Vibration.vibrate(200);
        // 7. Define the animation. We want first to move the box to the center of the bin (use a duration of 300ms).
        // After the 1st animation already run 100ms, do fire the 2nd animation: change the scale of the box from 1 to 0
        // Hint: Check Animated.stagger and Animated.parallel in the documentation. You'll need to use both
        // Hint: the toValue for translateX will be => this.binLayout.x - x - BIN_SIZE / 2. Same applies to translateY
        // replacing x with y

        // 8. Once the animation completes, change the state back to isDeleting: false
      },
    );
  }

  handleGestureEnd = ({ id, scale, translateX, translateY }) => {
    const boxToMeasure = id === '1' ? this.box1 : this.box2;
    // 5. We need to determine the absolute position of the box on the screen.
    // Hint: Check the end of https://facebook.github.io/react-native/docs/direct-manipulation
    // Hint: this.box1 and this.box2 both reference the animated wrapper. To access the wrapped component
    // You should use this.box1._component[method]

    // 6. Once we have access to x,y absolute positions of the box (in an async fashion), we need to determine whether
    // we are inside the dropping zone or not and if so, fire up the final animation (fill snapToDeletionAnimation method).
    // Hint: Use the helper method isInDropZone
  };

  render() {
    return (
      <View style={styles.fill}>
        <DraggableBox
          id="1"
          style={styles.box}
          onGestureEnd={this.handleGestureEnd}
          getRef={ref => (this.box1 = ref)}
        />
        <DraggableBox
          id="2"
          style={styles.box2}
          onGestureEnd={this.handleGestureEnd}
          getRef={ref => (this.box2 = ref)}
        />
        <View style={[styles.iconWrapper]} onLayout={this.calculateBinLayout}>
          {/* The color of the bin should be black (in normal state) or red (when deleting a box) */}
          {/* Same applies to the borderColor of the wrapper circle */}
          {/* Hint: use the local state */}
          <Icon name="delete" size={30} style={styles.icon} />
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
