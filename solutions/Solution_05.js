import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {
  DefaultTheme,
  FAB,
  Provider as PaperProvider,
} from 'react-native-paper';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const data = Array.from({ length: 24 }).map(
  (_, i) => `https://unsplash.it/300/300/?random&__id=${i}`,
);

const photoSize = Dimensions.get('window').width / 2;
const fabSize = 56;

export default class Solution05 extends React.Component {
  offset = 0;
  isVisible = true;
  translateY = new Animated.Value(0);

  _keyExtractor = item => item;

  _renderItem = ({ item }) => (
    <View key={item} style={styles.item}>
      <Image source={{ uri: item }} style={styles.photo} />
    </View>
  );

  _animate = shouldBeVisible => {
    Animated.timing(this.translateY, {
      toValue: shouldBeVisible ? 0 : fabSize * 2,
      duration: 250,
      useNativeDriver: true,
    }).start(() => (this.isVisible = shouldBeVisible));
  };

  _handleScroll = event => {
    if (
      !this.isVisible &&
      (this.offset >= event.nativeEvent.contentOffset.y ||
        event.nativeEvent.contentOffset.y <= 0)
    ) {
      this._animate(true);
    } else if (
      this.isVisible &&
      (this.offset < event.nativeEvent.contentOffset.y &&
        event.nativeEvent.contentOffset.y > 0)
    ) {
      this._animate(false);
    }

    this.offset = event.nativeEvent.contentOffset.y;
  };

  render() {
    return (
      <PaperProvider theme={DefaultTheme}>
        <View style={styles.container}>
          <AnimatedFlatList
            data={data}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={2}
            onScroll={this._handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.list}
          />
          <FAB
            icon="add"
            onPress={() => {}}
            style={[
              styles.fab,
              { transform: [{ translateY: this.translateY }] },
            ]}
            dark
          />
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
