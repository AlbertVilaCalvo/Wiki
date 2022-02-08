---
title: JavaScript
---

https://doesitmutate.xyz

https://lorenstewart.me/2017/01/22/javascript-array-methods-mutating-vs-non-mutating/

`npx code-complexity . --limit 20 --sort ratio` - https://www.kevinpeters.net/the-fastest-way-to-understand-new-code-bases

In JavaScript `typeof null` is "object".


## JSDoc

https://jsdoc.app

https://devhints.io/jsdoc


## console

- Use console.log() like a pro: [Hacker News](https://news.ycombinator.com/item?id=26779800) - [Article](https://markodenic.com/use-console-log-like-a-pro/)
- Advanced console.log Tips & Tricks: [Hacker News](https://news.ycombinator.com/item?id=27499335) - [Article](https://medium.com/nmc-techblog/advanced-console-log-tips-tricks-fa3762930bca)

### console.group

https://developer.mozilla.org/en-US/docs/Web/API/Console/group

```js
console.group('label')
console.log(...)
console.log(...)
console.groupEnd()
```


## Object

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

### `delete` operator

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete


### `Object.entries()`

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

```js
const user = {
  name: 'Joe',
  age: 42
}
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
```

### `Object.assign()`

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

Can be used to copy an object changing a property without modifying it.

Eg to toggle 'complete' of an object in a Redux reducer without modifying it:

`const newTodo = Object.assign({}, todo, {complete: !todo.complete})`

This creates a new object {}, merges all the properties of the 'todo' object into this new object, and then overrides the 'complete' property. The original 'todo' object is not modified, so the reducer is pure.


## Array

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

### Get first N elements

`items.slice(0, MAX_COUNT)`

Does not mutate. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

### Sort (eg by date)

```ts
export interface Item {
    date: number; // time in millis, eg 1622451442822
}

function sortByDate(a: Item, b: Item): number {
    return a.date - b.date // oldest first
    return b.date - a.date // newest first
}

items.sort(sortByDate)
```

### Delete an item with `items.splice(index, 1)`

We need the index of the item. If we have the item, use `indexOf`: `items.splice(items.indexOf(item), 1)`.

Otherwise use `findIndex` to find the index:

```
const index = items.findIndex((item) => item.id === id)
if (index !== -1) {
  items.splice(index, 1)
}
```


## Promise

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

```js
Api.fetchUser = function () {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(user)
    }, 2000)
  })
}
```

### Promise.all() and Promise.allSettled()

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

- Promise.all() resolves when (waits until) all promises resolve, and rejects immediately if any promise rejects.
- Promise.allSettled() resolves when (waits until) all promises have either fulfilled or rejected.

```js
Promise.all([
  Api.fetchUser(),
  Api.fetchPosts()
]).then(([user, posts]) => {
  console.log('user', user)
  console.log('posts', posts)
}).catch(error => {
  console.log(error)
})
```

```js
Promise.allSettled([
  Api.fetchUser(),
  Api.fetchPosts()
]).then(([userResult, postsResult]) => {
  console.log('user result', userResult) // {status: "fulfilled", value: {username: 'albert'}},
  console.log('posts result', postsResult) // {status: "rejected",  reason: Error: some error happened}
})
```


## String

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

:::warning
[substr()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) is deprecated. Use [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) instead.
:::

[startsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

[endsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)


## Dates

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl


### Date format

https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

[Date.prototype.toLocaleDateString() at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

`toLocaleString` options: https://www.jsman.net/manual/Standard-Global-Objects/Date/toLocaleString

```
new Date(search.date).toLocaleDateString() -> 5/27/2021
new Date(search.date).toLocaleDateString('es-ES') -> 27/5/2021
```


## Regex

Name capture groups: https://twitter.com/addyosmani/status/1386031624232456194
