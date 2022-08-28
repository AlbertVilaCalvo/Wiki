---
title: JavaScript
---

`npx code-complexity . --limit 20 --sort ratio` - https://www.kevinpeters.net/the-fastest-way-to-understand-new-code-bases

In JavaScript `typeof null` is "object".

https://stateofjs.com/en-us/

## Libraries

### Validation

- https://github.com/hapijs/joi
- https://github.com/colinhacks/zod
- https://github.com/jquense/yup

## JSDoc

https://jsdoc.app

https://devhints.io/jsdoc

## TC39

https://github.com/tc39

https://tc39.es

ECMAScript Language Specification: https://tc39.es/ecma262/

ECMAScript Proposals: https://github.com/tc39/proposals

https://twitter.com/tc39

## Print objects

```js
/**
 * Prints the object to the console but preserving undefined values.
 * From https://stackoverflow.com/a/50100175/4034572.
 */
export function prettyPrint(object: any): string {
  return JSON.stringify(
    object,
    (k, v) => (v === undefined ? '__undefined' : v),
    2
  ).replace(/"__undefined"/g, 'undefined')
}
```

## console

Spec: https://console.spec.whatwg.org/

Use %i (integer), %f (float), %s (string) for type conversions: https://twitter.com/addyosmani/status/1535706659128868864

- Use console.log() like a pro: [Hacker News](https://news.ycombinator.com/item?id=26779800) - [Article](https://markodenic.com/use-console-log-like-a-pro/)
- Advanced console.log Tips & Tricks: [Hacker News](https://news.ycombinator.com/item?id=27499335) - [Article](https://medium.com/nmc-techblog/advanced-console-log-tips-tricks-fa3762930bca)
- Debugging JavaScript: Beyond console.log(): https://suze.dev/blog/debugging-javascript-beyond-console-log/

### console.group

https://developer.mozilla.org/en-US/docs/Web/API/Console/group

```js
console.group('label')
console.log(...)
console.log(...)
console.groupEnd()
```

### console.time

```js
console.time('label')
// ...
console.timeLog('label')
// ...
console.timeEnd('label')
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
  age: 42,
}
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`)
}
```

### `Object.assign()`

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

Can be used to copy an object changing a property without modifying it.

Eg to toggle 'complete' of an object in a Redux reducer without modifying it:

`const newTodo = Object.assign({}, todo, {complete: !todo.complete})`

This creates a new object {}, merges all the properties of the 'todo' object into this new object, and then overrides the 'complete' property. The original 'todo' object is not modified, so the reducer is pure.

## Error

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

`Error('message')` and `new Error('message')` is the same.

> When Error is used like a function -- without `new`, it will return an `Error` object. Therefore, a mere call to `Error` will produce the same output that constructing an `Error` object via the `new` keyword would. [source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error#function_call_or_new_construction)

Rethrow an error but with a different message: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error#rethrowing_an_error_with_a_cause

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

### Promise.reject()

```js
return Promise.reject(Error('reason'))
```

### Promise.all() and Promise.allSettled()

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

- Promise.all() resolves when (waits until) all promises resolve, and rejects immediately if any promise rejects.
- Promise.allSettled() resolves when (waits until) all promises have either fulfilled or rejected.

<!-- prettier-ignore -->
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

<!-- prettier-ignore -->
```js
Promise.allSettled([
  Api.fetchUser(),
  Api.fetchPosts()
]).then(([userResult, postsResult]) => {
  console.log('user result', userResult) // {status: "fulfilled", value: {username: 'albert'}},
  console.log('posts result', postsResult) // {status: "rejected",  reason: Error: some error happened}
})
```

### delay / timeout / sleep

```ts
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function fakeApiCall(): Promise<void> {
  return delay(2500)
}
```

```ts
function delay(ms: number): () => Promise<void> {
  return () => new Promise((resolve) => setTimeout(resolve, ms))
}

function fakeApiCall(): Promise<void> {
  return Promise.resolve().then(delay(2500))
}
```

```ts
function delay<T>(ms: number): (x: any) => Promise<T> {
  return (x: T) => new Promise((resolve) => setTimeout(resolve, ms, x))
}

function fakeApiCall(): Promise<number> {
  return Promise.resolve(33).then(delay<number>(2500))
}
```

## Abort

https://www.bennadel.com/blog/4200-using-fetch-abortsignal-and-settimeout-to-apply-retry-mechanics-in-javascript.htm

## String

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

:::warning
[substr()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) is deprecated. Use [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) instead.
:::

[startsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

[endsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)

## Regex

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

Regex syntax cheatsheet: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet

Name capture groups: https://twitter.com/addyosmani/status/1386031624232456194

In TypeScript use the type `RegExp`.

### `RegExp.prototype.test()`

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

```ts
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // From https://stackoverflow.com/a/9204568/4034572
  return regex.test(email)
}
```

### `RegExp.prototype.exec()`

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

```js
const regex = /abcd/gi
const string = 'something'
regex.exec(string)
// returns an array with the matches or null
```

### `String.prototype.match()`

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)

```js
const regex = /abcd/gi
const string = 'something'
string.match(regex)
// returns an array with the matches or null
```

## Dates

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

### Date format

https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript

[Date.prototype.toLocaleDateString() at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

`toLocaleString` options: https://www.jsman.net/manual/Standard-Global-Objects/Date/toLocaleString

```js
new Date(search.date).toLocaleDateString() // 5/27/2021
new Date(search.date).toLocaleDateString('es-ES') // 27/5/2021
```

### Intl.DateTimeFormat

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

_Important: does not work on React Native Android._ You get the error "Can't find variable: Intl". See solutions at https://stackoverflow.com/questions/56943813/using-intl-properly-in-android-react-native-app.

Example from https://stackoverflow.com/a/3552493/4034572:

```ts
export function formatDate(dateNumber: number): string {
  const dateObject = new Date(dateNumber)
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
    dateObject
  )
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(
    dateObject
  )
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
    dateObject
  )
  return `${day} ${month} ${year}`
}
```

`formatDate(1583495987)` returns `19 Jan 1970`.
