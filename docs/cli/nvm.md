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

Make system node the default for new shells: `nvm alias default system`

## Upgrade nvm

:::info

nvm needs to be updated manually from time to time.

To check if it's updated, get the installed version with `nvm -v` and compare it with the latest version in https://github.com/nvm-sh/nvm/releases.

:::

There are 2 ways to upgrade on the README:

- Running the install shell script: https://github.com/nvm-sh/nvm#install--update-script
- Manual upgrade: https://github.com/nvm-sh/nvm#manual-upgrade

After upgrading by running the install shell script I got this message about global modules:

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 15916  100 15916    0     0   150k      0 --:--:-- --:--:-- --:--:--  174k
=> nvm is already installed in /Users/albertvilacalvo/.nvm, trying to update using git
=> => Compressing and cleaning up git repository

=> nvm source string already in /Users/albertvilacalvo/.zshrc
=> bash_completion source string already in /Users/albertvilacalvo/.zshrc
=> You currently have modules installed globally with `npm`. These will no
=> longer be linked to the active version of Node when you install a new node
=> with `nvm`; and they may (depending on how you construct your `$PATH`)
=> override the binaries of modules installed with `nvm`:

/usr/local/lib
├── eas-cli@2.6.0
├── ios-deploy@1.11.4
└── yarn@1.22.19
=> If you wish to uninstall them at a later point (or re-install them under your
=> `nvm` Nodes), you can remove them from the system Node as follows:

     $ nvm use system
     $ npm uninstall -g a_module

=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
