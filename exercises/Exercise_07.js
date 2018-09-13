import * as React from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  UIManager,
} from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const ROW_HEIGHT = 80;

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

class Row extends React.Component {
  render() {
    const { item, style } = this.props;
    return (
      <AnimatedRectButton
        style={[styles.rectButton, style]}
        onPress={() => Alert.alert(item.from)}
      >
        <Text style={styles.fromText}>{item.from}</Text>
        <Text numberOfLines={2} style={styles.messageText}>
          {item.message}
        </Text>
        <Text style={styles.dateText}>
          {item.when} {'❭'}
        </Text>
      </AnimatedRectButton>
    );
  }
}

class SwipeableRow extends React.Component {
  animatedStyle = new Animated.Value(ROW_HEIGHT);
  renderActions = style => {
    // 2. Here you'll return a component that will be shown underneath the row (left or right) when we are swiping it.
    // Use this method for both locations.
    // Hint: Check https://kmagiera.github.io/react-native-gesture-handler/docs/component-swipeable.html#properties
    // to see which prop fits.
    // We want to show a white archive icon with a green background (Gmail style). Use Icon component provided on the top
    // Pass styles.leftAction to the left and styles.rightAction to the right actions renderer.
  };

  onSwipeableOpen = () => {
    // 3. Callback executed when we swipe the row over the threshold. Use this for both left and right.
    // Here we should communicate back to the parent to indicate which item we are removing.
    // Also, animate the height of the row that is being dismissed to 0 to simulate Gmail behaviour
    // Hint: use the prop onItemDismissed
  };

  render() {
    // 1. We should wrap our Row with the Swipeable component provided by RN gesture handler.
    // We want as little friction as possible and a threshold of screenWidth / 2 for both directions
    const { item } = this.props;
    return (
      <Row
        item={item}
        style={{
          height: this.animatedStyle,
        }}
      />
    );
  }
}

// Proceed with this component once you address everything inside SwipeableRow and you are able to swipe the rows
// and see the green background underlay with the icons
export default class Exercise07 extends React.Component {
  state = {
    data: DATA,
  };

  handleItemDismissed = index => {
    // 4. Here we should update the state accordingly.
    // Hint: use slice to not mutate the array, but rather return a new one
    // Hint: having foo=['a','b','c','d'], slice(0,1) would return ['a'] and slice(2) ['c','d']
  };

  render() {
    return (
      <FlatList
        style={styles.flatList}
        data={this.state.data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <SwipeableRow
            item={item}
            index={index}
            onItemDismissed={this.handleItemDismissed}
          />
        )}
        keyExtractor={(item, index) => `${index} ${item.from}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    backgroundColor: 'white',
  },
  rectButton: {
    flex: 1,
    height: ROW_HEIGHT,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    marginBottom: 10,
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
  leftAction: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#388e3c',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'flex-end',
    backgroundColor: '#388e3c',
    flex: 1,
    justifyContent: 'center',
  },
});

const DATA = [
  {
    from: "D'Artagnan",
    when: '3:11 PM',
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    from: 'Aramis',
    when: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    from: 'Athos',
    when: '6:06 AM',
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    from: 'Porthos',
    when: 'Yesterday',
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
  {
    from: 'Domestos',
    when: '2 days ago',
    message:
      'Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.',
  },
  {
    from: 'Cardinal Richelieu',
    when: '2 days ago',
    message:
      'Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.',
  },
  {
    from: "D'Artagnan",
    when: 'Week ago',
    message:
      'Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.',
  },
  {
    from: 'Cardinal Richelieu',
    when: '2 weeks ago',
    message:
      'Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ',
  },
];
