---
title: Prettier
---

https://prettier.io

https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style/Formatting_JS_Code_With_Prettier_and_eslint

[pretty-quick](https://github.com/azz/pretty-quick)

## Install

https://prettier.io/docs/en/install.html

```shell
npm install --save-dev --save-exact prettier
npm i -D -E prettier
# or
yarn add --dev --exact prettier

echo {}> .prettierrc.json
# or
echo '{\n  "semi": false,\n  "singleQuote": true\n}' >> .prettierrc.json

touch .prettierignore
```

> Note: If you forget to install Prettier first, npx will temporarily download the latest version. That’s not a good idea when using Prettier, because we change how code is formatted in each release! It’s important to have a locked down version of Prettier in your package.json. And it’s faster, too.

> Tip! Base your .prettierignore on .gitignore and .eslintignore.

Finally, edit your `.eslintrc.js` so that it extends 'prettier' - see [ESLint](/javascript/eslint#eslintrcjs).

Note that it ignores files located in `node_modules` directory - [docs](https://prettier.io/docs/en/cli.html#--with-node-modules)

## Commands

https://prettier.io/docs/en/cli.html

Run: `npx prettier --write .`

Check: `npx prettier --check .`

Add the following scripts (`npm run format` and `npm run format:check`):

```json title=package.json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Options

https://prettier.io/docs/en/options.html

```json title=".prettierrc.json"
{
  "semi": false, // default true
  "singleQuote": true, // default false
  "trailingComma": "es5" // default changed from "es5" to "all" in v3.0.0
}
```

`semi: false` → Only add semicolons at the beginning of lines that may introduce ASI failures - [docs](https://prettier.io/docs/en/options.html#semicolons)

`singleQuote: true` → Chooses the one which results in the fewest number of escapes, but in case of a tie or the string not containing any quotes, defaults to _single_ quotes - [docs](https://prettier.io/docs/en/options.html#quotes) - [rationale](https://prettier.io/docs/en/rationale.html#strings)

## WebStorm setup

:::info
Starting from WebStorm 2024.2, **new projects** with a direct `prettier` dependency in their root `package.json` and a Prettier configuration file at the same level will have the _Automatic Prettier Configuration_ setting enabled by default. This feature simplifies the setup process and ensures that Prettier integration is enabled out of the box. [source](https://blog.jetbrains.com/webstorm/2024/08/webstorm-2024-2/#prettier-integration-enabled-by-default)
:::

https://prettier.io/docs/en/webstorm.html

https://www.jetbrains.com/help/webstorm/prettier.html

Go to Preferences → Languages and Frameworks → JavaScript → Prettier:

- Manual Prettier configuration
- Set 'Prettier package' to `<project-dir>/node_modules/prettier`.
- Set 'Run for files' to the glob pattern `{**/*,*}.{js,ts,jsx,tsx,html,css,json,md,yml,yaml}`.
  - Since WebStorm 2023.3 `{**/*,*}.{js,ts}` can be simplified to `**/*.{js,ts}` [source](https://youtrack.jetbrains.com/issue/WEB-63021)
- Check "Run on 'Reformat Code' action" and "Run on save".

Reformat with Prettier: ⌥⇧⌘P
