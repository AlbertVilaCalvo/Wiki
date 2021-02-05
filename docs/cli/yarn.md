---
title: Yarn
---

CLI docs: https://classic.yarnpkg.com/en/docs/cli/

Tip: `yarn run` lists all the executable commands/scripts.

To upgrade yarn itself use npm.

Know which version of a package you are using:

`yarn list @react-native-community/cli`

Upgrade all packages to latest:

`yarn upgrade --latest`

Install to devDependencies: `yarn add webpack --dev`

## Global

List global packages:

`yarn global list`

Add global package:

`yarn global add <package>`

Upgrade global packages one by one (lists all packages and versions and allows to choose):

`yarn global upgrade-interactive --latest`

Upgrade global packages all at once:

`yarn global upgrade`

Remove global package:

`yarn global remove <package>`
