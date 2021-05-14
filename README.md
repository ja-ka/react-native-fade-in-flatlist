# react-native-fade-in-flatlist

Advanced React Native FlatList component with fade-in support for rendered items.

## Table of Contents

[Getting Started](#getting-started)

[Usage](#usage)

[Examples](#examples)

[Props](#props)

[To Do](#to-do)

## Getting Started

```bash
$ npm install @ja-ka/react-native-fade-in-flatlist --save
```

or

```bash
$ yarn add @ja-ka/react-native-fade-in-flatlist
```

## Usage

Repace React Native's `FlatList` component with `FadeInFlatList` imported from `@ja-ka/react-native-fade-in-flatlist`:

```javascript
// Your code with React Native FlatList
import { FlatList } from 'react-native';

<FlatList 
  data={DATA}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
/>
```

```javascript
// Your code with @ja-ka/react-native-fade-in-flatlist
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';

<FadeInFlatList 
  data={DATA}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
/>
```

## Examples

|Example 1|Example 2|Example 3|
|:---:|:---:|:---:|
|<img src="assets/i0_d500_p1.gif" alt="drawing" height="600" width="277"/>|<img src="assets/i0_d500_p5.gif" alt="drawing" height="600" width="277"/>|<img src="assets/i1000_d2000_p3.gif" alt="drawing" height="600" width="277"/>|

```javascript
// Example 1
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';

<FadeInFlatList 
  initialDelay={0}
  durationPerItem={500}
  parallelItems={1}
  itemsToFadeIn={10}
  data={DATA}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
/>
```

```javascript
// Example 2
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';

<FadeInFlatList 
  initialDelay={0}
  durationPerItem={500}
  parallelItems={5}
  itemsToFadeIn={10}
  data={DATA}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
/>
```

```javascript
// Example 3
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';

<FadeInFlatList 
  initialDelay={1000}
  durationPerItem={2000}
  parallelItems={3}
  itemsToFadeIn={10}
  data={DATA}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
/>
```

## Props

- [Inherited `FlatList` props...](https://reactnative.dev/docs/flatlist#props)
- [`initialDelay`](#initialdelay)
- [`durationPerItem`](#durationperitem)
- [`parallelItems`](#parallelitems)
- [`itemsToFadeIn`](#itemstofadein)

## To do

- [ ] Animate FlatList separator

# Props

## `initialDelay`

Initial delay in milliseconds before the first item is rendered.

|Type|Requried|Default|
|---|---|---|
|number|no|0|

## `durationPerItem`

Time in milliseconds until the item is fully visible (opacity is 1).

|Type|Requried|Default|
|---|---|---|
|number|no|50|

## `parallelItems`

Number of items to be rendered in parallel. In case of `parallelItems={1}`, the next item starts to fade in only when the previous item is fully visible. In case of `parallelItems={2}`, the second items starts fading in when the previous item is half-visible (opacity is 0.5). In general, the next item starts fading in when the opacity of the previous item is equal to or greater than 1 / paralleLitems.

|Type|Requried|Default|
|---|---|---|
|number|no|1|

## `itemsToFadeIn`

Number of items to fade in. All items where index + 1 is greater than `itemsToFadeIn` are immediately visible.

|Type|Requried|Default|
|---|---|---|
|number|no|10|

# License

This library is published under the [MIT License](https://github.com/ja-ka/react-native-fade-in-flatlist/blob/master/LICENSE).