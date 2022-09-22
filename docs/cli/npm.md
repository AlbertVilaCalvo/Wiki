---
title: npm
---

CLI docs: https://docs.npmjs.com/cli-documentation/

package.json docs: https://docs.npmjs.com/cli/v8/configuring-npm/package-json

Tip: `npm run` lists all the executable commands/scripts.

npm vs yarn: https://classic.yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison

Running cross-platform tasks via npm package scripts: https://2ality.com/2022/08/npm-package-scripts.html

Upgrade npm itself: `npm install npm@latest -g`

(If this command fails and we then get `zsh: command not found: npm` we can fix it with `brew reinstall node`.)

List all commands: `npm`. List commands with details: `npm -l`.

Install to devDependencies: `npm install --save-dev webpack` or `npm i -D webpack`

List all outdated packages: `npm outdated`

Uninstall a package: `npm uninstall <package>`

Show package info: `npm info <package>`

Open docs (eg README) in the browser: `npm docs <package>`

To pass arguments to a script you need to add `--` ([see `npm run` docs](https://docs.npmjs.com/cli/v8/commands/npm-run-script)). Eg if we have the script `"test": "jest"` and we want to run Jest in watch mode, we need to do `npm test -- --watch`. Note: in this case doing `npx jest --watch` also works.

`npx` command runs a binary or package. It can be a local package (eg a binary in ./node_modules/.bin/) or fetched remotely. See https://docs.npmjs.com/cli/v8/commands/npx

`npm ci` -> when you want to make sure you're doing a clean install of your dependencies [docs](https://docs.npmjs.com/cli/v8/commands/npm-ci)

Find outdated and unused packages: https://github.com/dylang/npm-check

https://www.stefanjudis.com/today-i-learned/how-to-override-your-dependencys-dependencies/

## Update a package

Just use `npm i [-D] [-E] somepackage@latest` because using [`npm update`](https://docs.npmjs.com/cli/v8/commands/npm-update) doesn't update `package.json`:

> Note that by default `npm update` will not update the semver values of direct dependencies in your project `package.json`, if you want to also update values in `package.json` you can run: `npm update --save` (or add the `save=true` option to a [configuration file](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc) to make that the default behavior).

## Init

https://docs.npmjs.com/cli/v8/commands/npm-init

Creates `package.json`.

Init without questions: `npm init -y`

## Global

List global pacakges: `npm list -g --depth=0`

List outdated global packages: `npm outdated -g`

Add global package: `npm install -g <package>`

Update 1 global package: `npm update -g <package>`

Update all global packages: `npm update -g`

Remove global package: `npm uninstall -g <package>`

## Dependency version

https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies

https://semver.npmjs.com

MAJOR.MINOR.PATCH

```json
"dependencies": {
  "exact": "15.7.2",
  "same-major": "^15.7.2", // upgrade to 15.X.Y (eg 15.7.3 and 15.8.0, but not 16.0.0)
  "same-major-and-minor": "~15.7.2" // upgrade to 15.7.X
}
```

To save exact do: `npm install --save-exact express` or `npm i -E express`

## Find parent of transitive dependency

`npm ls @typescript-eslint/typescript-estree`

This will print who is using `@typescript-eslint/typescript-estree`:

```
MyProject
└─┬ @react-native-community/eslint-config@3.0.1
  ├─┬ @typescript-eslint/eslint-plugin@4.28.1
  │ └─┬ @typescript-eslint/experimental-utils@4.28.1
  │   └── @typescript-eslint/typescript-estree@4.28.1 deduped
  └─┬ @typescript-eslint/parser@4.28.1
    └── @typescript-eslint/typescript-estree@4.28.1
```

Here the transitive dependency `@typescript-eslint/typescript-estree` is being imported by the direct dependency `@react-native-community/eslint-config` (which appears in package.json).

Yarn has [`yarn list`](https://classic.yarnpkg.com/en/docs/cli/list).

[source](https://stackoverflow.com/a/49523073/4034572)
