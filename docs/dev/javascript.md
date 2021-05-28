---
title: JavaScript
---

https://doesitmutate.xyz

https://lorenstewart.me/2017/01/22/javascript-array-methods-mutating-vs-non-mutating/

`npx code-complexity . --limit 20 --sort ratio` - https://www.kevinpeters.net/the-fastest-way-to-understand-new-code-bases


## JSDoc

https://jsdoc.app

https://devhints.io/jsdoc


## console.group

https://developer.mozilla.org/en-US/docs/Web/API/Console/group

```
console.group('label')
console.log(...)
console.log(...)
console.groupEnd()
```

## `delete` operator

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete


## Object.assign

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

Can be used to copy an object changing a property it without modifying it.

Eg to toggle 'complete' of an object in a Redux reducer without modifying it:

`Object.assign({}, todo, {complete: !todo.complete})`

This creates a new object {}, merges all the properties of the 'todo' object into this new object, and then overrides the 'complete' property. The original 'todo' object is not modified, so the reducer is pure.


## Array

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

```
API.fetchUser = function () {
  return new Promise((res, rej) => {
    setTimeout(function () {
      res(user);
    }, 2000);
  });
};
```

Wait until all Promises have resolved:

```
Promise.all([
  API.fetchUser(),
  API.fetchPosts()
]).then(([user, posts]) => {
  console.log('User', user)
  console.log('Posts', posts)
})
```


## Date format

https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

[Date.prototype.toLocaleDateString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

```
new Date(search.date).toLocaleDateString() -> 5/27/2021
new Date(search.date).toLocaleDateString('es-ES') -> 27/5/2021
```


## Regex

Name capture groups: https://twitter.com/addyosmani/status/1386031624232456194
