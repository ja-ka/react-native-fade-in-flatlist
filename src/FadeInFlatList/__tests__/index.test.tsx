import React from 'react';
import { Text } from 'react-native';
import { render, act } from '@testing-library/react-native';
import FadeInFlatList from '../index';

const DATA = [{ id: 42 }, { id: 43 }];
const renderItem = ({ item }: any) => <Text>{item.id}</Text>;
const keyExtractor = ({ id }: { id: number }) => id.toString();

it('should render the c<omponent', async () => {
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

  await act(async () => {});

  expect(toJSON()).toMatchSnapshot();
});

it('should use defaults', async () => {
  const { toJSON } = render(
    <FadeInFlatList data={DATA} renderItem={renderItem} keyExtractor={keyExtractor} />,
  );

  await act(async () => {});

  expect(toJSON()).toMatchSnapshot();
});
