---
title: Oh My Zsh
---

https://github.com/ohmyzsh/ohmyzsh

Cheatsheet: https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet

## Plugins

https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins

https://github.com/unixorn/awesome-zsh-plugins

Git: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git

macOS: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/macos

z: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/z

terraform: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/terraform

https://github.com/zsh-users/zsh-autosuggestions

https://github.com/zsh-users/zsh-syntax-highlighting

## Upgrade

```shell
omz update
```

## Apply changes made to `.zshrc`

:::warning
Don't run `source ~/.zshrc`! See [How do I reload the zshrc file?](https://github.com/ohmyzsh/ohmyzsh/wiki/FAQ#how-do-i-reload-the-zshrc-file)
:::

```shell
omz reload
```

Note that `omz reload` just runs `exec zsh` under the hood - [source](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet).
