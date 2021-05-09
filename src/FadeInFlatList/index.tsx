import React from 'react';
import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, FlatListProps, ListRenderItemInfo, FlatList } from 'react-native';

const FadeInFlatList = <ItemT,>({
  renderItem: originalRenderItem,
  itemsToFadeIn = 10,
  initialDelay = 0,
  durationPerItem = 50,
  ...props
}: FlatListProps<ItemT> & {
  itemsToFadeIn?: number;
  initialDelay?: number;
  durationPerItem?: number;
}): ReactElement => {
  const value = useRef(new Animated.Value(0));

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ItemT>): React.ReactElement | null => {
      let element = originalRenderItem!(info);

      if (info.index < itemsToFadeIn) {
        element = (
          <Animated.View
            style={{
              opacity: value.current.interpolate({
                inputRange: [Math.max(0, info.index - 3), info.index + 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            }}>
            {element}
          </Animated.View>
        );
      }

      return element;
    },
    [originalRenderItem, itemsToFadeIn],
  );

  useEffect(() => {
    Animated.timing(value.current, {
      toValue: itemsToFadeIn,
      useNativeDriver: true,
      delay: initialDelay,
      duration: itemsToFadeIn * durationPerItem,
      easing: Easing.linear,
    }).start();
  }, [initialDelay, durationPerItem, itemsToFadeIn]);

  return <FlatList {...props} renderItem={renderItem} />;
};

export default FadeInFlatList;
