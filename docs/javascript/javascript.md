---
title: JavaScript
---

`npx code-complexity . --limit 20 --sort ratio` - https://www.kevinpeters.net/the-fastest-way-to-understand-new-code-bases

Copilot instructions - https://github.com/github/awesome-copilot/blob/main/instructions/nodejs-javascript-vitest.instructions.md

In JavaScript `typeof null` is "object".

Deep JS - https://exploringjs.com/deep-js/

https://stateofjs.com/en-US

## Libraries

### Validation

See comparison here: https://github.com/colinhacks/zod#comparison

- https://github.com/validatorjs/validator.js
  - Express middleware: https://github.com/express-validator/express-validator
    - https://medium.com/dataseries/introduction-to-request-body-validation-in-express-apps-with-express-validator-7b9725ca780d
- https://github.com/hapijs/joi
  - Express middleware: https://github.com/arb/celebrate
- https://github.com/jquense/yup
- https://github.com/colinhacks/zod
- https://github.com/typestack/class-validator (uses decorators)
- https://github.com/gcanti/io-ts

JSON (eg JSON request and responses):

- https://github.com/sinclairzx81/typebox
- https://github.com/ajv-validator/ajv

## JSDoc

https://jsdoc.app

https://devhints.io/jsdoc

## TC39

https://github.com/tc39

https://tc39.es

ECMAScript Language Specification: https://tc39.es/ecma262/

ECMAScript Proposals: https://github.com/tc39/proposals

https://twitter.com/tc39

## `==` vs `===` and `!=` vs `!==`

:::info
There is also [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) that _"does no type conversion and no special handling for NaN, -0, and +0 (giving it the same behavior as === except on those special numeric values)"_ [source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
:::

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness

https://stackoverflow.com/a/55822553/4034572

```js
null == undefined // true
null === undefined // false

null != undefined // false
null !== undefined // true
```

## console

Spec: https://console.spec.whatwg.org/

https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/

Use %i (integer), %f (float), %s (string) for type conversions: https://twitter.com/addyosmani/status/1535706659128868864

- Use console.log() like a pro: [Hacker News](https://news.ycombinator.com/item?id=26779800) - [Article](https://markodenic.com/use-console-log-like-a-pro/)
- Advanced console.log Tips & Tricks: [Hacker News](https://news.ycombinator.com/item?id=27499335) - [Article](https://medium.com/nmc-techblog/advanced-console-log-tips-tricks-fa3762930bca)
- Debugging JavaScript: Beyond console.log(): https://suze.dev/blog/debugging-javascript-beyond-console-log/

### CSS style

```js
console.log(
  '%cSome Text',
  'color: red; font-size: 30px; background-color: yellow;'
)
```

- How do I create formatted javascript console log messages? - https://stackoverflow.com/questions/22155879/how-do-i-create-formatted-javascript-console-log-messages
- Console.log with CSS Style - https://dev.to/annlin/consolelog-with-css-style-1mmp

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

### Print objects to the console preserving undefined

This is for React Native.

```ts
/**
 * Use it to print objects to the console preserving undefined values.
 * Usage: `console.log('User', prettyPrint(user))`.
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

### `structuredClone`

https://developer.mozilla.org/en-US/docs/Web/API/structuredClone

Note that it also works with arrays.

See https://www.linkedin.com/feed/update/urn:li:activity:7086378041525825536/

### Conditionally add field

https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object

```js
const user = { name: 'Pere' }
if (condition) {
  user.age = 42
}
```

```js
const user = {
  name: 'Pere',
  ...(condition && { age: 42 }),
}
```

## Classes

https://webreflection.medium.com/js-classes-are-not-just-syntactic-sugar-28690fedf078

## Error

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

`Error('message')` and `new Error('message')` is the same.

> When Error is used like a function -- without `new`, it will return an `Error` object. Therefore, a mere call to `Error` will produce the same output that constructing an `Error` object via the `new` keyword would. [source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error#function_call_or_new_construction)

Rethrow an error but with a different message: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error#rethrowing_an_error_with_a_cause

Handle errors in a simple, stable, consistent way: https://github.com/ehmicky/modern-errors

:::tip
[`Error.isError()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/isError) is a more robust alternative to `instanceof Error` because it avoids false positives and false negatives.
:::

## AbortController

https://developer.mozilla.org/en-US/docs/Web/API/AbortController

https://www.bennadel.com/blog/4200-using-fetch-abortsignal-and-settimeout-to-apply-retry-mechanics-in-javascript.htm

https://stackoverflow.com/a/65805464/4034572

## String

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

:::danger
[substr()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) is deprecated. Use [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) instead.
:::

[startsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

[endsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)

## Regex

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

Regex syntax cheatsheet: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet

https://devdocs.io/javascript-regexp/

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

JS Dates Are About to Be Fixed - https://docs.timetime.in/blog/js-dates-finally-fixed/

### Date format

https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript

[Date.prototype.toLocaleDateString() at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

`toLocaleString` options: https://www.jsman.net/manual/Standard-Global-Objects/Date/toLocaleString

```js
new Date(search.date).toLocaleDateString() // 5/27/2021
new Date(search.date).toLocaleDateString('es-ES') // 27/5/2021
```

### `Intl.DateTimeFormat`

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

_Important: does not work on React Native Android._ You get the error "Can't find variable: Intl". See solutions at https://stackoverflow.com/questions/56943813/using-intl-properly-in-android-react-native-app. _Update November 2022: Hermes does support Intl, see https://hermesengine.dev/docs/intl. Hermes is the default since 0.70 - see https://reactnative.dev/blog/2022/09/05/version-070#hermes-as-default-engine and https://reactnative.dev/blog/2022/07/08/hermes-as-the-default. On Expo, since SDK 47 - see https://blog.expo.dev/expo-sdk-47-a0f6f5c038af._

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

### `Intl.DurationFormat`

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat

New API. Added in preview in Firefox 136 (released March 2025).
