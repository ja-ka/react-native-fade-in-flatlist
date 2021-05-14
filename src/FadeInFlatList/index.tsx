import React, { FC } from 'react';
import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, FlatListProps, ListRenderItemInfo, FlatList } from 'react-native';

const FadeInFlatList = <ItemT,>({
  renderItem: originalRenderItem,
  itemsToFadeIn = 10,
  initialDelay = 0,
  durationPerItem = 50,
  parallelItems = 1,
  ItemSeparatorComponent,
  ...props
}: FlatListProps<ItemT> & {
  itemsToFadeIn?: number;
  initialDelay?: number;
  durationPerItem?: number;
  parallelItems?: number;
}): ReactElement => {
  const value = useRef(new Animated.Value(0));

  const interpolate = (index: number) => {
    const moveBy = (1 - 1 / parallelItems) * index;

    return value.current.interpolate({
      inputRange:
        index === 0
          ? [-1, 0, 1, 2]
          : [index - 1 - moveBy, index - moveBy, index + 1 - moveBy, index + 2 - moveBy],
      outputRange: [0, 0, 1, 1],
      extrapolate: 'clamp',
    });
  };

  const FadeInComponent: FC<{ index: number }> = useCallback(
    ({ index, children }): ReactElement => (
      <Animated.View style={{ opacity: interpolate(index) }}>{children}</Animated.View>
    ),
    [],
  );

  const Separator: FC<{ index: number }> = useCallback(({ index }): ReactElement | null => {
    return ItemSeparatorComponent && index !== undefined ? (
      <FadeInComponent index={index}>
        <ItemSeparatorComponent />
      </FadeInComponent>
    ) : null;
  }, []);

  const Item: FC<{ info: ListRenderItemInfo<ItemT> }> = useCallback(({ info }): ReactElement => {
    useEffect(() => {
      info.separators.updateProps('leading', { index: info.index });
    }, []);

    return <FadeInComponent index={info.index}>{originalRenderItem!(info)}</FadeInComponent>;
  }, []);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ItemT>): React.ReactElement | null => {
      return info.index < itemsToFadeIn ? <Item info={info} /> : originalRenderItem!(info);
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

  return (
    <FlatList
      {...props}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent ? Separator : null}
    />
  );
};

export default FadeInFlatList;
