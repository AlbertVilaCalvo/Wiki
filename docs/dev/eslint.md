---
title: ESLint
---

https://eslint.org


## Rules and config

https://eslint.org/docs/rules

https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style/Formatting_JS_Code_With_Prettier_and_eslint

https://eslint.org/docs/user-guide/configuring/rules

Airbnb rules: https://github.com/airbnb/javascript

Turn off all rules that are unnecessary or might conflict with Prettier: https://www.npmjs.com/package/eslint-config-prettier


## .eslintrc.js

```js
module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'prettier/prettier': 'off',
    quotes: 'off',
    'no-trailing-spaces': 'off',
    semi: 'off',
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
