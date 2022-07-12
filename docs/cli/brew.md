---
title: Brew
---

https://docs.brew.sh/FAQ

https://docs.brew.sh/Manpage

Search formulas: https://formulae.brew.sh

Upgrade:

```
brew update --debug --verbose
brew outdated
brew upgrade
brew cleanup
```

Stop certain formulae from being updated: `brew pin <formula>`. To allow that formulae to update again do: `brew unpin <formula>`.

Install: `brew install git`

Uninstall: `brew uninstall git`

List installed: `brew list`

Doctor: `brew doctor` <-- check from time to time!

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

If you un-install the `postgresql` then you can remove its links with `brew services cleanup`. [source](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3#gistcomment-3443897)

All commands:

- `cleanup`: Get rid of stale services and unused plists
- `list`: List all services managed by brew services
- `restart`: Gracefully restart selected service
- `run`: Run selected service. Don't start at login (nor boot)
- `start`: Start selected service
- `stop`: Stop selected service

You can find the commands in `/usr/local/Homebrew/Library/Taps/homebrew/homebrew-services/completions/zsh/_brew_services`.

## yarn issues

:::important

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
