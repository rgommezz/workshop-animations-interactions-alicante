import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import * as exercises from './exercises';
import * as solutions from './solutions';

console.ignoredYellowBox = [
  'Warning: Failed prop type: Invalid prop `onHandlerStateChange`',
  'Warning: isMounted',
];

const getScreens = module => {
  const screens = {};
  Object.keys(module).forEach(key => {
    screens[key.replace('_', '')] = {
      screen: module[key],
      navigationOptions: () => ({
        title: key.replace('_', ' '),
      }),
    };
  });
  return screens;
};

const SCREENS_EXERCISES = getScreens(exercises);
const SCREENS_SOLUTIONS = getScreens(solutions);

class MainScreen extends React.Component {
  render() {
    const data = Object.keys(this.props.screens).map(key => ({ key }));
    return (
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={props => (
          <MainScreenItem
            {...props}
            screens={this.props.screens}
            onPressItem={({ key }) => this.props.navigation.navigate(key)}
          />
        )}
        renderScrollComponent={props => <ScrollView {...props} />}
      />
    );
  }
}

const ItemSeparator = () => <View style={styles.separator} />;

class MainScreenItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.item);
  render() {
    const { key } = this.props.item;
    return (
      <RectButton style={styles.button} onPress={this._onPress}>
        <Text style={styles.buttonText}>
          {this.props.screens[key].navigationOptions().title || key}
        </Text>
      </RectButton>
    );
  }
}

const MainScreenExercises = props => (
  <MainScreen screens={SCREENS_EXERCISES} navigation={props.navigation} />
);

MainScreenExercises.navigationOptions = {
  title: '✌️Workshop Animations and Gestures',
};

const MainScreenSolutions = props => (
  <MainScreen screens={SCREENS_SOLUTIONS} navigation={props.navigation} />
);

MainScreenSolutions.navigationOptions = {
  title: '✌️Workshop Animations and Gestures',
};

const ExercisesStack = createStackNavigator(
  {
    Main: { screen: MainScreenExercises },
    ...SCREENS_EXERCISES,
  },
  {
    initialRouteName: 'Main',
  },
);

const SolutionsStack = createStackNavigator(
  {
    Main: { screen: MainScreenSolutions },
    ...SCREENS_SOLUTIONS,
  },
  {
    initialRouteName: 'Main',
  },
);

const MainNavigator = createBottomTabNavigator({
  Exercises: ExercisesStack,
  Solutions: SolutionsStack,
});

export default () => <MainNavigator persistenceKey={null} />;

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
