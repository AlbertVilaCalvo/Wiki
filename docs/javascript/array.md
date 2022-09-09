---
title: JavaScript Array
sidebar_label: Array
---

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

Methods: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods

## Mutation

https://doesitmutate.xyz

https://lorenstewart.me/2017/01/22/javascript-array-methods-mutating-vs-non-mutating/

Immutability isn't free: https://swizec.com/blog/immutability-isnt-free/

> For the inner loop we replaced array spread for each group of slots with an array.push, which mutates an array in-place. Becoming an O(1) operation.

> Instead of creating a new copy of the whole array on every iteration, we push data to the result array in-place. Turning an O(n^2) reduce statement into O(n).

## Array.isArray()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

```js
Array.isArray([]) // true
Array.isArray('a') // false
```

## Get the first N elements

`items.slice(0, MAX_COUNT)`

Does not mutate. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

## Sort (eg by date)

_Mutates_

```ts
export interface Item {
  date: number // time in millis, eg 1622451442822
}

function sortByDate(a: Item, b: Item): number {
  return a.date - b.date // oldest first
  return b.date - a.date // newest first
}

items.sort(sortByDate)
```

## Delete an item with `items.splice(index, 1)`

_Mutates_

We need the index of the item. If we have the item, use `indexOf`: `items.splice(items.indexOf(item), 1)`.

Otherwise, use `findIndex` to find the index:

```js
const index = items.findIndex((item) => item.id === id)
if (index !== -1) {
  items.splice(index, 1)
}
```

## at()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

When using 0 or positive integers, it does not offer any advantage over the square bracket notation. The only difference is that `at()` supports negative integers.

```js
const items = ['a', 'b', 'c']

items.at(-1) // 'c'
items[-1] // undefined

items.at(-2) // 'b'
items[-2] // undefined
```

So instead of doing `items[items.length - 1]` we can just do `items.at(-1)`.

## every()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

<!-- prettier-ignore -->
```js
[1, 2].every(i => i > 0) // true
[-1, 2].every(i => i > 0) // false
```

## find()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

Returns the first element that satisfies the predicate or `undefined`.

<!-- prettier-ignore -->
```js
['a', 'b'].find(i => i.length > 0) // 'a'
['a', 'b'].find(i => i.length > 10) // undefined
```

[`findLast()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast) starts by the end:

<!-- prettier-ignore -->
```js
['a', 'b'].findLast(i => i.length > 0) // 'b'
['a', 'b'].findLast(i => i.length > 10) // undefined
```

## findIndex()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

Returns the index of the first element that satisfies the predicate or -1.

<!-- prettier-ignore -->
```js
['a', 'b'].findIndex(i => i.length > 0) // 0
['a', 'b'].findIndex(i => i.length > 10) // -1
```

[`findLastIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex) starts by the end:

<!-- prettier-ignore -->
```js
['a', 'b'].findLastIndex(i => i.length > 0) // 1
['a', 'b'].findLastIndex(i => i.length > 10) // -1
```

## includes()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

<!-- prettier-ignore -->
```js
[1, 2].includes(2) // true
[1, 2].includes(3) // false
```

## indexOf()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

A simpler way to do `['a', 'b'].findIndex(i => i === 'a')`. It takes an _item_ instead of a _function_.

<!-- prettier-ignore -->
```js
['a', 'b'].indexOf('a') // 0
['a', 'b'].indexOf('c') // -1
```

## some()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

<!-- prettier-ignore -->
```js
[1, 2].some(i => i > 0) // true
[-1, 2].some(i => i > 0) // true
[-1, -2].some(i => i > 0) // false
```
