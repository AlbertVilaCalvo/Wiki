---
title: npm
---

https://semver.npmjs.com/

MAJOR.MINOR.PATCH

```
"dependencies": {
  "exact": "15.7.2",
  "same-major": "^15.7.2", -> upgrade to 15.X.Y (eg 15.7.3 and 15.8.0, but not 16.0.0)
  "same-major-and-minor": "~15.7.2" -> upgrade to 15.7.X
}
```

CLI docs: https://docs.npmjs.com/cli-documentation/

Tip: `npm run` lists all the executable commands/scripts.

Upgrade npm itself:

`npm install npm@latest -g`

(If this command fails and we then get `zsh: command not found: npm` we can fix it with `brew reinstall node`.)

Install to devDependencies: `npm install webpack --save-dev`

## Global

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
