---
title: npm
---

CLI docs: https://docs.npmjs.com/cli-documentation/

Tip: `npm run` lists all the executable commands/scripts.

Upgrade npm itself:

`npm install npm@latest -g`

(If this command fails and we then get `zsh: command not found: npm` we can fix it with `brew reinstall node`.)

List global pacakges:

`npm list -g --depth=0`

List outdated global packages:

`npm outdated -g`

Add global package:

`npm install -g <package>`

Upgrade global package:

`npm update -g <package>`

Remove global package:

`npm uninstall -g <package>`
