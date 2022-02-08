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

### `.eslintrc.js` for React Native

For instructions on how to setup ESLint with React Native see https://www.npmjs.com/package/@react-native-community/eslint-config.

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
