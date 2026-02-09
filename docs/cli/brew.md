---
title: Brew
---

https://docs.brew.sh/FAQ

https://docs.brew.sh/Manpage

Terminology: https://github.com/Homebrew/brew/blob/master/docs/Formula-Cookbook.md#homebrew-terminology

Search formulas: https://formulae.brew.sh

Help: `man brew` or `brew help <command>`

Upgrade:

```shell
brew update --debug --verbose
brew outdated
brew upgrade
brew cleanup
```

Stop certain formulae from being updated: `brew pin <formula>`. To allow that formulae to update again do: `brew unpin <formula>`.

Show information about formula: `brew info <formula>`

Install: `brew install git`

Uninstall: `brew uninstall git`

Uninstall formulae that were only installed as a dependency of another formula and are now no longer needed: `brew autoremove`. Use `brew autoremove --dry-run` to list what would be uninstalled, but do not actually uninstall anything.

List installed:

```shell
brew list
brew list --installed-on-request
brew list --installed-as-dependency
```

List top-level formulas (ie formulas that no other formulas depend on): `brew leaves`. If you do `brew help leaves` it says "List installed formulae that are not dependencies of another installed formula or cask."

List dependencies of formula [source](https://stackoverflow.com/a/52120368/4034572): `brew deps --tree --installed vim`

Some of the formulae given by `brew list --installed-on-request` cannot be uninstalled, since they are dependencies of other formulae (you get the error "Refusing to uninstall /usr/local/Cellar/xz/5.6.3 because it is required by ..." when doing `brew uninstall xz`). To list the formulae that I installed which are also top level formula (and thus can be uninstalled) do:

```shell
brew list --installed-on-request > brew-list-installed-on-request.txt
brew leaves > brew-leaves.txt
awk 'NR==FNR{arr[$0];next} $0 in arr' brew-list-installed-on-request.txt brew-leaves.txt
rm brew-list-installed-on-request.txt
rm brew-leaves.txt
```

[source of the awk command](https://stackoverflow.com/a/26319612/4034572)

Doctor: `brew doctor` ← check from time to time!

Get the size of the installed formulae [source](https://stackoverflow.com/a/64041990/4034572):

```shell
brew list --formula | xargs -n1 -P8 -I {} \
    sh -c "brew info {} | egrep '[0-9]* files, ' | sed 's/^.*[0-9]* files, \(.*\)).*$/{} \1/'" | \
    sort -h -r -k2 - | column -t
```

## Cask

List of commands: https://github.com/Homebrew/homebrew-cask/blob/master/USAGE.md

```
brew install <package>
brew uninstall <package>
brew list --cask
brew outdated --cask
brew upgrade --cask
```

## Services

```
brew services start postgresql
brew services stop postgresql
brew services restart postgresql
brew services list
```

If you uninstall the `postgresql` then you can remove its links with `brew services cleanup`. [source](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3#gistcomment-3443897)

All commands:

- `cleanup`: Get rid of stale services and unused plists
- `list`: List all services managed by brew services
- `restart`: Gracefully restart selected service
- `run`: Run selected service. Don't start at login (nor boot)
- `start`: Start selected service
- `stop`: Stop selected service

You can find the commands in `/usr/local/Homebrew/Library/Taps/homebrew/homebrew-services/completions/zsh/_brew_services`.

## yarn issues

:::info

This should not be necessary anymore since I've unistalled yarn from Brew and installed it with npm (`npm install --global yarn`) as [recommend at the docs](https://classic.yarnpkg.com/en/docs/install#mac-stable) ("It is recommended to install Yarn through the npm package manager").

:::

### Fix `zsh: command not found: yarn`

Run `brew doctor`. If you see:

```
Warning: You have unlinked kegs in your Cellar.
Leaving kegs unlinked can lead to build-trouble and cause brews that depend on
those kegs to fail to run properly once built. Run `brew link` on these:
  yarn
```

Then run `brew link yarn`, which may fix the issue. If you then get `Error: Could not symlink bin/yarn. Target /usr/local/bin/yarn already exists.`, then follow the instructions or run `brew link --overwrite yarn`.

### Fix not using the latest yarn version installed by brew

If `brew info yarn` gives a different (higher) version than `yarn -v` then run `brew link --overwrite yarn`. If you then see:

```
Warning: Already linked: /usr/local/Cellar/yarn/1.22.4
To relink:
  brew unlink yarn && brew link yarn
```

Then run `brew unlink yarn && brew link yarn`. If you then see `Error: Could not symlink bin/yarn. Target /usr/local/bin/yarn already exists.`, then follow the instructions or run `brew link --overwrite yarn`.

## Install

When you install Brew (`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`) it prints:

```
==> This script will install:
/opt/homebrew/bin/brew
/opt/homebrew/share/doc/homebrew
/opt/homebrew/share/man/man1/brew.1
/opt/homebrew/share/zsh/site-functions/_brew
/opt/homebrew/etc/bash_completion.d/brew
/opt/homebrew
==> The following new directories will be created:
/opt/homebrew/bin
/opt/homebrew/etc
/opt/homebrew/include
/opt/homebrew/lib
/opt/homebrew/sbin
/opt/homebrew/share
/opt/homebrew/var
/opt/homebrew/opt
/opt/homebrew/share/zsh
/opt/homebrew/share/zsh/site-functions
/opt/homebrew/var/homebrew
/opt/homebrew/var/homebrew/linked
/opt/homebrew/Cellar
/opt/homebrew/Caskroom
/opt/homebrew/Frameworks
```
