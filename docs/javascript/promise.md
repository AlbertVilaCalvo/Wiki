---
title: Promise
---

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

https://devdocs.io/javascript-promise/

The gotcha of unhandled promise rejections - https://jakearchibald.com/2023/unhandled-rejections

Practical Guide To Not Blocking The Event Loop - https://www.bbss.dev/posts/eventloop/

```js
Api.fetchUser = function () {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(user)
    }, 2000)
  })
}
```

## Promise.reject()

```js
return Promise.reject(Error('reason'))
```

## Promise.all() and Promise.allSettled()

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

How to implement `Promise.all()`, `Promise.allSettled()` etc: https://javascript.plainenglish.io/i-lost-a-job-opportunity-just-because-of-promise-all-be396f6efe87

### Filter `Promise.allSettled` results

````ts
/**
 * Use it to convert a result of `Promise.allSettled` to the type `PromiseFulfilledResult`.
 * Usage:
 * ```
 * const results = await Promise.allSettled(promises)
 * results.filter(isFulfilled).map(result => result.value)
 * ```
 * From https://stackoverflow.com/a/73913774/4034572.
 */
export function isFulfilled<T>(
  result: PromiseSettledResult<T>
): result is PromiseFulfilledResult<T> {
  return result.status === 'fulfilled'
}

/**
 * Use it to convert a result of `Promise.allSettled` to the type `PromiseRejectedResult`.
 * Usage:
 * ```
 * const results = await Promise.allSettled(promises)
 * results.filter(isRejected).map(result => result.reason)
 * ```
 * From https://stackoverflow.com/a/73913774/4034572.
 */
export function isRejected<T>(
  result: PromiseSettledResult<T>
): result is PromiseRejectedResult {
  return result.status === 'rejected'
}
````

## delay / timeout / sleep

```ts
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function fakeApiCall(): Promise<void> {
  return delay(2500)
}

function delayedApiCall(): Promise<Something> {
  return delay(2500).then(Api.getSomething())
}

// To test errors do
function delayedError(): Promise<void> {
  return delay(2500).then(() => {
    throw new Error('Boom')
  })
}

// To test 2 errors and then a success do
let failures = 0
function delayedError(): Promise<void> {
  return delay(2500).then(() => {
    failures++
    if (failures < 3) {
      throw new Error('Boom')
    }
  })
}

// We can use it on button clicks
;<Button
  onPress={async () => {
    await delay(2500)
    login()
  }}
>
  Login
</Button>
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

## `try-catch` only 'catches' errors if you `await`

```js
function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('setTimeout error')
    }, 2000)
  })
}

async function main() {
  try {
    doSomething() // <- Missing 'await' here!
  } catch (error) {
    console.error('try-catch worked :) - error:', error)
  }
}

main().then(() => {
  console.log('Done!')
})
```

Running it with `node index.js` will give:

```
Done!
node:internal/process/promises:288
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "setTimeout error".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
```

The `try-catch` does not have any effect (ie it does not catch the error) and the program crashes due to `UnhandledPromiseRejection`. Also, "Done!" is printed immediately since we don't wait for `doSomething()` to finish.

If you add `await` before `doSomething()` it works correctly:

```
try-catch worked :) - error: setTimeout error
Done!
```

It waits 2 seconds before printing "try-catch worked :) - error: setTimeout error" and then immediately after "Done!".
