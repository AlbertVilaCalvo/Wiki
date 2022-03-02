---
title: nvm
---

https://github.com/nvm-sh/nvm

List available versions: `nvm ls-remote`

List installed versions: `nvm ls` or `nvm list`

Install version: `nvm install v14.18.2`

See current version: `nvm current`

Use system node: `nvm use system`

Use another version: `nvm use v14.18.2`

Create .nvmrc file: `echo "v14.18.2" > .nvmrc` -> With this file `nvm use`, `nvm install`, `nvm exec`, `nvm run`, and `nvm which` will use the version specified in the .nvmrc file if no version is supplied on the command line.

Make sytem node the default for new shells: `nvm alias default system`

Upgrade nvm: https://github.com/nvm-sh/nvm#manual-upgrade
