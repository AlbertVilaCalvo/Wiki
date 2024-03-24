---
title: npm
---

`package.json` docs: https://docs.npmjs.com/cli/v10/configuring-npm/package-json

Running cross-platform tasks via npm package scripts: https://2ality.com/2022/08/npm-package-scripts.html → Outdated! New link is https://exploringjs.com/nodejs-shell-scripting/ch_package-scripts.html, so it's a chapter of the book [Shell scripting with Node.js](https://exploringjs.com/nodejs-shell-scripting/index.html)

## CLI

CLI docs: https://docs.npmjs.com/cli-documentation

**Options**: https://docs.npmjs.com/cli/v10/using-npm/config

npm <-> yarn:

- https://classic.yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison
- https://devhints.io/yarn

Tip: `npm run` lists all the executable commands/scripts.

Upgrade npm itself: `npm install npm@latest -g`

(If this command fails and we then get `zsh: command not found: npm` we can fix it with `brew reinstall node`.)

List all commands: `npm`. List commands with details: `npm -l`.

List packages: `npm list` or `npm list --depth=0`

List all outdated packages: `npm outdated`

Also see: https://github.com/raineorshine/npm-check-updates - `npx npm-check-updates`

Uninstall a package: `npm uninstall <package>`

Show package info: `npm info <package>`

Open docs (eg README) in the browser: `npm docs <package>`

To pass arguments to a script you need to add `--` ([see `npm run` docs](https://docs.npmjs.com/cli/v10/commands/npm-run-script)). Eg if we have the script `"test": "jest"` and we want to run Jest in watch mode, we need to do `npm test -- --watch`. Note: in this case doing `npx jest --watch` also works.

`npx` command runs a binary or package. It can be a local package (eg a binary in ./node_modules/.bin/) or fetched remotely. See https://docs.npmjs.com/cli/v10/commands/npx

### Install

Install to devDependencies: `npm i -D webpack` or `npm install --save-dev webpack`

Exact version: `npm i -E express` or `npm install --save-exact express`

Suppress output like '204 packages are looking for funding' and '8 high severity vulnerabilities': `npm i --no-audit --no-fund`

Install only "dependencies" but not "devDependencies" packages: `npm i --omit=dev`. [See `omit` docs](https://docs.npmjs.com/cli/v10/using-npm/config#omit). Note that "If the resulting omit list includes 'dev', then the `NODE_ENV` environment variable will be set to 'production' for all lifecycle scripts"

### `npm i --force` vs `--legacy-peer-deps`

Important: use `--force`, not `--legacy-peer-deps`.

https://stackoverflow.com/questions/66020820/npm-when-to-use-force-and-legacy-peer-deps

> `--force` still pins many dependency versions which is stricter.

> `--legacy-peer-deps` ignores peer dependencies entirely, which can screw up your dependency resolution.
> `--force` on the other hand simply sets a different peer dependency version for conflicting dependencies.

### `npm ci` (clean install)

Better use `npm ci --no-audit --no-fund`

- Docs: https://docs.npmjs.com/cli/v8/commands/npm-ci
- Use it when you want to make sure you're doing a clean install of your dependencies
- It's deterministic - it always creates the same `node_modules` or it throws an error
- Uses the exact package versions listed in `package-lock.json`. In contrast, `npm install` can install different versions of a package if you use version ranges (`^` or `~`) in `package.json`
- More info:
  - https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci
  - https://stackoverflow.com/questions/44297803/what-is-the-role-of-the-package-lock-json
  - https://medium.com/helpshift-engineering/package-lock-json-the-complete-guide-2ae40175ebdd
  - https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json
    - > Describe a single representation of a dependency tree such that teammates, deployments, and continuous integration are guaranteed to install exactly the same dependencies
  - https://stackoverflow.com/questions/45022048/why-does-npm-install-rewrite-package-lock-json/53594050#53594050

https://www.stefanjudis.com/today-i-learned/how-to-override-your-dependencys-dependencies/

### Update a package

Just use `npm i [-D] [-E] somepackage@latest` (eg `npm i -D -E typescript@latest`) because using [`npm update`](https://docs.npmjs.com/cli/v8/commands/npm-update) doesn't update `package.json`:

> Note that by default `npm update` will not update the semver values of direct dependencies in your project `package.json`, if you want to also update values in `package.json` you can run: `npm update --save` (or add the `save=true` option to a [configuration file](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc) to make that the default behavior).

### Init `npm init`

https://docs.npmjs.com/cli/v10/commands/npm-init

Creates `package.json`.

Init without questions: `npm init -y`

### Global

List global pacakges: `npm list -g --depth=0`

List outdated global packages: `npm outdated -g`

Add global package: `npm install -g <package>`

Update 1 global package: `npm update -g <package>`

Update all global packages: `npm update -g`

Remove global package: `npm uninstall -g <package>`

## `dependencies` vs `devDependencies`

Putting packages in `dependencies` or `devDependencies` matters on Node.js and libraries, but not when creating a bundle (eg with Create React App).

How do I decide whether @types/\* goes into `dependencies` or `devDependencies`? - https://stackoverflow.com/questions/45176661/how-do-i-decide-whether-types-goes-into-dependencies-or-devdependencies

create-react-app install devDepencies in dependencies section - https://stackoverflow.com/questions/44868453/create-react-app-install-devdepencies-in-dependencies-section

Consider moving react-scripts to devDependencies in the generated package - https://github.com/facebook/create-react-app/issues/4342

> I don't think npm's advice is very relevant here. It is primarily concerning Node apps. CRA doesn't give you a Node app. From that perspective, all dependencies (including React) are "dev" dependencies because they're only necessary for the build: once you build the app, it has no deps at all.

Everything goes into dependencies? - https://github.com/facebook/create-react-app/issues/6180

> The distinction is meaningful for Node apps because they actually are deployed as runtime. So you might not want to deploy development dependencies.
>
> In case of CRA, the end result is a static bundle. So in a sense all dependencies are "development dependencies", even React or libraries you use. They're used only at the build time.

## Dependency version

https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies

semver calculator: https://semver.npmjs.com

MAJOR.MINOR.PATCH

```json
"dependencies": {
  "exact": "15.7.2",
  "same-major": "^15.7.2", // upgrade to 15.X.Y (eg 15.7.3 and 15.8.0, but not 16.0.0)
  "same-major-and-minor": "~15.7.2" // upgrade to 15.7.X
}
```

There are more operators you can use in addition to `^` and `~`, like `>=1.2.3`, `<1.2.3 || >=4.5.6`, `1.0.0 - 1.2.0`. See https://semver.npmjs.com and https://medium.com/helpshift-engineering/package-lock-json-the-complete-guide-2ae40175ebdd

To save exact do: `npm install --save-exact express` or `npm i -E express`

## Exact or range versions?

https://www.reddit.com/r/javascript/comments/ira5gz/askjs_do_you_use_exact_or_range_versions_for_your/

:::tip
Force exact package versions with a [`.npmrc`](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc) file:

```shell title=".npmrc"
save-exact=true
```

:::

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

## package-lock.json

Never delete it: https://tkdodo.eu/blog/solving-conflicts-in-package-lock-json _If you delete package-lock.json now from any one of your projects and run `npm install` again, it will most certainly look completely different._

## .npmrc

https://docs.npmjs.com/cli/v9/configuring-npm/npmrc

Options: https://docs.npmjs.com/cli/v10/using-npm/config

## Find unused packages

https://github.com/dylang/npm-check

https://github.com/depcheck/depcheck - Usage: `npx depcheck`

https://github.com/webpro/knip

## Get rid of 'x packages are looking for funding' forever

```shell
npm config set fund false
# check the value, it should be false now
npm config get fund
```

https://docs.npmjs.com/cli/v10/commands/npm-install#fund
