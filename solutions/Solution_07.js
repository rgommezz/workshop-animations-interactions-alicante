import * as React from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  UIManager,
  LayoutAnimation,
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

  renderActions = style => (
    <View style={style}>
      <Icon name="archive" size={30} color="#fff" style={styles.actionIcon} />
    </View>
  );

  /**
   * Here we can play with the different options for whether animating the removal of the item or not
   */
  onSwipeableOpen = () => {
    // ######## OPTION 1 ########
    // This works nicely on iOS but not in Android.
    // There is a glitch, where the green background is visible in all rows during the transition
    // LayoutAnimation.configureNext(
    //   LayoutAnimation.create(
    //     200,
    //     LayoutAnimation.Types.easeInEaseOut,
    //     LayoutAnimation.Properties.opacity,
    //   ),
    // );
    // this.props.onItemDismissed(this.props.index);

    // ######## OPTION 2 ########
    // This would emulate Gmail behaviour, where the row that is being removed decreases his height till the one below collapses.
    // The downside is performance, since animating height can't be delegated into the native driver and
    // the performance degradation is proportional to the number of items in the list.
    // Although in production is should run fine
    Animated.timing(this.animatedStyle, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      this.props.onItemDismissed(this.props.index);
    });

    // ######## OPTION 3 ########
    // No animation during removal
    // this.props.onItemDismissed(this.props.index);
  };

  render() {
    const { item } = this.props;
    return (
      <Swipeable
        friction={1}
        leftThreshold={Dimensions.get('screen').width / 2}
        rightThreshold={Dimensions.get('screen').width / 2}
        renderLeftActions={() => this.renderActions(styles.leftAction)}
        renderRightActions={() => this.renderActions(styles.rightAction)}
        onSwipeableLeftOpen={this.onSwipeableOpen}
        onSwipeableRightOpen={this.onSwipeableOpen}
      >
        <Row
          item={item}
          style={{
            height: this.animatedStyle,
          }}
        />
      </Swipeable>
    );
  }
}

export default class Solution07 extends React.Component {
  state = {
    data: DATA,
  };

  handleItemDismissed = index => {
    this.setState(({ data }) => ({
      data: [...data.slice(0, index), ...data.slice(index + 1)],
    }));
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
