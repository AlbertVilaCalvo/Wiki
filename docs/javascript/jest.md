---
title: Jest
---

https://github.com/facebook/jest

https://jestjs.io/

From https://create-react-app.dev/docs/running-tests:

> Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser. This lets us enable fast iteration speed and prevent flakiness.
>
> While Jest provides browser globals such as `window` thanks to [jsdom](https://github.com/tmpvar/jsdom), they are only approximations of the real browser behavior. Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.
>
> We recommend that you use a separate tool for browser end-to-end tests if you need them. They are beyond the scope of Create React App.

## CLI

https://jestjs.io/docs/cli

```bash
# Run all tests once
npx jest

# Watch mode
npx jest --watch

# File name
npx jest AuthController
# We can have a path too
npx jest auth/AuthController

# Directory
npx jest src/auth

# Test name - see https://jestjs.io/docs/cli#--testnamepatternregex
npx jest -t=^GET /products
npx jest --testNamePattern=^GET /products

# Git changed/uncommitted files - see https://jestjs.io/docs/cli#--onlychanged
npx jest -o
npx jest --onlyChanged

# Print code coverage - see https://jestjs.io/docs/cli#--coverageboolean
npx jest --coverage
```

## Setup

```bash
npm i -E -D jest
npx jest --init # creates jest.config.ts
```

## With TypeScript

https://github.com/kulshekhar/ts-jest

https://kulshekhar.github.io/ts-jest/

To do the setup follow https://kulshekhar.github.io/ts-jest/docs/getting-started/installation

```bash
npm i -D -E jest @types/jest ts-jest
```

Doing `npx ts-jest config:init` "will create a basic Jest configuration file which will inform Jest about how to handle `.ts` files correctly.".

The resulting file of `npx ts-jest config:init` is very basic. It's better to do `npx jest --init` which creates `jest.config.ts` but "add the line `preset: "ts-jest"` to the jest.config.,s file afterwards."

## Folder structure

https://stackoverflow.com/questions/62442797/jest-folder-structure

https://medium.com/@jeff_long/organizing-tests-in-jest-17fc431ff850

## Code coverage

https://jestjs.io/docs/cli#--coverageboolean

```
npx jest --coverage
```

https://www.valentinog.com/blog/jest-coverage/

https://www.valentinog.com/blog/jest/

## Matchers

https://jestjs.io/docs/using-matchers

https://jestjs.io/docs/expect

```ts
expect(response.statusCode).toBe(200)

// To compare objects use toEqual
expect(response.body.user).toEqual({ id: 1, name: 'Pere' })

expect(response.body).toHaveProperty('user')
expect(response.body).toHaveProperty('user.age') // can check nested properties
expect(response.body).toHaveProperty('user.age', 18) // optionally check value too

expect(response.body.user).toBeDefined() // check not undefined

// toHaveProperty checks existence, toBeDefined checks value
expect({ user: undefined }).toHaveProperty('user') // Success
expect({ user: undefined }.user).toBeDefined() // Failure
expect({ user: undefined }.user).toBeUndefined() // Success

// String partial match
expect('cat dog').toContain('cat') // Success
expect('cat dog').toMatch('cat') // Success
// String exact match
expect('cat dog').toBe('cat') // Failure
expect('cat dog').toBe('cat dog') // Success
```

## Mocking

:::info

Set [`clearMocks: true`](https://jestjs.io/docs/configuration/#clearmocks-boolean) at `jest.config.js/ts` to "automatically clear mock calls, instances, contexts and results before every test".

:::

https://jestjs.io/docs/mock-functions

https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

How to change mock implementation for a single test with Jest? - https://thewebdev.info/2022/02/24/how-to-change-mock-implementation-for-a-single-test-with-jest/

Mocking a database: https://stackoverflow.com/questions/68825658/mock-database-jest-using-ts-jest-utils

jest.clearAllMocks vs jest.resetAllMocks vs jest.restoreAllMocks explained - https://dev.to/edwinwong90/jestclearallmocks-vs-jestresetallmocks-vs-jestrestoreallmocks-explained-5aal

Example:

```ts
// UserDatabase.ts
export async function getUserById(userId: number): Promise<User> {
  // database.query('SELECT ...')
}

// ---

// UserController.test.ts
import { getUserById } from './UserDatabase'

jest.mock('./UserDatabase')

describe('GET /users/:id', () => {
  test('should get the user from the database', async () => {
    const getUserByIdMock = jest.mocked(getUserById)
    getUserByIdMock.mockResolvedValueOnce({
      id: 6,
      name: 'Joe',
      email: 'a@b.co',
    })

    // ...

    expect(getUserByIdMock).toHaveBeenCalledTimes(1)
    expect(getUserByIdMock).toHaveBeenCalledWith(6)
  })
})
```

Equivalent ways to assert with mocks:

```ts
expect(myMock).toHaveBeenCalledTimes(1)
expect(myMock.mock.calls.length).toBe(1)
```

```ts
expect(myMock).toHaveBeenCalledWith('a', 'b')
expect(myMock.mock.calls[0][0]).toBe('a')
expect(myMock.mock.calls[0][1]).toBe('b')
```

### Mock a single function of a module, while the other ones use the real implementation

There are various ways.

One way is to use `jest.mock` and [`jest.requireActual`](https://jestjs.io/docs/jest-object#jestrequireactualmodulename) as explained at https://jestjs.io/docs/mock-functions#mocking-partials.

The other is to use [`spyOn`](https://jestjs.io/docs/jest-object#jestspyonobject-methodname):

```ts
import * as Token from './token'

describe('My function', () => {
  test('should...', async () => {
    const generateTokenSpy = jest
      .spyOn(Token, 'generateToken')
      .mockImplementation(() => 'some-token')

    // ...

    // Optionally we can restore the original (non-mocked) implementation of the
    // function 'generateToken' if we don't want to mock it on the other tests.
    generateTokenSpy.mockRestore()
  }
})
```

See more here:

- How To Mock Only One Function From A Module In Jest - https://www.chakshunyu.com/blog/how-to-mock-only-one-function-from-a-module-in-jest/
- Jest: How to mock one specific method of a class - https://stackoverflow.com/questions/50091438/jest-how-to-mock-one-specific-method-of-a-class
- Mock only one function from module but leave rest with original functionality - https://stackoverflow.com/questions/59312671/mock-only-one-function-from-module-but-leave-rest-with-original-functionality

## Parametrized tests

https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing#jest-each

[`test.each(table)(name, fn, timeout)`](https://jestjs.io/docs/api#testeachtablename-fn-timeout)

[`.each` TypeScript Usage](https://jestjs.io/docs/api#each)
