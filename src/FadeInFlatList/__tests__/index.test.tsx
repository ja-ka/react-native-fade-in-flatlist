import React, { FC, ReactElement, useEffect, useRef } from 'react';
import { FlatList, Text } from 'react-native';
import { render, act } from '@testing-library/react-native';
import FadeInFlatList from '../index';

const DATA: {id: number}[] = [{ id: 42 }, { id: 43 }];
const renderItem = ({ item }: any) => <Text>{item.id}</Text>;
const keyExtractor = (({ id }: { id: number }) => id.toString()) as any;

it('should render the component', async () => {
  const { toJSON } = render(
    <FadeInFlatList
      data={DATA}
      renderItem={renderItem}
      itemsToFadeIn={1}
      initialDelay={100}
      durationPerItem={100}
      keyExtractor={keyExtractor}
    />,
  );

  await act(async () => {
    // this is ok
  });

  expect(toJSON()).toMatchSnapshot();
});

it('uses separator', async () => {
  const Separator: FC = (): null => null;

  const { toJSON } = render(
    <FadeInFlatList
      data={DATA}
      renderItem={renderItem}
      itemsToFadeIn={1}
      initialDelay={100}
      durationPerItem={100}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Separator}
    />,
  );

  await act(async () => {
    // this is ok
  });

  expect(toJSON()).toMatchSnapshot();
});

it('should use defaults', async () => {
  const { toJSON } = render(
    <FadeInFlatList data={DATA} renderItem={renderItem} keyExtractor={keyExtractor} />,
  );

  await act(async () => {
    // this is ok
  });

  expect(toJSON()).toMatchSnapshot();
});

it('returns reference to ref', async () => {
  let called = 0;

  const MyComponent = (): ReactElement => {
    const listRef = useRef<FlatList>();

    useEffect(() => {
      called++;

      // @ts-expect-error possibly undefined
      listRef.current.scrollToEnd();
    }, []);

    return (
      <FadeInFlatList ref={listRef} data={DATA} renderItem={renderItem} keyExtractor={keyExtractor} />
    );
  };

  render(<MyComponent />);

  await act(async () => {
    // this is ok
  });

  expect(called).toBe(1);
});