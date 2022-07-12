---
title: Yarn
---

:::important
Si la versió que em surt fent `yarn -v` és la 1.21.1 enlloc de 1.22.11 fer `npm install --global yarn`. Això passa després de fer `yarn global upgrade-interactive --latest`.
:::

CLI docs: https://classic.yarnpkg.com/en/docs/cli/

Oh My Zsh plugin: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/yarn

Tip: `yarn run` lists all the executable commands/scripts.

To upgrade yarn itself use npm.

Know which version of a package you are using:

`yarn list @react-native-community/cli`

Upgrade all packages to latest: `yarn upgrade --latest`

Install to devDependencies: `yarn add --dev webpack` or `yarn add -D webpack`

Downgrade a dependency: `yarn upgrade axios@^0.24.0`

Check **outdated** dependencies: `yarn outdated`

Get version of installed package: `yarn list --pattern <package>` or `yarn why <package>`

Why is this package installed? `yarn why <package>`

## Global

List global packages: `yarn global list`

Add global package: `yarn global add <package>`

Upgrade global packages one by one (lists all packages and versions and allows to choose): `yarn global upgrade-interactive --latest`

Upgrade global packages all at once: `yarn global upgrade`

Remove global package: `yarn global remove <package>`
