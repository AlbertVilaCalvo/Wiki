---
title: Prettier
---

https://prettier.io

## Install

https://prettier.io/docs/en/install.html

```
npm install --save-dev --save-exact prettier
// or
yarn add --dev --exact prettier

echo {}> .prettierrc.json
// or
echo '{\n  "semi": false,\n  "singleQuote": true\n}' >> .prettierrc.json

touch .prettierignore
```

> Tip! Base your .prettierignore on .gitignore and .eslintignore.

Note that it ignores files located in `node_modules` directory - [docs](https://prettier.io/docs/en/cli.html#--with-node-modules)

Run: `npx prettier --write .`

Check: `npx prettier --check .`

## Options

https://prettier.io/docs/en/options.html

```json
// .prettierrc.json
{
  "semi": false, // default true
  "singleQuote": true // default false
}
```

`semi: false` -> Only add semicolons at the beginning of lines that may introduce ASI failures - [docs](https://prettier.io/docs/en/options.html#semicolons)

`singleQuote: true` -> Chooses the one which results in the fewest number of escapes, but in case of a tie or the string not containing any quotes, defaults to _single_ quotes - [docs](https://prettier.io/docs/en/options.html#quotes) - [rationale](https://prettier.io/docs/en/rationale.html#strings)

## WebStorm setup

https://prettier.io/docs/en/webstorm.html

https://www.jetbrains.com/help/webstorm/prettier.html

Go to Preferences | Languages and Frameworks | JavaScript | Prettier.
Check 'On code reformat' and 'On save'. Modify glob pattern to `{**/*,*}.{js,ts,jsx,tsx,css,json}`.

Reformat with Prettier: ⌥⇧⌘P
