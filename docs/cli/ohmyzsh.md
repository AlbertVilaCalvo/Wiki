---
title: Oh My Zsh
---

https://github.com/ohmyzsh/ohmyzsh

Cheatsheet: https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet

Plugins: https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins

Git plugin: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git

## Upgrade

```
omz update
```

## Apply changes made to `.zshrc``

:::caution
Don't run `source ~/.zshrc`! See [How do I reload the zshrc file?](https://github.com/ohmyzsh/ohmyzsh/wiki/FAQ#how-do-i-reload-the-zshrc-file)
:::

```
omz reload
```

Note that `omz reload` just runs `exec zsh` under the hood - [source](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet).
