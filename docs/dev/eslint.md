---
title: ESLint
---

https://eslint.org

## Rules and config

https://eslint.org/docs/rules

https://eslint.org/docs/user-guide/configuring/rules

Airbnb rules: https://github.com/airbnb/javascript

Turn off all rules that are unnecessary or might conflict with Prettier: https://www.npmjs.com/package/eslint-config-prettier

## `.eslintrc.js`

https://prettier.io/docs/en/integrating-with-linters.html

https://github.com/prettier/eslint-config-prettier

You can use `npm init @eslint/config` to create `.eslintrc.js`. It asks questions. See [setup](#setup) below.

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

## CLI

https://eslint.org/docs/user-guide/command-line-interface

```
npx eslint src/**/*.js
npx eslint . --ext ts --ext tsx --ext js
eslint --cache --fix
```

## Setup

https://eslint.org/docs/latest/user-guide/getting-started

```
npm init @eslint/config
```

(Note: in the past you used `eslint --init`.)

For a Node.js project with Prettier answer this to the questions:

- How would you like to use ESLint? -> To check syntax and find problems
- Which framework does your project use? React, Vue, None of these. -> None of these
- Where does your code run? -> Node. _Warning: you need to unselect 'Browser' with space!_
- The config that you've selected requires the following dependencies: @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest, eslint@latest. Would you like to install them now? -> Yes

Then it should create the file `.eslintrc.js` and update `package.json` (adding the dependencies to `devDependencies`).

## WebStorm

To get the red squiggles and warnings we need to enable it!

At Preferences -> Languages & Frameworks -> JavaScript -> Code Quality Tools -> ESLint, set 'Automatic ESLint configuration'.
