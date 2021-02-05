---
title: Brew
---

https://docs.brew.sh/FAQ

https://docs.brew.sh/Manpage

```
brew update --debug --verbose
brew outdated
brew upgrade
brew cleanup
```

Stop certain formulae from being updated: `brew pin <formula>`. To allow that formulae to update again do: `brew unpin <formula>`.


## Cask

List of commands: https://github.com/Homebrew/homebrew-cask/blob/master/USAGE.md

```
brew cask install <package>
brew list --cask
brew outdated --cask
brew upgrade --cask
```

## yarn

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
