---
title: npm
---


CLI docs: https://docs.npmjs.com/cli-documentation/

package.json docs: https://docs.npmjs.com/cli/v6/configuring-npm/package-json

Tip: `npm run` lists all the executable commands/scripts.

Upgrade npm itself: `npm install npm@latest -g`

(If this command fails and we then get `zsh: command not found: npm` we can fix it with `brew reinstall node`.)

Install to devDependencies: `npm install webpack --save-dev`

`npx` command runs a binary in ./node_modules/.bin/

`npm ci` -> when you want to make sure you're doing a clean install of your dependencies [docs](https://docs.npmjs.com/cli/v7/commands/npm-ci)

Find outdated and unused packages: https://github.com/dylang/npm-check


## Init

https://docs.npmjs.com/cli/v7/commands/npm-init

Init without questions: `npm init -y`


## Global

List global pacakges: `npm list -g --depth=0`

List outdated global packages: `npm outdated -g`

Add global package: `npm install -g <package>`

Update 1 global package: `npm update -g <package>`

Update all global packages: `npm update -g`

Remove global package: `npm uninstall -g <package>`


## Dependency version

https://docs.npmjs.com/cli/v6/configuring-npm/package-json#dependencies

https://semver.npmjs.com

MAJOR.MINOR.PATCH

```json
"dependencies": {
  "exact": "15.7.2",
  "same-major": "^15.7.2", // upgrade to 15.X.Y (eg 15.7.3 and 15.8.0, but not 16.0.0)
  "same-major-and-minor": "~15.7.2" // upgrade to 15.7.X
}
```


## Find parent of transitive depencency

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
