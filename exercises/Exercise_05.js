import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import {
  DefaultTheme,
  FAB,
  Provider as PaperProvider,
} from 'react-native-paper';

const data = Array.from({ length: 24 }).map(
  (_, i) => `https://unsplash.it/300/300/?random&__id=${i}`,
);

const photoSize = Dimensions.get('window').width / 2;

export default class Exercise05 extends React.Component {
  // Init the instance fields you need for your animation

  _keyExtractor = item => item;

  _renderItem = ({ item }) => (
    <View key={item} style={styles.item}>
      <Image source={{ uri: item }} style={styles.photo} />
    </View>
  );

  _animate = (/* visible */) => {
    // Implement the translation animation function that will be reused
  };

  _handleScroll = () => {
    // You need to use instance fields to check whether we are scrolling up or down
    // It will also be good to have a variable to remember last movement, so we do not animate
    // if it is not necessary
  };

  render() {
    return (
      <PaperProvider theme={DefaultTheme}>
        <View style={styles.container}>
          {/* FlatList should be Animated */}
          <FlatList
            data={data}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={2}
            contentContainerStyle={styles.list}
          />
          <FAB icon="add" onPress={() => {}} style={styles.fab} dark />
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    height: photoSize,
    width: photoSize,
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
  list: {
    paddingBottom: 56 + 16 + 16,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
  },
});
