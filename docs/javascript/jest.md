---
title: Jest
---

https://github.com/facebook/jest

https://jestjs.io/

## CLI

https://jestjs.io/docs/cli

```bash
# Run all tests once
npx jest

# Watch mode
npx jest --watch

# File
npx jest AuthController

# Directory
npx jest src/auth

# Git changed/uncommitted files
npx jest -o
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

https://jestjs.io/docs/mock-functions

https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

How to change mock implementation for a single test with Jest? - https://thewebdev.info/2022/02/24/how-to-change-mock-implementation-for-a-single-test-with-jest/

Mocking a database: https://stackoverflow.com/questions/68825658/mock-database-jest-using-ts-jest-utils

Example:

```ts
// UserDatabase.ts
export async function getUserById(userId: number): Promise<User> {
  // database.query('SELECT ...')
}

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

## Parametrized tests

https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing#jest-each
