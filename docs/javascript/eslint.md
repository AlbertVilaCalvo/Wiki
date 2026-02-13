---
title: ESLint
---

https://eslint.org

## Rules and config

https://eslint.org/docs/rules

https://eslint.org/docs/user-guide/configuring/rules

Airbnb rules: https://github.com/airbnb/javascript

Turn off all rules that are unnecessary or might conflict with Prettier: https://www.npmjs.com/package/eslint-config-prettier

## Disable a rule

You can disable a rule on a specific line, a whole file, a block of code or globally. See:

- https://eslint.org/docs/latest/user-guide/configuring/rules
- https://flaviocopes.com/how-to-disable-eslint-rule/

On a specific line:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(n: any): boolean {}
```

In an entire file, put a comment at the top:

```ts
/* eslint-disable @typescript-eslint/no-empty-function */
```

Globally:

```js title=".eslintrc.js"
module.exports = {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
```

Options are ([source](https://eslint.org/docs/latest/user-guide/configuring/rules#configuring-rules)):

- "off" or 0: turn the rule off
- "warn" or 1: turn the rule on as a warning (doesn’t affect exit code)
- "error" or 2: turn the rule on as an error (exit code is 1 when triggered)

## Ignoring files and folders

See all options here: https://eslint.org/docs/latest/user-guide/configuring/ignoring-code

Disable eslint for all files in directory and subdirectories - https://stackoverflow.com/questions/43194302/disable-eslint-for-all-files-in-directory-and-subdirectories

You can have a `.eslintignore` file like `.gitignore`:

```txt title=".eslintignore"
public/js/bootstrap.min.js
public/js/jquery.min.js
```

You can also set `ignorePatterns` in `.eslintrc.js`:

```js title=".eslintrc.js"
module.exports = {
  ignorePatterns: ['build/'],
}
```

In `package.json` use `eslintIgnore`:

```json title="package.json"
{
  "eslintIgnore": ["file.js"]
}
```

Note that `node_modules` and dot-files and dot-folders are ignored. See https://eslint.org/docs/latest/user-guide/configuring/ignoring-code#the-eslintignore-file for more details and exceptions.

## CLI

https://eslint.org/docs/user-guide/command-line-interface

```shell
# local install in node_modules
npx eslint src/**/*.js
npx eslint './**/*.{js,jsx,ts,tsx}'
npx eslint 'src/**/*.{js,jsx,ts,tsx}'
npx eslint . --ext ts --ext tsx --ext js
npx eslint . --ext .js,.jsx,.ts,.tsx

# global install
eslint --cache --fix
```

On a npm `package.json` script we don't need the `npx` prefix:

```json title="package.json"
{
  "scripts": {
    "eslint": "eslint 'src/**/*.{js,jsx,ts,tsx}'"
  }
}
```

```json title="package.json"
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  }
}
```

You can verify that a npm script correctly runs the local ESLint (instead of a global install) by adding a script that runs `which eslint`. Running this script will print `/project-path/node_modules/.bin/eslint`.

## Setup

Docs - Getting Started with ESLint: https://eslint.org/docs/latest/user-guide/getting-started

See https://github.com/eslint/create-config for all info about `@eslint/config`.

```
npm init @eslint/config
```

(Note: in the past you used `eslint --init`.)

Optionally, you can specify a [shareable config](https://eslint.org/docs/latest/developer-guide/shareable-configs) with `--config`:

```shell
npm init @eslint/config --config semistandard # npm <= 6
npm init @eslint/config -- --config semistandard # npm >= 7
```

You can pass an array of configs too - [see docs](https://github.com/eslint/create-config). A shareable config is set on the `.eslintrc.js` `extends` field. Some configurations are:

- https://github.com/standard/eslint-config-standard
- https://github.com/standard/eslint-config-semistandard
- https://github.com/standard/semistandard
- https://www.npmjs.com/package/eslint-config-airbnb
- https://github.com/prettier/eslint-config-prettier

Search npm for more shareable configs: https://www.npmjs.com/search?ranking=popularity&q=eslint-config

For a **Node.js** project with **Prettier** answer this to the following questions:

- How would you like to use ESLint? → To check syntax and find problems
- Which framework does your project use? React, Vue, None of these. → None of these
- Where does your code run? → Node. _Warning: you need to unselect 'Browser' with space!_

Finally, it will say something like _"The config that you've selected requires the following dependencies: @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest, eslint@latest. Would you like to install them now?"_. If you answer 'Yes' it creates the file `.eslintrc.js` and updates `package.json` (adding the dependencies to `devDependencies`).

## `.eslintrc.js`

https://prettier.io/docs/en/integrating-with-linters.html

https://github.com/prettier/eslint-config-prettier

You can use `npm init @eslint/config` to create `.eslintrc.js`. It asks questions. See [setup](#setup) below.

### `.eslintrc.js` for Node.js

You must have `node: true` otherwise you get the error "'process' is not defined" - see [this](https://stackoverflow.com/q/50894000/4034572) and [this](https://youtu.be/sIhm4YOMK6Q?t=1722).

```js
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
}
```

### `.eslintrc.js` for React Native

For instructions on how to setup ESLint with React Native see https://www.npmjs.com/package/@react-native-community/eslint-config. (If using npm instead of yarn do `npm install --save-dev eslint @react-native-community/eslint-config`.)

Note that it does not work with ESLint 8, we need to use version 7 (see https://stackoverflow.com/a/70748782/).
So in `package.json` we should have something like `"eslint": "^7.32.0"`.
But first check the ESLint version that `@react-native-community/eslint-config` currently uses here: https://github.com/facebook/react-native/blob/main/packages/eslint-config-react-native-community/package.json

In summary, we need to do to something like: `yarn add --dev eslint prettier @react-native-community/eslint-config@7.32.0`.

Then add the following `.eslintrc.js`:

```js
module.exports = {
  root: true,
  // https://www.npmjs.com/package/@react-native-community/eslint-config
  // In WebStorm, 'extends' 'prettier' removes the yellow bars, whereas the 'rules' sections gets rid of the red
  // squiggles that prettier is going to fix automatically for us (hence there's no point in seeing them).
  extends: ['@react-native-community', 'prettier'],
  // https://eslint.org/docs/user-guide/configuring/rules
  // https://eslint.org/docs/rules/
  rules: {
    'prettier/prettier': 'off',
    quotes: 'off',
    'no-trailing-spaces': 'off',
    semi: 'off',
    // babel-preset-expo automatically converts JSX to JS without the need to
    // import React - see https://github.com/expo/expo/tree/master/packages/babel-preset-expo#jsxruntime
    // Rules taken from https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    'react/jsx-uses-react': 'off', // Prevent React to be marked as unused
    'react/react-in-jsx-scope': 'off', // 'React' must be in scope when using JSX
  },
  globals: {
    // Suppress error "'JSX' is not defined" when using JSX.Element as type.
    // From https://stackoverflow.com/questions/64170868/why-eslint-consider-jsx-or-some-react-types-undefined-since-upgrade-typescript
    JSX: true,
  },
}
```

## New config

Docs - https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new

`.eslintrc*` is replaced with `eslint.config.js`.

- https://eslint.org/blog/2022/08/new-config-system-part-1/
- https://eslint.org/blog/2022/08/new-config-system-part-2/
- https://eslint.org/blog/2022/08/new-config-system-part-3/

## WebStorm

To get the red squiggles and warnings we need to enable it!

At Preferences → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint, set 'Automatic ESLint configuration'.

## Plugins

Imports:

- Rules that help validate proper imports - https://github.com/import-js/eslint-plugin-import
  - It requires this extra plugin for TypeScript: https://github.com/import-js/eslint-import-resolver-typescript
- Easy autofixable import sorting - https://github.com/lydell/eslint-plugin-simple-import-sort
