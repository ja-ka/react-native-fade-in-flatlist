import React from 'react';
import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, FlatListProps, ListRenderItemInfo, FlatList } from 'react-native';

const FadeInFlatList = <ItemT,>({
  renderItem: originalRenderItem,
  itemsToFadeIn = 10,
  initialDelay = 0,
  durationPerItem = 50,
  parallelItems = 1,
  ...props
}: FlatListProps<ItemT> & {
  itemsToFadeIn?: number;
  initialDelay?: number;
  durationPerItem?: number;
  parallelItems?: number;
}): ReactElement => {
  const value = useRef(new Animated.Value(0));

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ItemT>): React.ReactElement | null => {
      const { index } = info;
      const moveBy = (1 - 1 / parallelItems) * index;
      return index < itemsToFadeIn ? (
        <Animated.View
          style={{
            opacity: value.current.interpolate({
              inputRange:
                info.index === 0
                  ? [-1, 0, 1, 2]
                  : [index - 1 - moveBy, index - moveBy, index + 1 - moveBy, index + 2 - moveBy],
              outputRange: [0, 0, 1, 1],
              extrapolate: 'clamp',
            }),
          }}>
          {originalRenderItem!(info)}
        </Animated.View>
      ) : (
        originalRenderItem!(info)
      );
    },
    [originalRenderItem, itemsToFadeIn],
  );

  useEffect(() => {
    value.current.setValue(0);

    Animated.timing(value.current, {
      toValue: itemsToFadeIn + 1,
      useNativeDriver: true,
      delay: initialDelay,
      duration: itemsToFadeIn * durationPerItem,
      easing: Easing.linear,
    }).start();
  }, [initialDelay, durationPerItem, itemsToFadeIn]);

  return <FlatList {...props} renderItem={renderItem} />;
};

export default FadeInFlatList;
