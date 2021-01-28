---
title: JavaScript
---

https://doesitmutate.xyz

https://lorenstewart.me/2017/01/22/javascript-array-methods-mutating-vs-non-mutating/


## console.group

https://developer.mozilla.org/en-US/docs/Web/API/Console/group

```
console.group('label')
console.log(...)
console.log(...)
console.groupEnd()
```


## Object.assign

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

Can be used to copy an object changing a property it without modifying it.

Eg to toggle 'complete' of an object in a Redux reducer without modifying it:

`Object.assign({}, todo, {complete: !todo.complete})`

This creates a new object {}, merges all the properties of the 'todo' object into this new object, and then overrides the 'complete' property. The original 'todo' object is not modified, so the reducer is pure.


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
