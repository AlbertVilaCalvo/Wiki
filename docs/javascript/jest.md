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
